'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Lang } from '@/lib/i18n'
import { ACCEPT_OFFERED, DENY_ALL } from '@/lib/consent'
import { useConsent } from './useConsent'
import { COOKIE_TEXTS } from './cookie-texts'

interface CookieBannerProps {
  lang: Lang
}

export default function CookieBanner({ lang }: CookieBannerProps) {
  const { hydrated, record, save } = useConsent()
  const [expanded, setExpanded] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  const t = COOKIE_TEXTS[lang]

  // Cât timp nu știm ce a ales vizitatorul, nu afișăm nimic: altfel bannerul
  // ar apărea o clipă și pentru cine a ales deja.
  if (!hydrated || record) return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-zinc-900/95 backdrop-blur-md shadow-2xl">
        <div className="p-6 sm:p-7">
          <h2 id="cookie-banner-title" className="text-white font-bold text-lg mb-2">
            {t.title}
          </h2>
          <p className="text-white/50 text-sm leading-relaxed">{t.body}</p>

          <Link
            href={`/${lang}/cookies`}
            className="inline-block mt-3 text-[#e8ff00] text-sm underline underline-offset-4 hover:text-[#c8db00] transition-colors"
          >
            {t.policyLink}
          </Link>

          {expanded && (
            <div className="mt-6 space-y-3 border-t border-white/10 pt-5">
              {/* Strict necesare — informativ, fără control: nu există alegere de făcut. */}
              <div className="p-4 rounded-xl bg-zinc-800/50 border border-white/5">
                <div className="flex items-center justify-between gap-4 mb-1.5">
                  <span className="text-white font-semibold text-sm">
                    {t.categories.necessary.name}
                  </span>
                  <span className="text-white/30 text-xs font-medium flex-shrink-0">
                    {t.alwaysOn}
                  </span>
                </div>
                <p className="text-white/40 text-xs leading-relaxed">
                  {t.categories.necessary.desc}
                </p>
              </div>

              {/* Analiză */}
              <label className="block p-4 rounded-xl bg-zinc-800/50 border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
                <div className="flex items-center justify-between gap-4 mb-1.5">
                  <span className="text-white font-semibold text-sm">
                    {t.categories.analytics.name}
                  </span>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="h-5 w-5 flex-shrink-0 rounded accent-[#e8ff00] cursor-pointer"
                  />
                </div>
                <p className="text-white/40 text-xs leading-relaxed">
                  {t.categories.analytics.desc}
                </p>
              </label>
            </div>
          )}

          {/* Accept și Refuz au aceeași dimensiune și prominență: un refuz mai
              greu decât acceptul înseamnă consimțământ care nu e liber dat. */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            {expanded ? (
              <button
                type="button"
                onClick={() => save({ ...DENY_ALL, analytics })}
                className="flex-1 py-3 px-5 rounded-xl bg-[#e8ff00] text-black font-bold text-sm hover:bg-[#c8db00] transition-colors"
              >
                {t.save}
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => save(ACCEPT_OFFERED)}
                  className="flex-1 py-3 px-5 rounded-xl bg-[#e8ff00] text-black font-bold text-sm hover:bg-[#c8db00] transition-colors"
                >
                  {t.acceptAll}
                </button>
                <button
                  type="button"
                  onClick={() => save(DENY_ALL)}
                  className="flex-1 py-3 px-5 rounded-xl bg-zinc-800 text-white font-bold text-sm border border-white/15 hover:border-white/30 transition-colors"
                >
                  {t.rejectAll}
                </button>
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="flex-1 py-3 px-5 rounded-xl bg-transparent text-white/60 font-semibold text-sm border border-white/10 hover:text-white/90 hover:border-white/20 transition-colors"
                >
                  {t.settings}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
