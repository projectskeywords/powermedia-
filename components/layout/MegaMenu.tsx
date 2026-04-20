'use client'

import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import type { Lang } from '@/lib/i18n'

interface Service {
  name: string
  desc: string
  href: string
  icon: string
}

function getServices(lang: Lang, t: Record<string, Record<string, string>>): Service[] {
  return [
    {
      name: t.services.website_name,
      desc: t.services.website_desc,
      href: `/${lang}/servicii/creare-website`,
      icon: '🌐',
    },
    {
      name: t.services.shop_name,
      desc: t.services.shop_desc,
      href: `/${lang}/servicii/magazin-online`,
      icon: '🛒',
    },
    {
      name: t.services.crm_name,
      desc: t.services.crm_desc,
      href: `/${lang}/servicii/crm-erp`,
      icon: '⚙️',
    },
    {
      name: t.services.ads_name,
      desc: t.services.ads_desc,
      href: `/${lang}/servicii/publicitate-google`,
      icon: '📣',
    },
    {
      name: t.services.ai_name,
      desc: t.services.ai_desc,
      href: `/${lang}/servicii/automatizari-ai`,
      icon: '🤖',
    },
  ]
}

interface MegaMenuProps {
  lang: Lang
  label: string
  t: {
    services: {
      website_name: string
      website_desc: string
      shop_name: string
      shop_desc: string
      crm_name: string
      crm_desc: string
      ads_name: string
      ads_desc: string
      ai_name: string
      ai_desc: string
    }
  }
}

export default function MegaMenu({ lang, label, t }: MegaMenuProps) {
  const [open, setOpen] = useState(false)
  const services = getServices(lang, t as unknown as Record<string, Record<string, string>>)

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 text-sm font-medium text-white/70 hover:text-white transition-colors py-2">
        {label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[520px] bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-4 grid grid-cols-2 gap-2 z-50"
          >
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
              >
                <span className="text-2xl leading-none mt-0.5">{service.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-[#e8ff00] transition-colors">
                    {service.name}
                  </div>
                  <div className="text-xs text-white/50 mt-0.5 leading-snug">
                    {service.desc}
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
