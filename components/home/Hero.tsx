'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Lang } from '@/lib/i18n'

interface HeroProps {
  lang: Lang
  t: {
    badge: string
    title: string
    titleAccent: string
    subtitle: string
    cta: string
    ctaSecondary: string
  }
}

const WORDS = ['digital', 'performantă', 'scalabilă', 'profitabilă']

export default function Hero({ lang, t }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e8ff00]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-5xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8ff00] animate-pulse" />
            <span className="text-white/60 text-xs font-medium tracking-widest uppercase">
              {t.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.02] tracking-tight mb-6"
          >
            {t.title}
            <br />
            <span className="text-[#e8ff00]">{t.titleAccent}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mb-12 leading-relaxed"
          >
            {t.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e8ff00] text-black font-bold text-lg rounded-xl hover:bg-[#c8db00] transition-colors shadow-lg shadow-[#e8ff00]/20"
            >
              {t.cta}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
            <Link
              href={`/${lang}/servicii`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-white/20 text-white font-medium text-lg rounded-xl hover:border-white/40 hover:bg-white/5 transition-all"
            >
              {t.ctaSecondary}
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/20" />
        </motion.div>
      </div>
    </section>
  )
}
