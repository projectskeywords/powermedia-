import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import type { StoredArticle } from '@/lib/articles-db'

const DB_PATH = path.join(process.cwd(), 'data', 'articles.json')

function readArticles(): StoredArticle[] {
  if (!fs.existsSync(DB_PATH)) return []
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8')) as StoredArticle[]
}

function writeArticles(articles: StoredArticle[]): void {
  fs.writeFileSync(DB_PATH, JSON.stringify(articles, null, 2), 'utf-8')
}

interface RouteContext {
  params: Promise<{ id: string }>
}

// PATCH /api/admin/articles/[id] — update article fields
export async function PATCH(req: NextRequest, ctx: RouteContext) {
  const { id } = await ctx.params
  const updates = await req.json() as Partial<StoredArticle>

  const articles = readArticles()
  const idx = articles.findIndex((a) => a.id === id)
  if (idx === -1) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  articles[idx] = { ...articles[idx], ...updates, id, createdAt: articles[idx].createdAt }
  writeArticles(articles)

  return NextResponse.json({ success: true, article: articles[idx] })
}

// DELETE /api/admin/articles/[id] — remove article
export async function DELETE(_req: NextRequest, ctx: RouteContext) {
  const { id } = await ctx.params

  const articles = readArticles()
  const filtered = articles.filter((a) => a.id !== id)

  if (filtered.length === articles.length) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  writeArticles(filtered)
  return NextResponse.json({ success: true })
}
