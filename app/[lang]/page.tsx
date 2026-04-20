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
    ro: 'Powermedia — Agenție Digitală #1 în Moldova | Chișinău',
    ru: 'Powermedia — Цифровое агентство №1 в Молдове | Кишинёв',
    en: 'Powermedia — Moldova\'s #1 Digital Agency | Chișinău',
  }
  const descs: Record<Lang, string> = {
    ro: 'Agenție digitală Chișinău, Moldova — creare website, magazine online, Google Ads, CRM/ERP și automatizări AI. 150+ proiecte livrate, 5★ rating Google.',
    ru: 'Цифровое агентство Кишинёв, Молдова — создание сайтов, интернет-магазинов, Google Ads, CRM/ERP и AI-автоматизация. 150+ проектов, рейтинг 5★.',
    en: 'Digital agency Chișinău, Moldova — website development, online stores, Google Ads, CRM/ERP and AI automation. 150+ projects, 5★ Google rating.',
  }
  const keywords: Record<Lang, string> = {
    ro: 'agenție digitală Moldova, creare website Chișinău, Google Ads Moldova, magazin online Moldova, SEO Moldova, automatizări AI',
    ru: 'цифровое агентство Молдова, создание сайта Кишинёв, Google Ads Молдова, интернет-магазин Молдова, SEO Молдова',
    en: 'digital agency Moldova, website development Chisinau, Google Ads Moldova, online store Moldova, SEO Moldova',
  }

  return {
    title: titles[lang as Lang],
    description: descs[lang as Lang],
    keywords: keywords[lang as Lang],
    alternates: {
      canonical: `https://powermedia.md/${lang}`,
      languages: {
        ro: 'https://powermedia.md/ro',
        ru: 'https://powermedia.md/ru',
        en: 'https://powermedia.md/en',
      },
    },
    openGraph: {
      title: titles[lang as Lang],
      description: descs[lang as Lang],
      url: `https://powermedia.md/${lang}`,
      type: 'website',
      locale: lang === 'ro' ? 'ro_RO' : lang === 'ru' ? 'ru_RU' : 'en_GB',
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
