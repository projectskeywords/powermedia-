import { ArticleVersion } from './gemini'
import { UnsplashImage } from './unsplash'

export interface StoredArticle {
  id: string
  topic: string
  createdAt: string
  ro: ArticleVersion
  ru: ArticleVersion
  en: ArticleVersion
  images: UnsplashImage[]
}

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN
const KEY = 'articles'

// Use Upstash pipeline format — unambiguous, value passed as plain string arg
async function redisGet(key: string): Promise<StoredArticle[]> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return []

  const res = await fetch(`${UPSTASH_URL}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([['GET', key]]),
    cache: 'no-store',
  })

  const data = await res.json() as Array<{ result: string | null }>
  const raw = data[0]?.result

  if (!raw) return []

  try {
    const parsed = JSON.parse(raw)
    // Defensive: handle double-serialized string
    if (typeof parsed === 'string') return JSON.parse(parsed) as StoredArticle[]
    if (Array.isArray(parsed)) return parsed as StoredArticle[]
    return []
  } catch {
    return []
  }
}

async function redisSet(key: string, articles: StoredArticle[]): Promise<void> {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return

  await fetch(`${UPSTASH_URL}/pipeline`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([['SET', key, JSON.stringify(articles)]]),
  })
}

export async function getAllArticles(): Promise<StoredArticle[]> {
  return redisGet(KEY)
}

export async function getArticleBySlug(
  slug: string,
  lang: 'ro' | 'ru' | 'en'
): Promise<StoredArticle | null> {
  const articles = await getAllArticles()
  return articles.find((a) => a[lang]?.slug === slug) ?? null
}

export async function saveArticle(
  article: Omit<StoredArticle, 'id' | 'createdAt'>
): Promise<StoredArticle> {
  const articles = await getAllArticles()
  const newArticle: StoredArticle = {
    ...article,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  articles.unshift(newArticle)
  await redisSet(KEY, articles)
  return newArticle
}

export async function updateArticle(
  id: string,
  patch: Partial<StoredArticle>
): Promise<StoredArticle | null> {
  const articles = await getAllArticles()
  const idx = articles.findIndex((a) => a.id === id)
  if (idx === -1) return null
  articles[idx] = { ...articles[idx], ...patch }
  await redisSet(KEY, articles)
  return articles[idx]
}

export async function deleteArticle(id: string): Promise<boolean> {
  const articles = await getAllArticles()
  const filtered = articles.filter((a) => a.id !== id)
  if (filtered.length === articles.length) return false
  await redisSet(KEY, filtered)
  return true
}
