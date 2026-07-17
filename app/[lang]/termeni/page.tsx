import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isValidLang, type Lang } from '@/lib/i18n'
import { LEGAL_LAST_UPDATED } from '@/lib/company'
import LegalDocument from '@/components/legal/LegalDocument'
import { TERMS_DOC } from '@/content/legal/terms'

interface PageProps { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLang(lang)) return {}

  const titles: Record<Lang, string> = {
    ro: 'Termeni și condiții | Powermedia',
    ru: 'Условия использования | Powermedia',
    en: 'Terms and Conditions | Powermedia',
  }
  const descs: Record<Lang, string> = {
    ro: 'Regulile de utilizare a site-ului powermedia.md, operat de Keywords SRL.',
    ru: 'Правила пользования сайтом powermedia.md, управляемым Keywords SRL.',
    en: 'The rules for using the powermedia.md website, operated by Keywords SRL.',
  }

  return {
    title: titles[lang as Lang],
    description: descs[lang as Lang],
    alternates: {
      canonical: `https://powermedia.md/${lang}/termeni`,
      languages: {
        ro: 'https://powermedia.md/ro/termeni',
        ru: 'https://powermedia.md/ru/termeni',
        en: 'https://powermedia.md/en/termeni',
      },
    },
  }
}

export default async function TermeniPage({ params }: PageProps) {
  const { lang } = await params
  if (!isValidLang(lang)) notFound()

  return (
    <LegalDocument
      doc={TERMS_DOC[lang as Lang]}
      lang={lang as Lang}
      updated={LEGAL_LAST_UPDATED}
    />
  )
}
