import { NextRequest, NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/articles-db'

/**
 * GET /api/indexnow/test?secret=powermedia-admin-2025
 *
 * Verifică și trimite toate articolele la indexare:
 * - IndexNow (Bing, Yandex)
 * - Google sitemap ping
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://powermedia.md'
const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? ''
const ADMIN_SECRET = process.env.ADMIN_SECRET ?? ''

export async function GET(req: NextRequest) {
  // Auth
  const secret = req.nextUrl.searchParams.get('secret')
  if (!ADMIN_SECRET || secret !== ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results: Record<string, unknown> = {}

  // 1. Verifică fișierul cheie IndexNow
  const keyFileUrl = `${SITE_URL}/${INDEXNOW_KEY}.txt`
  if (INDEXNOW_KEY) {
    try {
      const kfRes = await fetch(keyFileUrl, { cache: 'no-store' })
      const kfBody = await kfRes.text()
      results.keyFile = {
        url: keyFileUrl,
        httpStatus: kfRes.status,
        valid: kfBody.trim() === INDEXNOW_KEY,
        content: kfBody.trim(),
      }
    } catch (e) {
      results.keyFile = { error: String(e) }
    }
  } else {
    results.keyFile = { error: 'INDEXNOW_KEY env var not set' }
  }

  // 2. Colectează URL-urile articolelor
  const articles = await getAllArticles()
  const urls: string[] = []
  for (const a of articles) {
    if (a.ro?.slug) urls.push(`${SITE_URL}/ro/articole/${a.ro.slug}`)
    if (a.ru?.slug) urls.push(`${SITE_URL}/ru/articole/${a.ru.slug}`)
    if (a.en?.slug) urls.push(`${SITE_URL}/en/articole/${a.en.slug}`)
  }

  results.articles = { count: articles.length, urlsCount: urls.length, urls }

  // 3. IndexNow submission
  if (INDEXNOW_KEY && urls.length > 0) {
    try {
      const payload = {
        host: new URL(SITE_URL).hostname,
        key: INDEXNOW_KEY,
        keyLocation: keyFileUrl,
        urlList: urls,
      }
      const res = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      })
      const body = await res.text().catch(() => '')
      results.indexNow = {
        status: res.status,
        ok: res.ok,
        meaning: res.status === 200 ? '✅ Acceptat' :
                 res.status === 202 ? '✅ Preluat spre procesare' :
                 res.status === 400 ? '❌ Request invalid' :
                 res.status === 403 ? '❌ Cheie invalidă sau keyFile inaccesibil' :
                 res.status === 422 ? '❌ URL-uri invalide / cheie greșită' :
                 res.status === 429 ? '⚠️ Prea multe cereri' : '?',
        rawResponse: body || '(empty — normal)',
      }
    } catch (e) {
      results.indexNow = { error: String(e) }
    }
  } else {
    results.indexNow = { skipped: true, reason: !INDEXNOW_KEY ? 'No INDEXNOW_KEY' : 'No articles' }
  }

  // 4. Google sitemap ping (nu IndexNow, metodă separată)
  try {
    const sitemapUrl = `${SITE_URL}/sitemap-articles.xml`
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
    const gRes = await fetch(googlePingUrl)
    results.googleSitemapPing = {
      pingUrl: googlePingUrl,
      status: gRes.status,
      ok: gRes.status === 200,
      meaning: gRes.status === 200
        ? '✅ Google a primit sitemapul'
        : `⚠️ Status ${gRes.status}`,
    }
  } catch (e) {
    results.googleSitemapPing = { error: String(e) }
  }

  // 5. Link direct Google Search Console URL Inspection
  const gscLinks = urls.slice(0, 3).map((u) => ({
    url: u,
    inspectInGoogle: `https://search.google.com/search-console/inspect?resource_id=https%3A%2F%2Fpowermedia.md%2F&id=${encodeURIComponent(u)}`,
  }))
  results.googleSearchConsole = {
    note: 'Deschide linkul de mai jos în Google Search Console pentru a vedea statusul de indexare',
    dashboardUrl: 'https://search.google.com/search-console?resource_id=https%3A%2F%2Fpowermedia.md%2F',
    sampleInspectLinks: gscLinks,
  }

  return NextResponse.json(results, { status: 200 })
}
