import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { getMessages, isValidLang, type Lang } from '@/lib/i18n'

interface PageProps { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLang(lang)) return {}
  const t = getMessages(lang as Lang)
  const titles: Record<Lang, string> = {
    ro: 'Despre Powermedia — Agenție Digitală Moldova',
    ru: 'О Powermedia — Цифровое агентство Молдова',
    en: 'About Powermedia — Digital Agency Moldova',
  }
  return { title: titles[lang as Lang], description: t.about.subtitle }
}

const TEAM = [
  { name: 'Vlad K.', role: 'CEO & Founder', emoji: '👨‍💼' },
  { name: 'Ana M.', role: 'Lead Designer', emoji: '🎨' },
  { name: 'Dmitri P.', role: 'Tech Lead', emoji: '💻' },
  { name: 'Elena B.', role: 'Marketing Manager', emoji: '📊' },
]

const VALUES = [
  { icon: '🎯', title: { ro: 'Rezultate Reale', ru: 'Реальные результаты', en: 'Real Results' }, desc: { ro: 'Nu vindem vise — livrăm rezultate măsurabile.', ru: 'Мы продаём не мечты, а измеримые результаты.', en: 'We don\'t sell dreams — we deliver measurable results.' } },
  { icon: '🤝', title: { ro: 'Parteneriat pe Termen Lung', ru: 'Долгосрочное партнёрство', en: 'Long-term Partnership' }, desc: { ro: 'Clienții noștri nu sunt tranzacții — sunt parteneri de creștere.', ru: 'Наши клиенты — не транзакции, а партнёры по росту.', en: 'Our clients aren\'t transactions — they\'re growth partners.' } },
  { icon: '🔬', title: { ro: 'Inovație Constantă', ru: 'Постоянные инновации', en: 'Constant Innovation' }, desc: { ro: 'Adoptăm technologiile noi înainte ca ele să devină mainstream.', ru: 'Внедряем новые технологии до того, как они становятся мейнстримом.', en: 'We adopt new technologies before they become mainstream.' } },
  { icon: '🇲🇩', title: { ro: 'Mândria Locală', ru: 'Местная гордость', en: 'Local Pride' }, desc: { ro: 'Construim cu mândrie din Moldova, pentru Moldova și lumea întreagă.', ru: 'С гордостью строим из Молдовы — для Молдовы и всего мира.', en: 'We build proudly from Moldova, for Moldova and the world.' } },
]

export default async function DesprePage({ params }: PageProps) {
  const { lang } = await params
  if (!isValidLang(lang)) notFound()
  const t = getMessages(lang as Lang)
  const l = lang as Lang

  return (
    <main className="bg-black">
      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e8ff00]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-[#e8ff00]/10 border border-[#e8ff00]/20">
            <span className="text-[#e8ff00] text-xs font-semibold tracking-widest uppercase">{t.about.badge}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.02] tracking-tight mb-8">
            {t.about.title}
          </h1>
          <p className="text-xl text-white/50 max-w-2xl leading-relaxed">{t.about.subtitle}</p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-black text-white mb-4">{t.about.mission}</h2>
              <p className="text-white/50 text-lg leading-relaxed">{t.about.missionText}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: '5+', l: { ro: 'Ani pe piață', ru: 'Лет на рынке', en: 'Years in market' } },
                { n: '150+', l: { ro: 'Proiecte livrate', ru: 'Проектов сдано', en: 'Projects delivered' } },
                { n: '98%', l: { ro: 'Clienți mulțumiți', ru: 'Довольных клиентов', en: 'Happy clients' } },
                { n: '3', l: { ro: 'Limbi de lucru', ru: 'Рабочих языка', en: 'Working languages' } },
              ].map((stat) => (
                <div key={stat.n} className="p-6 rounded-2xl bg-zinc-900 border border-white/10 text-center">
                  <div className="text-3xl font-black text-[#e8ff00] mb-1">{stat.n}</div>
                  <div className="text-white/40 text-xs">{stat.l[l]}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-4xl font-black text-white mb-12 text-center">
            {l === 'ro' ? 'Valorile noastre' : l === 'ru' ? 'Наши ценности' : 'Our values'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((v) => (
              <div key={v.icon} className="flex gap-4 p-6 rounded-2xl bg-zinc-900 border border-white/10">
                <span className="text-4xl flex-shrink-0">{v.icon}</span>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">{v.title[l]}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{v.desc[l]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Moldova */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-white mb-4">
              {l === 'ro' ? 'De ce Moldova, de ce acum?' : l === 'ru' ? 'Почему Молдова, почему сейчас?' : 'Why Moldova, why now?'}
            </h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">
              {l === 'ro'
                ? 'Moldova digitalizează rapid. Companiile care acționează acum câștigă avantajul competitiv de mâine.'
                : l === 'ru'
                ? 'Молдова быстро цифровизируется. Компании, действующие сейчас, получат конкурентное преимущество завтра.'
                : 'Moldova is rapidly digitalising. Companies that act now gain tomorrow\'s competitive advantage.'}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '📈',
                title: { ro: '74% creștere online', ru: '74% рост онлайн', en: '74% online growth' },
                desc: { ro: 'Comerțul electronic moldovenesc crește cu 74% anual. Piața e în expansiune rapidă.', ru: 'Молдавская электронная коммерция растёт на 74% в год. Рынок быстро расширяется.', en: 'Moldovan e-commerce grows 74% annually. The market is rapidly expanding.' },
              },
              {
                icon: '🏆',
                title: { ro: 'Costuri competitive', ru: 'Конкурентные цены', en: 'Competitive costs' },
                desc: { ro: 'Calitate europeană la prețuri de piață locală. Cel mai bun raport calitate-preț din regiune.', ru: 'Европейское качество по местным ценам. Лучшее соотношение цена-качество в регионе.', en: 'European quality at local market prices. The best value in the region.' },
              },
              {
                icon: '🌍',
                title: { ro: 'Acces la piața EU', ru: 'Доступ к рынку ЕС', en: 'EU market access' },
                desc: { ro: 'Moldova — poartă spre Europa. Poziționăm clienții noștri pentru succes pe piețele occidentale.', ru: 'Молдова — ворота в Европу. Мы позиционируем клиентов для успеха на западных рынках.', en: 'Moldova — gateway to Europe. We position our clients for success in western markets.' },
              },
            ].map((item) => (
              <div key={item.icon} className="p-8 rounded-2xl bg-zinc-900 border border-white/10 hover:border-[#e8ff00]/20 transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-white font-bold text-xl mb-2">{item.title[l]}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc[l]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-black text-center border-t border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            {l === 'ro' ? 'Hai să construim împreună' : l === 'ru' ? 'Давайте строить вместе' : 'Let\'s build together'}
          </h2>
          <Link
            href={`/${lang}/contact`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#e8ff00] text-black font-bold text-lg rounded-xl hover:bg-[#c8db00] transition-colors"
          >
            {t.nav.cta} →
          </Link>
        </div>
      </section>
    </main>
  )
}
