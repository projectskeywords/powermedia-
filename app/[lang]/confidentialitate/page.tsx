import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isValidLang, type Lang } from '@/lib/i18n'
import { LEGAL_LAST_UPDATED } from '@/lib/company'
import LegalDocument from '@/components/legal/LegalDocument'
import { PRIVACY_DOC } from '@/content/legal/privacy'

interface PageProps { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLang(lang)) return {}

  const titles: Record<Lang, string> = {
    ro: 'Politica de confidențialitate | Powermedia',
    ru: 'Политика конфиденциальности | Powermedia',
    en: 'Privacy Policy | Powermedia',
  }
  const descs: Record<Lang, string> = {
    ro: 'Cum colectează, folosește și protejează Keywords SRL datele tale cu caracter personal, conform Legii nr. 195/2024 a Republicii Moldova.',
    ru: 'Как Keywords SRL собирает, использует и защищает ваши персональные данные согласно Закону № 195/2024 Республики Молдова.',
    en: 'How Keywords SRL collects, uses and protects your personal data, under Law no. 195/2024 of the Republic of Moldova.',
  }

  return {
    title: titles[lang as Lang],
    description: descs[lang as Lang],
    alternates: {
      canonical: `https://powermedia.md/${lang}/confidentialitate`,
      languages: {
        ro: 'https://powermedia.md/ro/confidentialitate',
        ru: 'https://powermedia.md/ru/confidentialitate',
        en: 'https://powermedia.md/en/confidentialitate',
      },
    },
  }
}

export default async function ConfidentialitatePage({ params }: PageProps) {
  const { lang } = await params
  if (!isValidLang(lang)) notFound()

  return (
    <LegalDocument
      doc={PRIVACY_DOC[lang as Lang]}
      lang={lang as Lang}
      updated={LEGAL_LAST_UPDATED}
    />
  )
}
