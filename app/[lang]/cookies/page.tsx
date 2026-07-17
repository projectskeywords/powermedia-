import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isValidLang, type Lang } from '@/lib/i18n'
import { LEGAL_LAST_UPDATED } from '@/lib/company'
import LegalDocument from '@/components/legal/LegalDocument'
import ConsentSettings from '@/components/consent/ConsentSettings'
import { COOKIES_DOC } from '@/content/legal/cookies'

interface PageProps { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLang(lang)) return {}

  const titles: Record<Lang, string> = {
    ro: 'Politica de cookies | Powermedia',
    ru: 'Политика использования cookie | Powermedia',
    en: 'Cookie Policy | Powermedia',
  }
  const descs: Record<Lang, string> = {
    ro: 'Ce stocăm pe dispozitivul tău, de ce, și cum îți poți retrage consimțământul oricând.',
    ru: 'Что мы храним на вашем устройстве, зачем и как в любой момент отозвать согласие.',
    en: 'What we store on your device, why, and how to withdraw your consent at any time.',
  }

  return {
    title: titles[lang as Lang],
    description: descs[lang as Lang],
    alternates: {
      canonical: `https://powermedia.md/${lang}/cookies`,
      languages: {
        ro: 'https://powermedia.md/ro/cookies',
        ru: 'https://powermedia.md/ru/cookies',
        en: 'https://powermedia.md/en/cookies',
      },
    },
  }
}

export default async function CookiesPage({ params }: PageProps) {
  const { lang } = await params
  if (!isValidLang(lang)) notFound()

  return (
    <LegalDocument
      doc={COOKIES_DOC[lang as Lang]}
      lang={lang as Lang}
      updated={LEGAL_LAST_UPDATED}
    >
      <ConsentSettings lang={lang as Lang} />
    </LegalDocument>
  )
}
