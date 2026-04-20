import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getMessages, isValidLang, type Lang } from '@/lib/i18n'

interface PageProps { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLang(lang)) return {}
  const titles: Record<Lang, string> = {
    ro: 'Servicii Digitale Complete | Powermedia Moldova',
    ru: 'Полный спектр цифровых услуг | Powermedia Молдова',
    en: 'Complete Digital Services | Powermedia Moldova',
  }
  return { title: titles[lang as Lang] }
}

export default async function ServiciiPage({ params }: PageProps) {
  const { lang } = await params
  if (!isValidLang(lang)) notFound()

  const t = getMessages(lang as Lang)

  const services = [
    { icon: '🌐', key: 'website', slug: 'creare-website', color: 'blue' },
    { icon: '🛒', key: 'shop', slug: 'magazin-online', color: 'green' },
    { icon: '⚙️', key: 'crm', slug: 'crm-erp', color: 'orange' },
    { icon: '📣', key: 'ads', slug: 'publicitate-google', color: 'red' },
    { icon: '🤖', key: 'ai', slug: 'automatizari-ai', color: 'purple' },
  ] as const

  return (
    <main className="bg-black min-h-screen">
      <section className="pt-32 pb-16 text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
            {t.services.title}
          </h1>
          <p className="text-white/50 text-xl max-w-2xl mx-auto">{t.services.subtitle}</p>
        </div>
      </section>

      <section className="pb-32">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s) => {
              const sData = t.services[s.key]
              return (
                <Link
                  key={s.slug}
                  href={`/${lang}/servicii/${s.slug}`}
                  className="group flex gap-6 p-8 rounded-2xl bg-zinc-900 border border-white/10 hover:border-white/20 transition-all hover:scale-[1.01]"
                >
                  <div className="text-5xl flex-shrink-0">{s.icon}</div>
                  <div>
                    <h2 className="text-white font-black text-2xl mb-2 group-hover:text-[#e8ff00] transition-colors">
                      {sData.name}
                    </h2>
                    <p className="text-white/50 leading-relaxed">{sData.desc}</p>
                    <div className="mt-4 text-[#e8ff00] text-sm font-semibold flex items-center gap-1">
                      <span>Descoperă</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
