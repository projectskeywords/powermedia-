import { revalidateTag, unstable_cache } from 'next/cache'
import { ArticleVersion } from './gemini'
import { UnsplashImage } from './unsplash'
import { redisPipeline, redisTransaction, type RedisCommand } from './upstash'

export interface StoredArticle {
  id: string
  topic: string
  createdAt: string
  ro: ArticleVersion
  ru: ArticleVersion
  en: ArticleVersion
  images: UnsplashImage[]
}

export type ArticleVersionSummary = Pick<ArticleVersion, 'title' | 'slug' | 'metaDescription' | 'keywords'>

// Lightweight entry kept in the index — everything listings, sitemaps and the admin table need.
export interface ArticleSummary {
  id: string
  topic: string
  createdAt: string
  ro: ArticleVersionSummary
  ru: ArticleVersionSummary
  en: ArticleVersionSummary
  image: UnsplashImage | null
}

// Storage layout:
//   articles:index  → ArticleSummary[] (small, newest first)
//   article:<id>    → StoredArticle (full content)
//   articles        → legacy single-blob list, migrated once and kept untouched as a backup
const INDEX_KEY = 'articles:index'
const LEGACY_KEY = 'articles'
const articleKey = (id: string) => `article:${id}`

export const ARTICLES_CACHE_TAG = 'articles'
const CACHE_TTL_SECONDS = 60 * 60 * 24 // safety net; writes invalidate the tag immediately

function summarizeVersion(v: ArticleVersion): ArticleVersionSummary {
  return { title: v?.title, slug: v?.slug, metaDescription: v?.metaDescription, keywords: v?.keywords ?? [] }
}

export function toSummary(article: StoredArticle): ArticleSummary {
  return {
    id: article.id,
    topic: article.topic,
    createdAt: article.createdAt,
    ro: summarizeVersion(article.ro),
    ru: summarizeVersion(article.ru),
    en: summarizeVersion(article.en),
    image: article.images?.[0] ?? null,
  }
}

function parseJson<T>(raw: unknown): T {
  const parsed = JSON.parse(String(raw))
  // Older writes double-encoded the value
  return (typeof parsed === 'string' ? JSON.parse(parsed) : parsed) as T
}

const MIGRATION_BATCH_BYTES = 400_000

function batchBySize(commands: RedisCommand[]): RedisCommand[][] {
  const batches: RedisCommand[][] = []
  let current: RedisCommand[] = []
  let size = 0
  for (const command of commands) {
    const commandSize = JSON.stringify(command).length
    if (current.length > 0 && size + commandSize > MIGRATION_BATCH_BYTES) {
      batches.push(current)
      current = []
      size = 0
    }
    current = [...current, command]
    size += commandSize
  }
  return current.length > 0 ? [...batches, current] : batches
}

async function migrateLegacy(): Promise<ArticleSummary[]> {
  const [legacyRaw] = await redisPipeline([['GET', LEGACY_KEY]])
  if (legacyRaw == null) return []

  const legacy = parseJson<StoredArticle[]>(legacyRaw)
  const articles = Array.isArray(legacy) ? legacy.filter((a) => a?.id) : []
  const summaries = articles.map(toSummary)

  // Article keys go in size-limited batches (Upstash caps request size); the index is written
  // last, so an interrupted migration leaves no index and simply runs again on the next read.
  for (const batch of batchBySize(articles.map((a) => ['SET', articleKey(a.id), JSON.stringify(a)]))) {
    await redisPipeline(batch)
  }
  await redisPipeline([['SET', INDEX_KEY, JSON.stringify(summaries)]])
  console.info(`[articles-db] migrated ${articles.length} articles from "${LEGACY_KEY}" to per-article keys`)
  return summaries
}

async function readIndex(): Promise<ArticleSummary[]> {
  const [raw] = await redisPipeline([['GET', INDEX_KEY]])
  if (raw == null) return migrateLegacy()
  const index = parseJson<ArticleSummary[]>(raw)
  return Array.isArray(index) ? index : []
}

async function readArticle(id: string): Promise<StoredArticle | null> {
  const [raw] = await redisPipeline([['GET', articleKey(id)]])
  return raw == null ? null : parseJson<StoredArticle>(raw)
}

function invalidateCache(): void {
  revalidateTag(ARTICLES_CACHE_TAG, { expire: 0 })
}

// ── Cached reads (served from the Next.js data cache, not from Redis) ───────

export const getArticleSummaries: () => Promise<ArticleSummary[]> = unstable_cache(
  readIndex,
  ['articles-index'],
  { tags: [ARTICLES_CACHE_TAG], revalidate: CACHE_TTL_SECONDS }
)

export const getArticleById: (id: string) => Promise<StoredArticle | null> = unstable_cache(
  readArticle,
  ['article-by-id'],
  { tags: [ARTICLES_CACHE_TAG], revalidate: CACHE_TTL_SECONDS }
)

export async function getArticleBySlug(
  slug: string,
  lang: 'ro' | 'ru' | 'en'
): Promise<StoredArticle | null> {
  const summaries = await getArticleSummaries()
  const match = summaries.find((a) => a[lang]?.slug === slug)
  return match ? getArticleById(match.id) : null
}

/** Full articles, uncached — only for rare admin maintenance jobs. */
export async function getAllArticles(): Promise<StoredArticle[]> {
  const index = await readIndex()
  if (index.length === 0) return []
  const [raws] = await redisPipeline([['MGET', ...index.map((a) => articleKey(a.id))]])
  return (raws as unknown[])
    .filter((raw) => raw != null)
    .map((raw) => parseJson<StoredArticle>(raw))
}

// ── Writes (always read fresh from Redis; any read failure aborts the write) ─

export async function saveArticle(
  article: Omit<StoredArticle, 'id' | 'createdAt'>
): Promise<StoredArticle> {
  const index = await readIndex()
  const newArticle: StoredArticle = {
    ...article,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }

  await redisTransaction([
    ['SET', articleKey(newArticle.id), JSON.stringify(newArticle)],
    ['SET', INDEX_KEY, JSON.stringify([toSummary(newArticle), ...index])],
  ])
  invalidateCache()
  return newArticle
}

export async function updateArticle(
  id: string,
  patch: Partial<StoredArticle>
): Promise<StoredArticle | null> {
  // Sequential on purpose: readIndex may run the legacy migration that creates article:<id>
  const index = await readIndex()
  const existing = await readArticle(id)
  if (!existing) return null

  // id and createdAt are immutable
  const updated: StoredArticle = { ...existing, ...patch, id: existing.id, createdAt: existing.createdAt }
  const nextIndex = index.map((a) => (a.id === id ? toSummary(updated) : a))

  await redisTransaction([
    ['SET', articleKey(id), JSON.stringify(updated)],
    ['SET', INDEX_KEY, JSON.stringify(nextIndex)],
  ])
  invalidateCache()
  return updated
}

export async function deleteArticle(id: string): Promise<boolean> {
  const index = await readIndex()
  const nextIndex = index.filter((a) => a.id !== id)
  if (nextIndex.length === index.length) return false

  await redisTransaction([
    ['DEL', articleKey(id)],
    ['SET', INDEX_KEY, JSON.stringify(nextIndex)],
  ])
  invalidateCache()
  return true
}
