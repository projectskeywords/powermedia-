import { NextRequest, NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/articles-db'
import { submitUrlsToGoogle } from '@/lib/google-indexing'

/**
 * GET /api/indexnow/test?secret=powermedia-admin-2025
 *
 * Trimite toate articolele la indexare:
 * - IndexNow (Bing, Yandex) — funcționează automat
 * - Google Indexing API — necesită GOOGLE_SERVICE_ACCOUNT_JSON
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://powermedia.md'
const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? ''
const ADMIN_SECRET = process.env.ADMIN_SECRET ?? ''

export async function GET(req: NextRequest) {
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
  results.articles = { count: articles.length, urlsCount: urls.length }

  // 3. IndexNow → Bing, Yandex
  if (INDEXNOW_KEY && urls.length > 0) {
    try {
      const res = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host: new URL(SITE_URL).hostname,
          key: INDEXNOW_KEY,
          keyLocation: keyFileUrl,
          urlList: urls,
        }),
      })
      const body = await res.text().catch(() => '')
      results.indexNow = {
        status: res.status,
        ok: res.ok,
        meaning: res.status === 200 ? '✅ Acceptat de Bing/Yandex' :
                 res.status === 202 ? '✅ Preluat spre procesare' :
                 res.status === 403 ? '❌ Cheie invalidă' :
                 res.status === 422 ? '❌ URL-uri invalide' :
                 res.status === 429 ? '⚠️ Prea multe cereri' : `Status ${res.status}`,
        rawResponse: body || '(empty — normal)',
      }
    } catch (e) {
      results.indexNow = { error: String(e) }
    }
  } else {
    results.indexNow = { skipped: true, reason: !INDEXNOW_KEY ? 'INDEXNOW_KEY lipsă' : 'Nicio articole' }
  }

  // 4. Google Indexing API
  const hasGoogleCreds = !!process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (hasGoogleCreds && urls.length > 0) {
    try {
      await submitUrlsToGoogle(urls)
      results.googleIndexingApi = {
        ok: true,
        meaning: '✅ URLs trimise la Google Indexing API',
        urlsCount: urls.length,
      }
    } catch (e) {
      results.googleIndexingApi = { ok: false, error: String(e) }
    }
  } else {
    results.googleIndexingApi = {
      ok: false,
      meaning: '⚠️ GOOGLE_SERVICE_ACCOUNT_JSON nu e setat',
      setup: 'Vezi instrucțiunile din README pentru configurare',
    }
  }

  return NextResponse.json(results, { status: 200 })
}
