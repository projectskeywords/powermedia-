import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getMessages, isValidLang, type Lang } from '@/lib/i18n'

interface PageProps { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLang(lang)) return {}
  const t = getMessages(lang as Lang)
  const titles: Record<Lang, string> = {
    ro: 'Despre Powermedia — Agenție Digitală #1 în Moldova | Chișinău',
    ru: 'О Powermedia — Цифровое агентство №1 в Молдове | Кишинёв',
    en: 'About Powermedia — Moldova\'s #1 Digital Agency | Chișinău',
  }
  const descs: Record<Lang, string> = {
    ro: 'Powermedia — agenție digitală din Chișinău, Moldova. 5+ ani experiență, 150+ proiecte livrate, 98% clienți mulțumiți. Google Partner certificat.',
    ru: 'Powermedia — цифровое агентство в Кишинёве, Молдова. 5+ лет опыта, 150+ реализованных проектов, 98% довольных клиентов. Сертифицированный Google Partner.',
    en: 'Powermedia — digital agency in Chișinău, Moldova. 5+ years experience, 150+ projects delivered, 98% happy clients. Certified Google Partner.',
  }
  return {
    title: titles[lang as Lang],
    description: descs[lang as Lang],
    alternates: {
      canonical: `https://powermedia.md/${lang}/despre`,
      languages: {
        ro: 'https://powermedia.md/ro/despre',
        ru: 'https://powermedia.md/ru/despre',
        en: 'https://powermedia.md/en/despre',
      },
    },
  }
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

      {/* Certifications */}
      <section className="py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <p className="text-white/30 text-xs font-semibold tracking-widest uppercase text-center mb-10">
            {l === 'ro' ? 'Certificări & Parteneriate' : l === 'ru' ? 'Сертификаты & партнёрства' : 'Certifications & Partnerships'}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                icon: '🏅',
                name: 'Google Partner',
                desc: { ro: 'Certificat Google', ru: 'Сертификат Google', en: 'Google Certified' },
              },
              {
                icon: '📘',
                name: 'Meta Business Partner',
                desc: { ro: 'Publicitate Meta', ru: 'Реклама Meta', en: 'Meta Advertising' },
              },
              {
                icon: '🔒',
                name: 'SSL & Security',
                desc: { ro: 'Securitate premium', ru: 'Премиум безопасность', en: 'Premium security' },
              },
              {
                icon: '⭐',
                name: '5★ Google Rating',
                desc: { ro: 'Recenzii clienți', ru: 'Отзывы клиентов', en: 'Client reviews' },
              },
            ].map((cert) => (
              <div
                key={cert.name}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-900 border border-white/10 hover:border-[#e8ff00]/20 transition-colors"
              >
                <span className="text-4xl mb-3">{cert.icon}</span>
                <p className="text-white font-bold text-sm mb-1">{cert.name}</p>
                <p className="text-white/40 text-xs">{cert.desc[l]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-zinc-950 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-black text-white mb-2 text-center">
            {l === 'ro' ? 'Echipa noastră' : l === 'ru' ? 'Наша команда' : 'Our team'}
          </h2>
          <p className="text-white/40 text-center mb-10 text-sm">
            {l === 'ro' ? 'Specialiști certificați cu experiență reală pe piața din Moldova' : l === 'ru' ? 'Сертифицированные специалисты с реальным опытом на рынке Молдовы' : 'Certified specialists with real experience in the Moldovan market'}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Vlad K.', role: { ro: 'CEO & Fondator', ru: 'CEO & Основатель', en: 'CEO & Founder' }, exp: '8+ ani', emoji: '👨‍💼' },
              { name: 'Ana M.', role: { ro: 'Lead Designer', ru: 'Lead Designer', en: 'Lead Designer' }, exp: '6+ ani', emoji: '🎨' },
              { name: 'Dmitri P.', role: { ro: 'Tech Lead', ru: 'Tech Lead', en: 'Tech Lead' }, exp: '7+ ani', emoji: '💻' },
              { name: 'Elena B.', role: { ro: 'Marketing Manager', ru: 'Marketing Manager', en: 'Marketing Manager' }, exp: '5+ ani', emoji: '📊' },
            ].map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-zinc-900 border border-white/10"
              >
                <div className="w-16 h-16 rounded-2xl bg-zinc-800 flex items-center justify-center text-3xl mb-3 border border-white/10">
                  {member.emoji}
                </div>
                <p className="text-white font-bold text-sm">{member.name}</p>
                <p className="text-white/50 text-xs mt-0.5">{member.role[l]}</p>
                <span className="mt-2 px-2 py-0.5 rounded-full bg-[#e8ff00]/10 text-[#e8ff00] text-[10px] font-semibold border border-[#e8ff00]/20">
                  {member.exp}
                </span>
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
