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

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL!
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!
const KEY = 'articles'

async function redisGet(key: string): Promise<string | null> {
  const res = await fetch(`${UPSTASH_URL}/get/${key}`, {
    headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` },
    cache: 'no-store',
  })
  const data = await res.json() as { result: string | null }
  return data.result
}

async function redisSet(key: string, value: string): Promise<void> {
  await fetch(`${UPSTASH_URL}/set/${key}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UPSTASH_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  })
}

export async function getAllArticles(): Promise<StoredArticle[]> {
  const raw = await redisGet(KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as StoredArticle[]
  } catch {
    return []
  }
}

export async function getArticleBySlug(
  slug: string,
  lang: 'ro' | 'ru' | 'en'
): Promise<StoredArticle | null> {
  const articles = await getAllArticles()
  return articles.find((a) => a[lang].slug === slug) ?? null
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
  await redisSet(KEY, JSON.stringify(articles))
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
  await redisSet(KEY, JSON.stringify(articles))
  return articles[idx]
}

export async function deleteArticle(id: string): Promise<boolean> {
  const articles = await getAllArticles()
  const filtered = articles.filter((a) => a.id !== id)
  if (filtered.length === articles.length) return false
  await redisSet(KEY, JSON.stringify(filtered))
  return true
}
