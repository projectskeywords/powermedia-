'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Testimonial {
  name: string
  company: string
  role: string
  text: string
  rating: number
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Alexandru Popa',
    company: 'TechStart Moldova',
    role: 'CEO',
    text: 'Powermedia ne-a transformat complet prezența online. Site-ul livrat a depășit toate așteptările, iar vânzările au crescut cu 60% în primele 3 luni.',
    rating: 5,
  },
  {
    name: 'Maria Ionescu',
    company: 'FashionMD',
    role: 'Fondatoare',
    text: 'Magazinul online creat de Powermedia funcționează impecabil. Echipa a înțeles exact viziunea noastră și a livrat un produs excepțional.',
    rating: 5,
  },
  {
    name: 'Dmitri Кovalev',
    company: 'LogiTrans',
    role: 'Director Comercial',
    text: 'Sistemul CRM implementat de Powermedia ne-a economisit 20 de ore pe săptămână. ROI-ul s-a atins în primele 2 luni.',
    rating: 5,
  },
  {
    name: 'Elena Botnaru',
    company: 'Restaurant Dacia',
    role: 'Manager',
    text: 'Campaniile Google Ads gestionate de Powermedia au adus un flux constant de clienți noi. Recomand cu cea mai mare căldură!',
    rating: 5,
  },
]

export default function TestimonialsSlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1)
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  function goTo(index: number) {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
  }

  const t = TESTIMONIALS[current]

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
            Ce spun clienții
          </h2>
          <p className="text-white/50 text-lg">
            Rezultate reale, clienți mulțumiți
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.4 }}
              className="bg-zinc-900 rounded-3xl p-8 md:p-12 border border-white/10"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#e8ff00" className="text-[#e8ff00]">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-white text-xl md:text-2xl font-medium leading-relaxed mb-8">
                &ldquo;{t.text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#e8ff00]/20 border border-[#e8ff00]/30 flex items-center justify-center">
                  <span className="text-[#e8ff00] font-black text-lg">
                    {t.name[0]}
                  </span>
                </div>
                <div>
                  <div className="text-white font-semibold">{t.name}</div>
                  <div className="text-white/40 text-sm">
                    {t.role}, {t.company}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all ${
                  i === current
                    ? 'w-8 h-2 bg-[#e8ff00]'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
