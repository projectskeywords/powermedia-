'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LOCALES, type Lang } from '@/lib/i18n'

const LABELS: Record<Lang, string> = { ro: 'RO', ru: 'RU', en: 'EN' }

interface LanguageSelectorProps {
  currentLang: Lang
}

export default function LanguageSelector({ currentLang }: LanguageSelectorProps) {
  const pathname = usePathname()

  function getLocalizedPath(lang: Lang): string {
    // Replace the current lang prefix with new lang
    const segments = pathname.split('/')
    segments[1] = lang
    return segments.join('/')
  }

  return (
    <div className="flex items-center gap-1">
      {LOCALES.map((lang) => (
        <Link
          key={lang}
          href={getLocalizedPath(lang)}
          className={`px-2 py-1 text-xs font-semibold rounded transition-colors ${
            lang === currentLang
              ? 'bg-[#e8ff00] text-black'
              : 'text-white/50 hover:text-white/80'
          }`}
        >
          {LABELS[lang]}
        </Link>
      ))}
    </div>
  )
}
