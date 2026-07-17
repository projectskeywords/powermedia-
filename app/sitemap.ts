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
  '/confidentialitate',
  '/termeni',
  '/cookies',
]

/** Paginile legale se indexează, dar nu concurează cu cele comerciale. */
const LEGAL_PAGES = new Set(['/confidentialitate', '/termeni', '/cookies'])

function priorityFor(page: string): number {
  if (page === '') return 1
  if (LEGAL_PAGES.has(page)) return 0.3
  if (page.startsWith('/servicii/')) return 0.8
  return 0.7
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const lang of LANGS) {
    for (const page of STATIC_PAGES) {
      entries.push({
        url: `${SITE_URL}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : LEGAL_PAGES.has(page) ? 'yearly' : 'monthly',
        priority: priorityFor(page),
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
