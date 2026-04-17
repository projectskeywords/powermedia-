import { NextRequest, NextResponse } from 'next/server'
import { generateMultilingualArticle } from '@/lib/gemini'
import { searchImages } from '@/lib/unsplash'
import { buildInternalLinks } from '@/lib/interlinking'
import { saveArticle, getAllArticles } from '@/lib/articles-db'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://powermedia.md'
const INDEXNOW_KEY = process.env.INDEXNOW_KEY ?? ''

async function submitToIndexNow(roSlug: string, ruSlug: string, enSlug: string) {
  if (!INDEXNOW_KEY) return

  const urls = [
    `${SITE_URL}/ro/articole/${roSlug}`,
    `${SITE_URL}/ru/articole/${ruSlug}`,
    `${SITE_URL}/en/articole/${enSlug}`,
  ]

  const body = {
    host: new URL(SITE_URL).hostname,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  }

  await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
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
    const existingArticles = getAllArticles().slice(0, 5).map((a) => ({
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
    const saved = saveArticle({ topic: topic.trim(), ro: article.ro, ru: article.ru, en: article.en, images })

    // Submit article URLs to IndexNow for immediate search engine indexing
    submitToIndexNow(saved.ro.slug, saved.ru.slug, saved.en.slug).catch(() => {
      // Non-critical — don't fail the request if indexing submission fails
    })

    return NextResponse.json({ success: true, article: saved })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
