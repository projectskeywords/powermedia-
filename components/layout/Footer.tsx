import Link from 'next/link'
import type { Lang } from '@/lib/i18n'

interface FooterProps {
  lang: Lang
  t: {
    nav: { home: string; about: string; services: string; blog: string; contact: string }
    services: {
      website: { name: string }
      shop: { name: string }
      crm: { name: string }
      ads: { name: string }
      ai: { name: string }
    }
    footer: { tagline: string; rights: string; privacy: string; terms: string }
  }
}

export default function Footer({ lang, t }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href={`/${lang}`} className="inline-block mb-4">
              <span className="text-2xl font-black text-white tracking-tight">
                Power<span className="text-[#e8ff00]">media</span>
              </span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              {t.footer.tagline}
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="tel:+37368996315"
                className="text-white/60 hover:text-[#e8ff00] text-sm transition-colors"
              >
                +373 68 996 315
              </a>
              <a
                href="mailto:vlad@keywords.md"
                className="text-white/60 hover:text-[#e8ff00] text-sm transition-colors"
              >
                vlad@keywords.md
              </a>
              <span className="text-white/40 text-sm">Bd. Iurii Gagarin 10, CBC</span>
              <span className="text-white/40 text-sm">Chișinău, Moldova</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
              {t.nav.services}
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: `/${lang}/servicii/creare-website`, label: t.services.website.name },
                { href: `/${lang}/servicii/magazin-online`, label: t.services.shop.name },
                { href: `/${lang}/servicii/crm-erp`, label: t.services.crm.name },
                { href: `/${lang}/servicii/publicitate-google`, label: t.services.ads.name },
                { href: `/${lang}/servicii/automatizari-ai`, label: t.services.ai.name },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
              {lang === 'ro' ? 'Companie' : lang === 'ru' ? 'Компания' : 'Company'}
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: `/${lang}`, label: t.nav.home },
                { href: `/${lang}/despre`, label: t.nav.about },
                { href: `/${lang}/articole`, label: t.nav.blog },
                { href: `/${lang}/contact`, label: t.nav.contact },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA box */}
          <div className="bg-zinc-900 rounded-2xl p-6 border border-white/10">
            <p className="text-white font-semibold mb-2 text-sm">
              {lang === 'ro' ? 'Hai să colaborăm' : lang === 'ru' ? 'Давайте сотрудничать' : 'Let\'s work together'}
            </p>
            <p className="text-white/40 text-xs mb-4 leading-relaxed">
              {lang === 'ro'
                ? 'Consultație gratuită pentru afacerea ta digitală.'
                : lang === 'ru'
                ? 'Бесплатная консультация для вашего бизнеса.'
                : 'Free consultation for your digital business.'}
            </p>
            <Link
              href={`/${lang}/contact`}
              className="inline-block w-full text-center px-4 py-2.5 bg-[#e8ff00] text-black text-sm font-bold rounded-lg hover:bg-[#c8db00] transition-colors"
            >
              {lang === 'ro' ? 'Contactează-ne →' : lang === 'ru' ? 'Связаться →' : 'Contact us →'}
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {year} Powermedia. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href={`/${lang}/confidentialitate`}
              className="text-white/30 hover:text-white/60 text-xs transition-colors"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href={`/${lang}/termeni`}
              className="text-white/30 hover:text-white/60 text-xs transition-colors"
            >
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
