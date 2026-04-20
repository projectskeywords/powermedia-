'use client'

import { motion } from 'framer-motion'

interface Step {
  step: number
  title: string
  description: string
  icon: string
}

interface ProcessSectionProps {
  title: string
  subtitle: string
  steps: Step[]
}

export default function ProcessSection({ title, subtitle, steps }: ProcessSectionProps) {
  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">{title}</h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">{subtitle}</p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="p-6 rounded-2xl bg-zinc-900 border border-white/10 hover:border-white/20 transition-colors">
                  {/* Step number */}
                  <div className="w-10 h-10 rounded-full bg-[#e8ff00] flex items-center justify-center mb-4">
                    <span className="text-black font-black text-sm">{step.step}</span>
                  </div>

                  <div className="text-3xl mb-3">{step.icon}</div>

                  <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
