'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  title: string
  subtitle: string
  items: FAQItem[]
}

export default function FAQSection({ title, subtitle, items }: FAQSectionProps) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{title}</h2>
          <p className="text-white/50 text-lg">{subtitle}</p>
        </motion.div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left bg-zinc-900 hover:bg-zinc-800/50 transition-colors"
              >
                <span className="text-white font-semibold pr-4">{item.question}</span>
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300 ${
                    open === i ? 'rotate-45' : ''
                  }`}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                </span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-white/50 text-sm leading-relaxed bg-zinc-900">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
