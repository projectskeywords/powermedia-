import { NextRequest, NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/articles-db'

/**
 * GET /api/indexnow/test
 * Trimite toate articolele existente la IndexNow și returnează statusul.
 * Protejat cu ADMIN_SECRET.
 *
 * Exemplu: GET /api/indexnow/test?secret=powermedia-admin-2025
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://powermedia.md'
const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? ''
const ADMIN_SECRET = process.env.ADMIN_SECRET ?? ''

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (!ADMIN_SECRET || secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!INDEXNOW_KEY) {
    return NextResponse.json(
      { error: 'INDEXNOW_KEY not configured in environment variables' },
      { status: 500 }
    )
  }

  // Verifică că fișierul cheie este accesibil
  const keyFileUrl = `${SITE_URL}/${INDEXNOW_KEY}.txt`
  let keyFileOk = false
  try {
    const kfRes = await fetch(keyFileUrl)
    const kfBody = await kfRes.text()
    keyFileOk = kfBody.trim() === INDEXNOW_KEY
    console.log(`[IndexNow] Key file ${keyFileUrl}: status=${kfRes.status}, match=${keyFileOk}`)
  } catch (e) {
    console.error('[IndexNow] Cannot fetch key file:', e)
  }

  // Construiește lista de URL-uri din toate articolele
  const articles = await getAllArticles()
  const urls: string[] = []

  for (const article of articles) {
    if (article.ro?.slug) urls.push(`${SITE_URL}/ro/articole/${article.ro.slug}`)
    if (article.ru?.slug) urls.push(`${SITE_URL}/ru/articole/${article.ru.slug}`)
    if (article.en?.slug) urls.push(`${SITE_URL}/en/articole/${article.en.slug}`)
  }

  if (urls.length === 0) {
    return NextResponse.json({ error: 'No articles found in database' }, { status: 404 })
  }

  const payload = {
    host: new URL(SITE_URL).hostname,
    key: INDEXNOW_KEY,
    keyLocation: keyFileUrl,
    urlList: urls,
  }

  console.log('[IndexNow] Manual submission payload:', JSON.stringify(payload))

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  })

  const resBody = await res.text().catch(() => '')

  return NextResponse.json({
    success: res.ok,
    indexnow: {
      status: res.status,
      statusText: res.statusText,
      response: resBody || '(empty — normal for 200)',
    },
    keyFile: {
      url: keyFileUrl,
      valid: keyFileOk,
    },
    urlsSubmitted: urls,
    articlesCount: articles.length,
  })
}
