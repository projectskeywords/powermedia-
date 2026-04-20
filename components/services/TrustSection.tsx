'use client'

import { motion } from 'framer-motion'

interface TrustStat {
  value: string
  label: string
}

interface TrustSectionProps {
  title: string
  subtitle: string
  stats: TrustStat[]
}

export default function TrustSection({ title, subtitle, stats }: TrustSectionProps) {
  return (
    <section className="py-20 bg-zinc-950 border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-3">
            {title}
          </p>
          <p className="text-white/50 text-sm">{subtitle}</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-zinc-900/50 border border-white/5"
            >
              <div className="text-3xl font-black text-[#e8ff00] mb-1">{stat.value}</div>
              <div className="text-white/40 text-xs uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {['Google Partner', 'Meta Business Partner', 'ISO 9001', '5★ Rating'].map(
            (badge, i) => (
              <motion.div
                key={badge}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-white/40 text-sm font-medium"
              >
                {badge}
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  )
}
