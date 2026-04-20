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
    ro: 'Contactează Powermedia | Agenție Digitală Moldova',
    ru: 'Связаться с Powermedia | Цифровое агентство Молдова',
    en: 'Contact Powermedia | Digital Agency Moldova',
  }
  return { title: titles[lang as Lang], description: t.contact.subtitle }
}

export default async function ContactPage({ params }: PageProps) {
  const { lang } = await params
  if (!isValidLang(lang)) notFound()
  const t = getMessages(lang as Lang)
  const l = lang as Lang

  return (
    <main className="bg-black min-h-screen">
      <section className="pt-32 pb-32">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start max-w-5xl mx-auto">
            {/* Left info */}
            <div>
              <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
                {t.contact.title}
              </h1>
              <p className="text-white/50 text-lg leading-relaxed mb-12">
                {t.contact.subtitle}
              </p>

              <div className="space-y-6">
                <a
                  href="tel:+37368996315"
                  className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900 border border-white/10 hover:border-white/20 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#e8ff00]/10 flex items-center justify-center text-2xl">
                    📞
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

                <a
                  href="mailto:vlad@keywords.md"
                  className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900 border border-white/10 hover:border-white/20 transition-colors group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#e8ff00]/10 flex items-center justify-center text-2xl">
                    ✉️
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-0.5">Email</div>
                    <div className="text-white font-bold group-hover:text-[#e8ff00] transition-colors">
                      {t.contact.emailLabel}
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900 border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-[#e8ff00]/10 flex items-center justify-center text-2xl">
                    📍
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-0.5">
                      {l === 'ro' ? 'Adresă' : l === 'ru' ? 'Адрес' : 'Address'}
                    </div>
                    <div className="text-white font-bold">{t.contact.address}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right form */}
            <ContactForm lang={l} t={t.contact} />
          </div>
        </div>
      </section>
    </main>
  )
}
