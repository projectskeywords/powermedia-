import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getMessages, isValidLang, type Lang } from '@/lib/i18n'
import Hero from '@/components/home/Hero'
import ServicesGrid from '@/components/home/ServicesGrid'
import StatsSection from '@/components/home/StatsSection'
import TestimonialsSlider from '@/components/home/TestimonialsSlider'
import ContactSection from '@/components/home/ContactSection'

interface PageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLang(lang)) return {}
  const t = getMessages(lang as Lang)

  const titles: Record<Lang, string> = {
    ro: 'Powermedia — Agenție Digitală #1 în Moldova',
    ru: 'Powermedia — Цифровое агентство №1 в Молдове',
    en: 'Powermedia — Moldova\'s #1 Digital Agency',
  }
  const descs: Record<Lang, string> = {
    ro: 'Website-uri, magazine online, CRM/ERP, Google Ads și automatizări AI. Soluții digitale premium pentru Moldova.',
    ru: 'Сайты, интернет-магазины, CRM/ERP, Google Ads и AI-автоматизация. Премиальные цифровые решения для Молдовы.',
    en: 'Websites, online stores, CRM/ERP, Google Ads and AI automation. Premium digital solutions for the European market.',
  }

  return {
    title: titles[lang as Lang],
    description: descs[lang as Lang],
    alternates: {
      canonical: `/${lang}`,
      languages: { ro: '/ro', ru: '/ru', en: '/en' },
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params
  if (!isValidLang(lang)) notFound()

  const t = getMessages(lang as Lang)

  return (
    <>
      <Hero lang={lang as Lang} t={t.hero} />
      <StatsSection t={t.stats} />
      <ServicesGrid lang={lang as Lang} t={{ title: t.services.title, subtitle: t.services.subtitle, services: { website: { name: t.services.website.name, desc: t.services.website.desc }, shop: { name: t.services.shop.name, desc: t.services.shop.desc }, crm: { name: t.services.crm.name, desc: t.services.crm.desc }, ads: { name: t.services.ads.name, desc: t.services.ads.desc }, ai: { name: t.services.ai.name, desc: t.services.ai.desc } } }} />
      <TestimonialsSlider />
      <ContactSection lang={lang as Lang} />
    </>
  )
}
