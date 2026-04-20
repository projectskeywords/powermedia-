import { NextRequest, NextResponse } from 'next/server'
import { generateMultilingualArticle } from '@/lib/gemini'
import { searchImages } from '@/lib/unsplash'
import { buildInternalLinks } from '@/lib/interlinking'
import { saveArticle, getAllArticles } from '@/lib/articles-db'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://powermedia.md'
const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? ''

// IndexNow → Bing, Yandex, Seznam, Naver
async function submitToIndexNow(urls: string[]): Promise<void> {
  if (!INDEXNOW_KEY) {
    console.warn('[IndexNow] INDEXNOW_KEY not set — skipping')
    return
  }

  const payload = {
    host: new URL(SITE_URL).hostname,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  }

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  })

  const body = await res.text().catch(() => '')
  console.log(`[IndexNow] ${res.status} — ${body || '(empty = ok)'}`)
}

// Google nu face parte din IndexNow, dar acceptă ping sitemap
async function pingGoogleSitemap(): Promise<void> {
  const sitemapUrl = encodeURIComponent(`${SITE_URL}/sitemap-articles.xml`)
  const res = await fetch(`https://www.google.com/ping?sitemap=${sitemapUrl}`, {
    method: 'GET',
  })
  console.log(`[Google Ping] Sitemap ping status: ${res.status}`)
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { topic?: string }
    const { topic } = body

    if (!topic || typeof topic !== 'string' || topic.trim().length < 3) {
      return NextResponse.json(
        { error: 'topic is required (min 3 characters)' },
        { status: 400 }
      )
    }

    // Generate multilingual article via Gemini
    const article = await generateMultilingualArticle(topic.trim())

    // Simplify imageQuery to first 3 words — long queries return 0 results on Unsplash
    const rawQuery = article.ro.imageQuery ?? ''
    const simpleQuery = rawQuery.split(/\s+/).slice(0, 3).join(' ') || 'business technology'

    const images = await searchImages(simpleQuery, 3).catch(() => [])

    // Get related articles for interlinking
    const existingArticles = (await getAllArticles()).slice(0, 5).map((a) => ({
      ro: { slug: a.ro.slug, title: a.ro.title },
      ru: { slug: a.ru.slug, title: a.ru.title },
      en: { slug: a.en.slug, title: a.en.title },
    }))

    // Apply interlinking for each language
    const langs = ['ro', 'ru', 'en'] as const
    for (const lang of langs) {
      const related = existingArticles.map((a) => ({
        slug: a[lang].slug,
        title: a[lang].title,
      }))
      article[lang].content = buildInternalLinks(article[lang].content, lang, related)
    }

    // Persist the article
    const saved = await saveArticle({ topic: topic.trim(), ro: article.ro, ru: article.ru, en: article.en, images })

    // Fire-and-forget: submit to IndexNow (Bing/Yandex) + ping Google sitemap
    const newUrls = [
      `${SITE_URL}/ro/articole/${saved.ro.slug}`,
      `${SITE_URL}/ru/articole/${saved.ru.slug}`,
      `${SITE_URL}/en/articole/${saved.en.slug}`,
    ]
    console.log('[Indexing] New article URLs:', newUrls)

    Promise.allSettled([
      submitToIndexNow(newUrls),
      pingGoogleSitemap(),
    ]).then((results) => {
      results.forEach((r) => {
        if (r.status === 'rejected') console.error('[Indexing] Error:', r.reason)
      })
    })

    return NextResponse.json({ success: true, article: saved })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
