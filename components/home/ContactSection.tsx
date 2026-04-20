'use client'

import { useState } from 'react'
import type { Lang } from '@/lib/i18n'

interface ContactSectionProps {
  lang: Lang
}

const COPY = {
  ro: {
    badge: 'Contact rapid',
    title: 'Hai să vorbim despre\nafacerea ta',
    subtitle: 'Completează formularul și te contactăm în maxim 2 ore în timpul programului de lucru.',
    name: 'Nume și prenume',
    namePlaceholder: 'Ion Popescu',
    phone: 'Telefon',
    phonePlaceholder: '+373 68 996 315',
    email: 'Email (opțional)',
    emailPlaceholder: 'email@companie.md',
    message: 'Mesaj',
    messagePlaceholder: 'Descrie pe scurt ce ai nevoie...',
    send: 'Trimite mesajul',
    sending: 'Se trimite...',
    success: 'Mesaj trimis! Te contactăm în curând.',
    error: 'Eroare la trimitere. Încearcă din nou.',
    required: 'Câmpurile marcate cu * sunt obligatorii.',
    info: [
      { icon: '📞', label: 'Telefon', value: '+373 68 996 315', href: 'tel:+37368996315' },
      { icon: '✉️', label: 'Email', value: 'vlad@keywords.md', href: 'mailto:vlad@keywords.md' },
      { icon: '📍', label: 'Adresă', value: 'Bd. Iurii Gagarin 10, CBC, Chișinău', href: null },
      { icon: '⏰', label: 'Program', value: 'Lun–Vin, 9:00–18:00', href: null },
    ],
  },
  ru: {
    badge: 'Быстрый контакт',
    title: 'Давайте поговорим о\nвашем бизнесе',
    subtitle: 'Заполните форму и мы свяжемся с вами в течение 2 часов в рабочее время.',
    name: 'Имя и фамилия',
    namePlaceholder: 'Иван Попеску',
    phone: 'Телефон',
    phonePlaceholder: '+373 68 996 315',
    email: 'Email (необязательно)',
    emailPlaceholder: 'email@company.md',
    message: 'Сообщение',
    messagePlaceholder: 'Кратко опишите, что вам нужно...',
    send: 'Отправить сообщение',
    sending: 'Отправка...',
    success: 'Сообщение отправлено! Свяжемся с вами скоро.',
    error: 'Ошибка отправки. Попробуйте снова.',
    required: 'Поля, отмеченные *, обязательны для заполнения.',
    info: [
      { icon: '📞', label: 'Телефон', value: '+373 68 996 315', href: 'tel:+37368996315' },
      { icon: '✉️', label: 'Email', value: 'vlad@keywords.md', href: 'mailto:vlad@keywords.md' },
      { icon: '📍', label: 'Адрес', value: 'Бул. Юрия Гагарина 10, CBC, Кишинёв', href: null },
      { icon: '⏰', label: 'Часы работы', value: 'Пн–Пт, 9:00–18:00', href: null },
    ],
  },
  en: {
    badge: 'Quick contact',
    title: 'Let\'s talk about\nyour business',
    subtitle: 'Fill in the form and we\'ll contact you within 2 hours during business hours.',
    name: 'Full name',
    namePlaceholder: 'John Smith',
    phone: 'Phone',
    phonePlaceholder: '+373 68 996 315',
    email: 'Email (optional)',
    emailPlaceholder: 'email@company.com',
    message: 'Message',
    messagePlaceholder: 'Briefly describe what you need...',
    send: 'Send message',
    sending: 'Sending...',
    success: 'Message sent! We\'ll be in touch soon.',
    error: 'Failed to send. Please try again.',
    required: 'Fields marked with * are required.',
    info: [
      { icon: '📞', label: 'Phone', value: '+373 68 996 315', href: 'tel:+37368996315' },
      { icon: '✉️', label: 'Email', value: 'vlad@keywords.md', href: 'mailto:vlad@keywords.md' },
      { icon: '📍', label: 'Address', value: 'Bd. Iurii Gagarin 10, CBC, Chișinău', href: null },
      { icon: '⏰', label: 'Hours', value: 'Mon–Fri, 9:00–18:00', href: null },
    ],
  },
}

export default function ContactSection({ lang }: ContactSectionProps) {
  const t = COPY[lang]
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [phoneError, setPhoneError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (name === 'phone') setPhoneError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!form.phone.trim()) {
      setPhoneError(lang === 'ro' ? 'Telefonul este obligatoriu' : lang === 'ru' ? 'Телефон обязателен' : 'Phone is required')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setForm({ name: '', phone: '', email: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="py-32 bg-zinc-950 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-[#e8ff00]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-[#e8ff00]/10 border border-[#e8ff00]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8ff00] animate-pulse" />
            <span className="text-[#e8ff00] text-xs font-semibold tracking-widest uppercase">{t.badge}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 whitespace-pre-line">
            {t.title}
          </h2>
          <p className="text-white/40 text-lg max-w-xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info sidebar */}
          <div className="lg:col-span-2 space-y-4">
            {t.info.map((item) => (
              <div key={item.label} className="flex items-start gap-4 p-5 rounded-2xl bg-zinc-900 border border-white/8">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <p className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-0.5">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-white font-semibold hover:text-[#e8ff00] transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-white font-semibold">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Trust badges */}
            <div className="mt-6 p-6 rounded-2xl bg-[#e8ff00]/5 border border-[#e8ff00]/15">
              <div className="space-y-3">
                {[
                  lang === 'ro' ? '✓ Răspuns în 2 ore' : lang === 'ru' ? '✓ Ответ в течение 2 часов' : '✓ Response within 2 hours',
                  lang === 'ro' ? '✓ Consultație gratuită' : lang === 'ru' ? '✓ Бесплатная консультация' : '✓ Free consultation',
                  lang === 'ro' ? '✓ Fără angajamente' : lang === 'ru' ? '✓ Без обязательств' : '✓ No commitment required',
                  lang === 'ro' ? '✓ Ofertă personalizată' : lang === 'ru' ? '✓ Персональное предложение' : '✓ Personalised quote',
                ].map((item) => (
                  <p key={item} className="text-[#e8ff00]/80 text-sm font-medium">{item}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-zinc-900 border border-white/10 rounded-3xl p-8 md:p-10 space-y-5">
              {/* Name */}
              <div>
                <label className="block text-white/50 text-sm font-medium mb-2">{t.name}</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t.namePlaceholder}
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#e8ff00]/40 focus:bg-zinc-700 transition-all"
                />
              </div>

              {/* Phone — required */}
              <div>
                <label className="block text-white/50 text-sm font-medium mb-2 flex items-center gap-1">
                  {t.phone}
                  <span className="text-[#e8ff00] font-bold">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder={t.phonePlaceholder}
                  className={`w-full bg-zinc-800 border rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none transition-all ${
                    phoneError
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-white/10 focus:border-[#e8ff00]/40 focus:bg-zinc-700'
                  }`}
                />
                {phoneError && (
                  <p className="text-red-400 text-xs mt-1.5">{phoneError}</p>
                )}
              </div>

              {/* Email — optional */}
              <div>
                <label className="block text-white/50 text-sm font-medium mb-2">{t.email}</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t.emailPlaceholder}
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#e8ff00]/40 focus:bg-zinc-700 transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-white/50 text-sm font-medium mb-2">{t.message}</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t.messagePlaceholder}
                  rows={4}
                  className="w-full bg-zinc-800 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/20 focus:outline-none focus:border-[#e8ff00]/40 focus:bg-zinc-700 transition-all resize-none"
                />
              </div>

              <p className="text-white/20 text-xs">{t.required}</p>

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className="w-full py-4 bg-[#e8ff00] text-black font-black text-lg rounded-xl hover:bg-[#c8db00] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round"/>
                    </svg>
                    {t.sending}
                  </>
                ) : status === 'success' ? (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {t.success}
                  </>
                ) : (
                  <>
                    {t.send}
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </>
                )}
              </button>

              {status === 'error' && (
                <p className="text-red-400 text-sm text-center">{t.error}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
