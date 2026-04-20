import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/articles-db'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://powermedia.md'
const LANGS = ['ro', 'ru', 'en'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles()
  const entries: MetadataRoute.Sitemap = []

  for (const article of articles) {
    for (const lang of LANGS) {
      const version = article[lang]
      if (!version?.slug) continue

      entries.push({
        url: `${SITE_URL}/${lang}/articole/${version.slug}`,
        lastModified: new Date(article.createdAt),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            LANGS
              .filter((l) => article[l]?.slug)
              .map((l) => [l, `${SITE_URL}/${l}/articole/${article[l].slug}`])
          ),
        },
      })
    }
  }

  return entries
}
