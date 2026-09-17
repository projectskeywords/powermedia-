'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Lang } from '@/lib/i18n'
import { COMPANY } from '@/lib/company'

interface ContactFormProps {
  lang: Lang
  t: {
    name: string
    email: string
    phone: string
    message: string
    send: string
    sending: string
    success: string
    error: string
  }
}

/**
 * Textul de consimțământ. Trebuie să spună explicit în ce scop prelucrăm
 * datele — „sunt de acord cu politica" nu e consimțământ valabil, pentru că
 * nu indică scopul.
 */
const CONSENT_TEXT: Record<Lang, { before: string; link: string; after: string }> = {
  ro: {
    before: `Sunt de acord ca numele, telefonul și mesajul meu să fie prelucrate de ${COMPANY.legalName} pentru a primi un răspuns la această solicitare. Detalii în `,
    link: 'Politica de confidențialitate',
    after: '. Îmi pot retrage acordul oricând.',
  },
  ru: {
    before: `Я согласен(на) на обработку моего имени, телефона и сообщения компанией ${COMPANY.legalName} для получения ответа на этот запрос. Подробности — в `,
    link: 'Политике конфиденциальности',
    after: '. Я могу отозвать согласие в любой момент.',
  },
  en: {
    before: `I agree that my name, phone number and message may be processed by ${COMPANY.legalName} in order to receive a reply to this enquiry. Details in the `,
    link: 'Privacy Policy',
    after: '. I can withdraw my consent at any time.',
  },
}

const CONSENT_ERROR: Record<Lang, string> = {
  ro: 'Avem nevoie de acordul tău ca să îți putem răspunde.',
  ru: 'Нам нужно ваше согласие, чтобы мы могли вам ответить.',
  en: 'We need your consent in order to reply to you.',
}

export default function ContactForm({ lang, t }: ContactFormProps) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [phoneError, setPhoneError] = useState('')
  const [consentError, setConsentError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (name === 'phone') setPhoneError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.phone.trim()) {
      setPhoneError(
        lang === 'ro' ? 'Telefonul este obligatoriu' :
        lang === 'ru' ? 'Телефон обязателен' :
        'Phone is required'
      )
      return
    }

    if (!consent) {
      setConsentError(CONSENT_ERROR[lang])
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          lang,
          consent,
          // Momentul acordului, pentru dovada consimțământului.
          consentAt: new Date().toISOString(),
        }),
      })
      if (!res.ok) throw new Error('Send failed')
      setStatus('success')
      setForm({ name: '', email: '', phone: '', message: '' })
      setConsent(false)
    } catch {
      setStatus('error')
    }
  }

  const phoneLabel = lang === 'ro' ? 'Telefon' : lang === 'ru' ? 'Телефон' : 'Phone'
  const emailLabel = lang === 'ro' ? 'Email (opțional)' : lang === 'ru' ? 'Email (необязательно)' : 'Email (optional)'
  const phonePlaceholder = '+373 68 996 315'

  if (status === 'success') {
    return (
      <div className="p-8 rounded-2xl bg-zinc-900 border border-[#e8ff00]/30 text-center">
        <div className="text-5xl mb-4">✅</div>
        <p className="text-white font-bold text-xl">{t.success}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-zinc-900 border border-white/10 space-y-4">
      {/* Name */}
      <div>
        <label className="block text-white/60 text-sm mb-1.5 flex items-center gap-1">
          {t.name} <span className="text-[#e8ff00] font-bold">*</span>
        </label>
        <input
          type="text"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          placeholder="Ion Popescu"
          className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#e8ff00]/50 transition-colors"
        />
      </div>

      {/* Phone — required */}
      <div>
        <label className="block text-white/60 text-sm mb-1.5 flex items-center gap-1">
          {phoneLabel} <span className="text-[#e8ff00] font-bold">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder={phonePlaceholder}
          className={`w-full px-4 py-3 rounded-xl bg-zinc-800 border text-white placeholder:text-white/20 focus:outline-none transition-colors ${
            phoneError ? 'border-red-500/60' : 'border-white/10 focus:border-[#e8ff00]/50'
          }`}
        />
        {phoneError && <p className="text-red-400 text-xs mt-1.5">{phoneError}</p>}
      </div>

      {/* Email — optional */}
      <div>
        <label className="block text-white/60 text-sm mb-1.5">{emailLabel}</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="email@companie.md"
          className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#e8ff00]/50 transition-colors"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-white/60 text-sm mb-1.5 flex items-center gap-1">
          {t.message} <span className="text-[#e8ff00] font-bold">*</span>
        </label>
        <textarea
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder={
            lang === 'ro' ? 'Descrie pe scurt ce ai nevoie...' :
            lang === 'ru' ? 'Кратко опишите, что вам нужно...' :
            'Briefly describe what you need...'
          }
          className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-[#e8ff00]/50 transition-colors resize-none"
        />
      </div>

      <p className="text-white/20 text-xs">
        {lang === 'ro' ? 'Câmpurile marcate cu * sunt obligatorii.' :
         lang === 'ru' ? 'Поля, отмеченные *, обязательны.' :
         'Fields marked with * are required.'}
      </p>

      {/* Consimțământ — nebifat implicit, obligatoriu. O căsuță prebifată nu
          reprezintă consimțământ, pentru că lipsește acțiunea vizitatorului. */}
      <div className="pt-2">
        <label className="flex gap-3 cursor-pointer group">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked)
              setConsentError('')
            }}
            aria-describedby={consentError ? 'consent-error' : undefined}
            className={`mt-0.5 h-4 w-4 flex-shrink-0 rounded accent-[#e8ff00] cursor-pointer ${
              consentError ? 'outline outline-1 outline-red-500/60' : ''
            }`}
          />
          <span className="text-white/40 text-xs leading-relaxed group-hover:text-white/60 transition-colors">
            {CONSENT_TEXT[lang].before}
            <Link
              href={`/${lang}/confidentialitate`}
              className="text-[#e8ff00] underline underline-offset-2 hover:text-[#c8db00]"
              onClick={(e) => e.stopPropagation()}
            >
              {CONSENT_TEXT[lang].link}
            </Link>
            {CONSENT_TEXT[lang].after}
          </span>
        </label>
        {consentError && (
          <p id="consent-error" className="text-red-400 text-xs mt-2">
            {consentError}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p className="text-red-400 text-sm">{t.error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full py-4 bg-[#e8ff00] text-black font-black text-lg rounded-xl hover:bg-[#c8db00] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? t.sending : t.send}
      </button>
    </form>
  )
}
