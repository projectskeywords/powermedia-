import { NextResponse } from 'next/server'
import { getAllArticles } from '@/lib/articles-db'

export const dynamic = 'force-dynamic'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://powermedia.md'
const LANGS = ['ro', 'ru', 'en'] as const

export async function GET() {
  const articles = await getAllArticles()

  const urls = articles
    .flatMap((article) =>
      LANGS
        .filter((lang) => article[lang]?.slug)
        .map((lang) => {
          const alternates = LANGS
            .filter((l) => article[l]?.slug)
            .map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE_URL}/${l}/articole/${article[l].slug}"/>`)
            .join('\n      ')

          return `  <url>
    <loc>${SITE_URL}/${lang}/articole/${article[lang].slug}</loc>
    <lastmod>${new Date(article.createdAt).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    ${alternates}
  </url>`
        })
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}
