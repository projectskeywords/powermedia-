'use client'

import { useState } from 'react'
import type { Lang } from '@/lib/i18n'
import { DENY_ALL } from '@/lib/consent'
import { useConsent } from './useConsent'

interface SettingsTexts {
  heading: string
  currentGranted: string
  currentDenied: string
  currentNone: string
  choiceMade: string
  analyticsLabel: string
  save: string
  saved: string
  withdraw: string
}

const TEXTS: Record<Lang, SettingsTexts> = {
  ro: {
    heading: 'Alegerea ta',
    currentGranted: 'Ai acceptat cookie-urile de analiză.',
    currentDenied: 'Ai refuzat cookie-urile de analiză. Google Tag Manager nu se încarcă.',
    currentNone: 'Nu ai făcut încă o alegere. Până atunci, nu încărcăm nimic opțional.',
    choiceMade: 'Alegere făcută la',
    analyticsLabel: 'Cookie-uri de analiză (Google Analytics)',
    save: 'Salvează',
    saved: 'Salvat.',
    withdraw: 'Retrage consimțământul',
  },
  ru: {
    heading: 'Ваш выбор',
    currentGranted: 'Вы приняли аналитические cookie.',
    currentDenied: 'Вы отклонили аналитические cookie. Google Tag Manager не загружается.',
    currentNone: 'Вы ещё не сделали выбор. До этого мы не загружаем ничего необязательного.',
    choiceMade: 'Выбор сделан',
    analyticsLabel: 'Аналитические cookie (Google Analytics)',
    save: 'Сохранить',
    saved: 'Сохранено.',
    withdraw: 'Отозвать согласие',
  },
  en: {
    heading: 'Your choice',
    currentGranted: 'You accepted analytics cookies.',
    currentDenied: 'You declined analytics cookies. Google Tag Manager is not loaded.',
    currentNone: 'You have not made a choice yet. Until then, we load nothing optional.',
    choiceMade: 'Choice made on',
    analyticsLabel: 'Analytics cookies (Google Analytics)',
    save: 'Save',
    saved: 'Saved.',
    withdraw: 'Withdraw consent',
  },
}

const LOCALE_BY_LANG: Record<Lang, string> = {
  ro: 'ro-MD',
  ru: 'ru-MD',
  en: 'en-GB',
}

interface ConsentSettingsProps {
  lang: Lang
}

export default function ConsentSettings({ lang }: ConsentSettingsProps) {
  const { hydrated, record, choices, save, withdraw } = useConsent()
  const [draft, setDraft] = useState<boolean | null>(null)
  const [justSaved, setJustSaved] = useState(false)

  const t = TEXTS[lang]

  // Fără hidratare nu știm starea reală; un placeholder de aceeași înălțime
  // evită saltul de layout.
  if (!hydrated) {
    return <div className="mt-12 h-56 rounded-2xl bg-zinc-900/50 border border-white/5" />
  }

  const analytics = draft ?? choices.analytics
  const dirty = draft !== null && draft !== choices.analytics

  const status = !record
    ? t.currentNone
    : choices.analytics
      ? t.currentGranted
      : t.currentDenied

  return (
    <div id="setari-cookies" className="mt-12 p-8 rounded-2xl bg-zinc-900 border border-white/10 scroll-mt-24">
      <h2 className="text-white font-black text-xl mb-3">{t.heading}</h2>
      <p className="text-white/50 text-sm leading-relaxed">{status}</p>

      {record && (
        <p className="text-white/30 text-xs mt-1.5">
          {t.choiceMade}{' '}
          <time dateTime={record.timestamp}>
            {new Date(record.timestamp).toLocaleString(LOCALE_BY_LANG[lang])}
          </time>
        </p>
      )}

      <label className="mt-6 flex items-center justify-between gap-4 p-4 rounded-xl bg-zinc-800/50 border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
        <span className="text-white text-sm font-semibold">{t.analyticsLabel}</span>
        <input
          type="checkbox"
          checked={analytics}
          onChange={(e) => {
            setDraft(e.target.checked)
            setJustSaved(false)
          }}
          className="h-5 w-5 flex-shrink-0 rounded accent-[#e8ff00] cursor-pointer"
        />
      </label>

      <div className="mt-5 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <button
          type="button"
          disabled={!dirty}
          onClick={() => {
            save({ ...DENY_ALL, analytics })
            setDraft(null)
            setJustSaved(true)
          }}
          className="py-2.5 px-6 rounded-xl bg-[#e8ff00] text-black font-bold text-sm hover:bg-[#c8db00] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {t.save}
        </button>

        {record && (
          <button
            type="button"
            onClick={() => {
              withdraw()
              setDraft(null)
              setJustSaved(false)
            }}
            className="py-2.5 px-6 rounded-xl bg-transparent text-white/60 font-semibold text-sm border border-white/10 hover:text-white/90 hover:border-white/20 transition-colors"
          >
            {t.withdraw}
          </button>
        )}

        {justSaved && !dirty && (
          <span className="text-[#e8ff00] text-sm font-semibold" role="status">
            {t.saved}
          </span>
        )}
      </div>
    </div>
  )
}
