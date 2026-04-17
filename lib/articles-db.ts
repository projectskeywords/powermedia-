import fs from 'fs'
import path from 'path'
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

const DB_PATH = path.join(process.cwd(), 'data', 'articles.json')

function ensureDb(): void {
  const dir = path.dirname(DB_PATH)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(DB_PATH)) fs.writeFileSync(DB_PATH, '[]', 'utf-8')
}

export function getAllArticles(): StoredArticle[] {
  ensureDb()
  const raw = fs.readFileSync(DB_PATH, 'utf-8')
  return JSON.parse(raw) as StoredArticle[]
}

export function getArticleBySlug(
  slug: string,
  lang: 'ro' | 'ru' | 'en'
): StoredArticle | null {
  const articles = getAllArticles()
  return articles.find((a) => a[lang].slug === slug) ?? null
}

export function saveArticle(article: Omit<StoredArticle, 'id' | 'createdAt'>): StoredArticle {
  ensureDb()
  const articles = getAllArticles()
  const newArticle: StoredArticle = {
    ...article,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  articles.unshift(newArticle)
  fs.writeFileSync(DB_PATH, JSON.stringify(articles, null, 2), 'utf-8')
  return newArticle
}

export function updateArticle(id: string, patch: Partial<StoredArticle>): StoredArticle | null {
  ensureDb()
  const articles = getAllArticles()
  const idx = articles.findIndex((a) => a.id === id)
  if (idx === -1) return null
  articles[idx] = { ...articles[idx], ...patch }
  fs.writeFileSync(DB_PATH, JSON.stringify(articles, null, 2), 'utf-8')
  return articles[idx]
}
