import { NextRequest, NextResponse } from 'next/server'
import { updateArticle, deleteArticle, type StoredArticle } from '@/lib/articles-db'
import { isAdminRequest, unauthorized } from '@/lib/admin-auth'

interface RouteContext {
  params: Promise<{ id: string }>
}

// PATCH /api/admin/articles/[id] — update article fields
export async function PATCH(req: NextRequest, ctx: RouteContext) {
  if (!isAdminRequest(req)) return unauthorized()

  const { id } = await ctx.params
  const updates = await req.json() as Partial<StoredArticle>

  const updated = await updateArticle(id, updates)
  if (!updated) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, article: updated })
}

// DELETE /api/admin/articles/[id] — remove article
export async function DELETE(req: NextRequest, ctx: RouteContext) {
  if (!isAdminRequest(req)) return unauthorized()

  const { id } = await ctx.params

  const ok = await deleteArticle(id)
  if (!ok) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
