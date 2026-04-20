'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Lang } from '@/lib/i18n'

interface Service {
  icon: string
  name: string
  desc: string
  href: string
  color: string
}

interface ServicesGridProps {
  lang: Lang
  t: {
    title: string
    subtitle: string
    services: {
      website: { name: string; desc: string }
      shop: { name: string; desc: string }
      crm: { name: string; desc: string }
      ads: { name: string; desc: string }
      ai: { name: string; desc: string }
    }
  }
}

export default function ServicesGrid({ lang, t }: ServicesGridProps) {
  const services: Service[] = [
    {
      icon: '🌐',
      name: t.services.website.name,
      desc: t.services.website.desc,
      href: `/${lang}/servicii/creare-website`,
      color: 'from-blue-500/10 to-blue-500/5',
    },
    {
      icon: '🛒',
      name: t.services.shop.name,
      desc: t.services.shop.desc,
      href: `/${lang}/servicii/magazin-online`,
      color: 'from-green-500/10 to-green-500/5',
    },
    {
      icon: '⚙️',
      name: t.services.crm.name,
      desc: t.services.crm.desc,
      href: `/${lang}/servicii/crm-erp`,
      color: 'from-orange-500/10 to-orange-500/5',
    },
    {
      icon: '📣',
      name: t.services.ads.name,
      desc: t.services.ads.desc,
      href: `/${lang}/servicii/publicitate-google`,
      color: 'from-red-500/10 to-red-500/5',
    },
    {
      icon: '🤖',
      name: t.services.ai.name,
      desc: t.services.ai.desc,
      href: `/${lang}/servicii/automatizari-ai`,
      color: 'from-purple-500/10 to-purple-500/5',
    },
  ]

  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            {t.title}
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">{t.subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={service.href}
                className={`group block h-full p-6 rounded-2xl bg-gradient-to-br ${service.color} border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]`}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-white font-bold text-xl mb-2 group-hover:text-[#e8ff00] transition-colors">
                  {service.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  {service.desc}
                </p>
                <div className="flex items-center gap-1 text-white/30 group-hover:text-[#e8ff00] text-sm font-medium transition-colors">
                  <span>Află mai mult</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href={`/${lang}/contact`}
              className="group block h-full p-6 rounded-2xl bg-[#e8ff00] hover:bg-[#c8db00] transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-black font-black text-xl mb-2">
                Proiect personalizat?
              </h3>
              <p className="text-black/60 text-sm leading-relaxed mb-4">
                Hai să discutăm despre soluția perfectă pentru afacerea ta.
              </p>
              <div className="flex items-center gap-1 text-black font-bold text-sm">
                <span>Solicită ofertă</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12"/>
                  <polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
