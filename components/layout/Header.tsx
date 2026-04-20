'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import LanguageSelector from './LanguageSelector'
import MegaMenu from './MegaMenu'
import type { Lang } from '@/lib/i18n'

interface HeaderProps {
  lang: Lang
  t: {
    nav: {
      home: string
      about: string
      services: string
      blog: string
      contact: string
      cta: string
    }
    services: {
      website: { name: string; desc: string }
      shop: { name: string; desc: string }
      crm: { name: string; desc: string }
      ads: { name: string; desc: string }
      ai: { name: string; desc: string }
    }
  }
}

export default function Header({ lang, t }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const megaT = {
    services: {
      website_name: t.services.website.name,
      website_desc: t.services.website.desc,
      shop_name: t.services.shop.name,
      shop_desc: t.services.shop.desc,
      crm_name: t.services.crm.name,
      crm_desc: t.services.crm.desc,
      ads_name: t.services.ads.name,
      ads_desc: t.services.ads.desc,
      ai_name: t.services.ai.name,
      ai_desc: t.services.ai.desc,
    },
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-zinc-950/95 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
          : 'bg-zinc-950/80 backdrop-blur-md border-b border-white/5'
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-2 group">
          <span className="text-xl font-black text-white tracking-tight">
            Power<span className="text-[#e8ff00]">media</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href={`/${lang}`}
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            {t.nav.home}
          </Link>
          <Link
            href={`/${lang}/despre`}
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            {t.nav.about}
          </Link>
          <MegaMenu lang={lang} label={t.nav.services} t={megaT} />
          <Link
            href={`/${lang}/articole`}
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            {t.nav.blog}
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="text-sm font-medium text-white/70 hover:text-white transition-colors"
          >
            {t.nav.contact}
          </Link>
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          <LanguageSelector currentLang={lang} />
          <Link
            href={`/${lang}/contact`}
            className="px-4 py-2 bg-[#e8ff00] text-black text-sm font-bold rounded-lg hover:bg-[#c8db00] transition-colors"
          >
            {t.nav.cta}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-5 h-0.5 bg-white transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950 border-t border-white/10 overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {[
                { href: `/${lang}`, label: t.nav.home },
                { href: `/${lang}/despre`, label: t.nav.about },
                { href: `/${lang}/servicii/creare-website`, label: t.services.website.name },
                { href: `/${lang}/servicii/magazin-online`, label: t.services.shop.name },
                { href: `/${lang}/servicii/crm-erp`, label: t.services.crm.name },
                { href: `/${lang}/servicii/publicitate-google`, label: t.services.ads.name },
                { href: `/${lang}/servicii/automatizari-ai`, label: t.services.ai.name },
                { href: `/${lang}/articole`, label: t.nav.blog },
                { href: `/${lang}/contact`, label: t.nav.contact },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-sm font-medium text-white/70 hover:text-white border-b border-white/5 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4">
                <LanguageSelector currentLang={lang} />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
