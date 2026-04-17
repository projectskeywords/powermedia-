'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import TrustSection from './TrustSection'
import ProcessSection from './ProcessSection'
import FAQSection from './FAQSection'
import type { Lang } from '@/lib/i18n'

interface ProcessStep {
  step: number
  title: string
  description: string
  icon: string
}

interface TrustStat {
  value: string
  label: string
}

interface FAQItem {
  question: string
  answer: string
}

interface PricingPlan {
  name: string
  price: string
  period?: string
  description: string
  features: string[]
  highlighted?: boolean
  badge?: string
}

export interface ServicePageData {
  lang: Lang
  hero: {
    badge?: string
    title: string
    subtitle: string
    cta: string
  }
  features: Array<{ icon: string; title: string; description: string }>
  benefits?: {
    title: string
    subtitle: string
    items: Array<{ title: string; description: string }>
  }
  pricing?: {
    title: string
    subtitle: string
    plans: PricingPlan[]
  }
  technologies?: {
    title: string
    items: Array<{ name: string; category: string }>
  }
  process: {
    title: string
    subtitle: string
    steps: ProcessStep[]
  }
  trust: {
    title: string
    subtitle: string
    stats: TrustStat[]
  }
  faq: {
    title: string
    subtitle: string
    items: FAQItem[]
  }
  cta: {
    title: string
    description: string
    button: string
  }
}

export default function ServicePageTemplate({ data }: { data: ServicePageData }) {
  return (
    <main className="bg-black">
      {/* HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-950" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#e8ff00]/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 py-32">
          {data.hero.badge && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-[#e8ff00]/10 border border-[#e8ff00]/20"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8ff00]" />
              <span className="text-[#e8ff00]/80 text-xs font-semibold tracking-widest uppercase">
                {data.hero.badge}
              </span>
            </motion.div>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-white leading-[1.02] tracking-tight mb-6 max-w-4xl"
            dangerouslySetInnerHTML={{ __html: data.hero.title }}
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/50 max-w-2xl mb-12 leading-relaxed"
          >
            {data.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href={`/${data.lang}/contact`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#e8ff00] text-black font-bold text-lg rounded-xl hover:bg-[#c8db00] transition-colors shadow-lg shadow-[#e8ff00]/20"
            >
              {data.hero.cta}
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-6 rounded-2xl bg-zinc-900 border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      {data.benefits && (
        <section className="py-24 bg-black">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">{data.benefits.title}</h2>
              <p className="text-white/40 text-lg max-w-2xl mx-auto">{data.benefits.subtitle}</p>
            </div>
            <div className="space-y-0">
              {data.benefits.items.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`flex gap-8 items-start py-10 border-b border-white/5 ${i % 2 === 0 ? '' : 'flex-row-reverse text-right'}`}
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#e8ff00]/10 border border-[#e8ff00]/20 flex items-center justify-center">
                    <span className="text-[#e8ff00] font-black text-xl">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                    <p className="text-white/50 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PRICING */}
      {data.pricing && (
        <section className="py-24 bg-zinc-950">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4">{data.pricing.title}</h2>
              <p className="text-white/40 text-lg max-w-2xl mx-auto">{data.pricing.subtitle}</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {data.pricing.plans.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative rounded-3xl p-8 flex flex-col ${
                    plan.highlighted
                      ? 'bg-[#e8ff00] text-black'
                      : 'bg-zinc-900 border border-white/10 text-white'
                  }`}
                >
                  {plan.badge && (
                    <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                      plan.highlighted ? 'bg-black text-[#e8ff00]' : 'bg-[#e8ff00] text-black'
                    }`}>
                      {plan.badge}
                    </div>
                  )}
                  <div className="mb-6">
                    <p className={`text-sm font-semibold mb-2 ${plan.highlighted ? 'text-black/60' : 'text-white/40'}`}>{plan.name}</p>
                    <div className="flex items-end gap-1 mb-2">
                      <span className="text-4xl font-black">{plan.price}</span>
                      {plan.period && <span className={`text-sm mb-1 ${plan.highlighted ? 'text-black/50' : 'text-white/30'}`}>{plan.period}</span>}
                    </div>
                    <p className={`text-sm leading-relaxed ${plan.highlighted ? 'text-black/60' : 'text-white/40'}`}>{plan.description}</p>
                  </div>
                  <ul className="space-y-3 flex-1 mb-8">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className={`flex items-start gap-2.5 text-sm ${plan.highlighted ? 'text-black/80' : 'text-white/60'}`}>
                        <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlighted ? 'text-black' : 'text-[#e8ff00]'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/${data.lang}/contact`}
                    className={`w-full py-3.5 rounded-xl font-bold text-center text-sm transition-all ${
                      plan.highlighted
                        ? 'bg-black text-[#e8ff00] hover:bg-zinc-900'
                        : 'bg-[#e8ff00] text-black hover:bg-[#c8db00]'
                    }`}
                  >
                    {data.lang === 'ro' ? 'Solicită ofertă' : data.lang === 'ru' ? 'Запросить' : 'Get quote'}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TECHNOLOGIES */}
      {data.technologies && (
        <section className="py-16 bg-black border-y border-white/5">
          <div className="container mx-auto px-6">
            <p className="text-center text-white/30 text-sm font-semibold tracking-widest uppercase mb-8">
              {data.technologies.title}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {data.technologies.items.map((tech) => (
                <div
                  key={tech.name}
                  className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/10 text-sm"
                >
                  <span className="text-white/70 font-medium">{tech.name}</span>
                  <span className="text-white/20 ml-2 text-xs">{tech.category}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TRUST */}
      <TrustSection
        title={data.trust.title}
        subtitle={data.trust.subtitle}
        stats={data.trust.stats}
      />

      {/* PROCESS */}
      <ProcessSection
        title={data.process.title}
        subtitle={data.process.subtitle}
        steps={data.process.steps}
      />

      {/* FAQ */}
      <FAQSection
        title={data.faq.title}
        subtitle={data.faq.subtitle}
        items={data.faq.items}
      />

      {/* FINAL CTA */}
      <section className="py-32 bg-black text-center border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2
              className="text-4xl md:text-6xl font-black text-white mb-6 max-w-3xl mx-auto leading-tight"
              dangerouslySetInnerHTML={{ __html: data.cta.title }}
            />
            <p className="text-white/40 text-lg max-w-xl mx-auto mb-10">
              {data.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={`/${data.lang}/contact`}
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-[#e8ff00] text-black font-black text-xl rounded-2xl hover:bg-[#c8db00] transition-colors shadow-2xl shadow-[#e8ff00]/20"
              >
                {data.cta.button}
              </Link>
              <a
                href="tel:+37368996315"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 border border-white/20 text-white font-bold text-xl rounded-2xl hover:border-white/40 hover:bg-white/5 transition-all"
              >
                📞 +373 68 996 315
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
