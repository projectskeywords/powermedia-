import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getMessages, isValidLang, type Lang } from '@/lib/i18n'
import ContactForm from './ContactForm'

interface PageProps { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLang(lang)) return {}
  const t = getMessages(lang as Lang)
  const titles: Record<Lang, string> = {
    ro: 'Contactează Powermedia | Agenție Digitală Chișinău Moldova',
    ru: 'Связаться с Powermedia | Цифровое агентство Кишинёв Молдова',
    en: 'Contact Powermedia | Digital Agency Chișinău Moldova',
  }
  const descs: Record<Lang, string> = {
    ro: 'Contactează echipa Powermedia pentru o consultație gratuită. Bd. Iurii Gagarin 10, Chișinău. Tel: +373 68 996 315. Răspundem în max 2 ore.',
    ru: 'Свяжитесь с командой Powermedia для бесплатной консультации. Бул. Гагарина 10, Кишинёв. Тел: +373 68 996 315. Отвечаем в течение 2 часов.',
    en: 'Contact the Powermedia team for a free consultation. Bd. Gagarin 10, Chișinău. Tel: +373 68 996 315. We respond within 2 hours.',
  }
  return {
    title: titles[lang as Lang],
    description: descs[lang as Lang],
    alternates: {
      canonical: `https://powermedia.md/${lang}/contact`,
      languages: {
        ro: 'https://powermedia.md/ro/contact',
        ru: 'https://powermedia.md/ru/contact',
        en: 'https://powermedia.md/en/contact',
      },
    },
  }
}

export default async function ContactPage({ params }: PageProps) {
  const { lang } = await params
  if (!isValidLang(lang)) notFound()
  const t = getMessages(lang as Lang)
  const l = lang as Lang

  const hoursLabel = l === 'ro' ? 'Program de lucru' : l === 'ru' ? 'Часы работы' : 'Working hours'
  const hoursValue = l === 'ro' ? 'Lun–Vin: 09:00–18:00' : l === 'ru' ? 'Пн–Пт: 09:00–18:00' : 'Mon–Fri: 09:00–18:00'
  const responseLabel = l === 'ro' ? 'Răspuns în max 2 ore' : l === 'ru' ? 'Ответим за 2 часа' : 'Response within 2 hours'
  const mapLabel = l === 'ro' ? 'Găsește-ne pe hartă' : l === 'ru' ? 'Найдите нас на карте' : 'Find us on the map'

  return (
    <main className="bg-black min-h-screen">
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">

            {/* Left — info */}
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-4">
                {t.contact.title}
              </h1>
              <p className="text-white/50 text-lg leading-relaxed mb-10">
                {t.contact.subtitle}
              </p>

              <div className="space-y-4">
                {/* Phone */}
                <a
                  href="tel:+37368996315"
                  className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900 border border-white/10 hover:border-[#e8ff00]/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#e8ff00]/10 flex items-center justify-center flex-shrink-0">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#e8ff00">
                      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.58 1 1 0 01-.25 1.02l-2.2 2.19z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-0.5">
                      {l === 'ro' ? 'Telefon' : l === 'ru' ? 'Телефон' : 'Phone'}
                    </div>
                    <div className="text-white font-bold group-hover:text-[#e8ff00] transition-colors">
                      {t.contact.phoneLabel}
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:vlad@keywords.md"
                  className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900 border border-white/10 hover:border-[#e8ff00]/30 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#e8ff00]/10 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8ff00" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Email</div>
                    <div className="text-white font-bold group-hover:text-[#e8ff00] transition-colors">
                      vlad@keywords.md
                    </div>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900 border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-[#e8ff00]/10 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8ff00" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-0.5">
                      {l === 'ro' ? 'Adresă' : l === 'ru' ? 'Адрес' : 'Address'}
                    </div>
                    <div className="text-white font-bold">{t.contact.address}</div>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900 border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-[#e8ff00]/10 flex items-center justify-center flex-shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8ff00" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12 6 12 12 16 14"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-0.5">{hoursLabel}</div>
                    <div className="text-white font-bold">{hoursValue}</div>
                    <div className="text-[#e8ff00] text-xs mt-0.5">{responseLabel}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — form */}
            <ContactForm lang={l} t={t.contact} />
          </div>

          {/* Google Maps embed */}
          <div className="mt-16 max-w-5xl mx-auto">
            <p className="text-white/40 text-sm uppercase tracking-widest mb-4 font-semibold">{mapLabel}</p>
            <div className="rounded-2xl overflow-hidden border border-white/10" style={{ height: '380px' }}>
              <iframe
                src="https://www.google.com/maps?q=powermedia.md&output=embed&z=17"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Powermedia — Bd. Iurii Gagarin 10, Chișinău, Moldova"
              />
            </div>
            <a
              href="https://maps.google.com/?q=powermedia.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 mt-3 text-white/30 hover:text-[#e8ff00] text-xs transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              {l === 'ro' ? 'Deschide în Google Maps' : l === 'ru' ? 'Открыть в Google Maps' : 'Open in Google Maps'}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
