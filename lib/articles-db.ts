import { revalidateTag, unstable_cache } from 'next/cache'
import { ArticleVersion } from './gemini'
import { UnsplashImage } from './unsplash'
import { query } from './db'

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

// Lightweight row — everything listings, sitemaps and the admin table need, without the content.
export interface ArticleSummary {
  id: string
  topic: string
  createdAt: string
  ro: ArticleVersionSummary
  ru: ArticleVersionSummary
  en: ArticleVersionSummary
  image: UnsplashImage | null
}

export const ARTICLES_CACHE_TAG = 'articles'
const CACHE_TTL_SECONDS = 60 * 60 * 24 // safety net; writes invalidate the tag immediately

interface ArticleRow extends Omit<StoredArticle, 'createdAt'> {
  createdAt: string | Date
}

interface SummaryRow extends Omit<ArticleSummary, 'createdAt'> {
  createdAt: string | Date
}

const toIso = (value: string | Date) => new Date(value).toISOString()

const ARTICLE_COLUMNS = `id, topic, created_at AS "createdAt", ro, ru, en, images`

const SUMMARY_COLUMNS = `id, topic, created_at AS "createdAt",
  ro - 'content' - 'imageQuery' AS ro,
  ru - 'content' - 'imageQuery' AS ru,
  en - 'content' - 'imageQuery' AS en,
  images -> 0 AS image`

function rowToArticle(row: ArticleRow): StoredArticle {
  return { ...row, createdAt: toIso(row.createdAt), images: row.images ?? [] }
}

async function readSummaries(): Promise<ArticleSummary[]> {
  const rows = await query<SummaryRow>(
    `SELECT ${SUMMARY_COLUMNS} FROM articles ORDER BY created_at DESC, id DESC`
  )
  return rows.map((row) => ({ ...row, createdAt: toIso(row.createdAt), image: row.image ?? null }))
}

async function readArticle(id: string): Promise<StoredArticle | null> {
  const [row] = await query<ArticleRow>(`SELECT ${ARTICLE_COLUMNS} FROM articles WHERE id = $1`, [id])
  return row ? rowToArticle(row) : null
}

function invalidateCache(): void {
  revalidateTag(ARTICLES_CACHE_TAG, { expire: 0 })
}

// ── Cached reads (served from the Next.js data cache, not from the database) ─

export const getArticleSummaries: () => Promise<ArticleSummary[]> = unstable_cache(
  readSummaries,
  ['articles-summaries'],
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
  const rows = await query<ArticleRow>(`SELECT ${ARTICLE_COLUMNS} FROM articles ORDER BY created_at DESC, id DESC`)
  return rows.map(rowToArticle)
}

// ── Writes ────────────────────────────────────────────────────────────────────

const json = (value: unknown) => JSON.stringify(value ?? null)

export async function saveArticle(
  article: Omit<StoredArticle, 'id' | 'createdAt'>
): Promise<StoredArticle> {
  const [row] = await query<ArticleRow>(
    `INSERT INTO articles (id, topic, created_at, ro, ru, en, images)
     VALUES ($1, $2, $3, $4::jsonb, $5::jsonb, $6::jsonb, $7::jsonb)
     RETURNING ${ARTICLE_COLUMNS}`,
    [Date.now().toString(), article.topic, new Date().toISOString(),
      json(article.ro), json(article.ru), json(article.en), json(article.images ?? [])]
  )
  invalidateCache()
  return rowToArticle(row)
}

export async function updateArticle(
  id: string,
  patch: Partial<StoredArticle>
): Promise<StoredArticle | null> {
  const existing = await readArticle(id)
  if (!existing) return null

  // id and createdAt are immutable
  const next: StoredArticle = { ...existing, ...patch, id: existing.id, createdAt: existing.createdAt }
  const [row] = await query<ArticleRow>(
    `UPDATE articles SET topic = $2, ro = $3::jsonb, ru = $4::jsonb, en = $5::jsonb, images = $6::jsonb
     WHERE id = $1
     RETURNING ${ARTICLE_COLUMNS}`,
    [id, next.topic, json(next.ro), json(next.ru), json(next.en), json(next.images ?? [])]
  )
  if (!row) return null
  invalidateCache()
  return rowToArticle(row)
}

export async function deleteArticle(id: string): Promise<boolean> {
  const rows = await query(`DELETE FROM articles WHERE id = $1 RETURNING id`, [id])
  if (rows.length === 0) return false
  invalidateCache()
  return true
}
