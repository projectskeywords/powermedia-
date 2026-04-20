import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://powermedia.md'
const LANGS = ['ro', 'ru', 'en'] as const

const STATIC_PAGES = [
  '',
  '/despre',
  '/contact',
  '/servicii',
  '/servicii/creare-website',
  '/servicii/magazin-online',
  '/servicii/crm-erp',
  '/servicii/publicitate-google',
  '/servicii/automatizari-ai',
  '/articole',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const lang of LANGS) {
    for (const page of STATIC_PAGES) {
      entries.push({
        url: `${SITE_URL}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : page.startsWith('/servicii/') ? 0.8 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            LANGS.map((l) => [l, `${SITE_URL}/${l}${page}`])
          ),
        },
      })
    }
  }

  return entries
}
