'use client'

import Link from 'next/link'
import type { Lang } from '@/lib/i18n'

interface ArticleLangSwitcherProps {
  currentLang: Lang
  slugs: Record<Lang, string>
}

const LABELS: Record<Lang, string> = { ro: 'RO', ru: 'RU', en: 'EN' }

export default function ArticleLangSwitcher({ currentLang, slugs }: ArticleLangSwitcherProps) {
  return (
    <div className="flex items-center gap-1">
      {(['ro', 'ru', 'en'] as Lang[]).map((lang) => (
        <Link
          key={lang}
          href={`/${lang}/articole/${slugs[lang]}`}
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
