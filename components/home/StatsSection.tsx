'use client'

import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

interface Stat {
  value: number
  suffix: string
  label: string
}

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          let start = 0
          const duration = 2000
          const step = target / (duration / 16)
          const timer = setInterval(() => {
            start += step
            if (start >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(start))
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target, started])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

interface StatsSectionProps {
  t: {
    projects: string
    clients: string
    years: string
    support: string
  }
}

export default function StatsSection({ t }: StatsSectionProps) {
  const stats: Stat[] = [
    { value: 150, suffix: '+', label: t.projects },
    { value: 98, suffix: '+', label: t.clients },
    { value: 5, suffix: '+', label: t.years },
    { value: 24, suffix: '/7', label: t.support },
  ]

  return (
    <section className="py-20 bg-black border-y border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-6xl font-black text-[#e8ff00] mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/40 text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
