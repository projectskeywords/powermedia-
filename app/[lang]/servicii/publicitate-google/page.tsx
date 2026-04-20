import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isValidLang, type Lang } from '@/lib/i18n'
import ServicePageTemplate, { type ServicePageData } from '@/components/services/ServicePageTemplate'

interface PageProps { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLang(lang)) return {}
  const titles: Record<Lang, string> = {
    ro: 'Publicitate Google Ads Moldova | Powermedia',
    ru: 'Реклама Google Ads в Молдове | Powermedia',
    en: 'Google Ads Advertising Moldova | Powermedia',
  }
  const descs: Record<Lang, string> = {
    ro: 'Campanii Google Ads profitabile pentru afaceri din Moldova și Chișinău. ROI garantat, audit gratuit, raportare transparentă. Gestionăm bugete de la 500 Lei/lună.',
    ru: 'Прибыльные кампании Google Ads для бизнеса в Молдове и Кишинёве. Гарантированный ROI, бесплатный аудит, прозрачная отчётность.',
    en: 'Profitable Google Ads campaigns for businesses in Moldova. Guaranteed ROI, free audit, transparent reporting. We manage budgets from €30/month.',
  }
  return {
    title: titles[lang as Lang],
    description: descs[lang as Lang],
    alternates: {
      canonical: `https://powermedia.md/${lang}/servicii/publicitate-google`,
      languages: {
        ro: 'https://powermedia.md/ro/servicii/publicitate-google',
        ru: 'https://powermedia.md/ru/servicii/publicitate-google',
        en: 'https://powermedia.md/en/servicii/publicitate-google',
      },
    },
  }
}

const DATA: Record<Lang, ServicePageData> = {
  ro: {
    lang: 'ro',
    hero: {
      badge: 'Publicitate Google',
      title: 'Google Ads <span class="text-[#e8ff00]">Moldova</span> — Campanii cu ROI maxim',
      subtitle: 'Creăm și gestionăm campanii Google Ads profitabile pentru afaceri din Moldova. Plătești doar pentru clienți reali, nu pentru click-uri fără valoare.',
      cta: 'Audit gratuit al campaniilor tale',
    },
    features: [
      { icon: '🎯', title: 'Targetare Precisă', description: 'Ajungem exact la publicul tău: demografic, interese, comportament, locație Chișinău/Moldova.' },
      { icon: '💰', title: 'Buget Optimizat', description: 'Fiecare leu investit contează. Optimizăm constant pentru cel mai mic cost pe conversie.' },
      { icon: '📊', title: 'Raportare Transparentă', description: 'Rapoarte săptămânale detaliate. Știi exact unde se duc banii și ce rezultate aduc.' },
      { icon: '🛒', title: 'Google Shopping', description: 'Campanii Shopping pentru magazine online. Produsele tale apar cu imagini și prețuri în Google.' },
      { icon: '🔄', title: 'Remarketing', description: 'Reconectăm cu vizitatorii care nu au cumpărat. Conversie cu costuri de până la 5x mai mici.' },
      { icon: '📱', title: 'YouTube & Display', description: 'Campanii video pe YouTube și bannere pe rețeaua Google Display. Brand awareness maxim.' },
    ],
    process: {
      title: 'Cum gestionăm campaniile tale',
      subtitle: 'Un proces continuu de optimizare și creștere',
      steps: [
        { step: 1, icon: '🔍', title: 'Audit & Strategie', description: 'Analizăm piața, concurența și construim strategia de campanie optimă.' },
        { step: 2, icon: '✍️', title: 'Creare Campanii', description: 'Copywriting persuasiv, selectare cuvinte cheie, structurare grup reclame.' },
        { step: 3, icon: '🚀', title: 'Lansare & Monitorizare', description: 'Lansăm campaniile și monitorizăm performanța zilnic.' },
        { step: 4, icon: '📈', title: 'Optimizare Continuă', description: 'Testăm, ajustăm și îmbunătățim constant pentru ROI crescând.' },
      ],
    },
    trust: {
      title: 'Rezultate reale, cifre reale',
      subtitle: 'Pentru clienți din Moldova și Europa',
      stats: [
        { value: '3.5x', label: 'ROAS mediu' },
        { value: '40%', label: 'Reducere cost/click' },
        { value: '2M+', label: 'Lei bugete gestionate' },
        { value: '60+', label: 'Campanii active' },
      ],
    },
    faq: {
      title: 'Întrebări despre Google Ads',
      subtitle: '',
      items: [
        { question: 'Care este bugetul minim recomandat?', answer: 'Recomandăm minim 500 Lei/lună pentru campanii locale și 1500+ Lei/lună pentru campanii competitive. Începem cu bugete mici și scălăm pe baza rezultatelor.' },
        { question: 'Când văd primele rezultate?', answer: 'Primele click-uri și conversii apar în primele 24-48h de la lansare. Optimizarea completă durează 30-60 de zile.' },
        { question: 'Includ comisioanele taxa Google?', answer: 'Nu. Taxa Google (bugetul de publicitate) se plătește separat, direct Google. Comisionul nostru acoperă managementul campaniei.' },
        { question: 'Pot să văd unde se duc banii?', answer: 'Da! Acces complet la cont, rapoarte săptămânale detaliate, call tracking inclus.' },
      ],
    },
    cta: {
      title: 'Înmulțește <span class="text-[#e8ff00]">investiția publicitară</span>',
      description: 'Audit gratuit al campaniilor tale actuale. Identificăm oportunități de optimizare imediate.',
      button: 'Solicită audit gratuit',
    },
  },
  ru: {
    lang: 'ru',
    hero: {
      badge: 'Реклама Google',
      title: 'Google Ads в <span class="text-[#e8ff00]">Молдове</span> — Максимальный ROI',
      subtitle: 'Создаём и управляем прибыльными кампаниями Google Ads для бизнеса в Молдове. Платите только за реальных клиентов, а не за бесценные клики.',
      cta: 'Бесплатный аудит ваших кампаний',
    },
    features: [
      { icon: '🎯', title: 'Точный таргетинг', description: 'Достигаем именно вашей аудитории: демография, интересы, поведение, местоположение.' },
      { icon: '💰', title: 'Оптимизированный бюджет', description: 'Каждый вложенный лей имеет значение. Постоянно оптимизируем для минимальной стоимости конверсии.' },
      { icon: '📊', title: 'Прозрачная отчётность', description: 'Еженедельные подробные отчёты. Знаете точно, куда идут деньги и какие результаты приносят.' },
      { icon: '🛒', title: 'Google Shopping', description: 'Shopping-кампании для интернет-магазинов. Ваши продукты появляются с изображениями и ценами в Google.' },
      { icon: '🔄', title: 'Ремаркетинг', description: 'Возвращаем посетителей, которые не купили. Конверсия с затратами до 5x ниже.' },
      { icon: '📱', title: 'YouTube и Display', description: 'Видеокампании на YouTube и баннеры в сети Google Display. Максимальная узнаваемость бренда.' },
    ],
    process: {
      title: 'Как мы управляем вашими кампаниями',
      subtitle: 'Непрерывный процесс оптимизации и роста',
      steps: [
        { step: 1, icon: '🔍', title: 'Аудит и стратегия', description: 'Анализируем рынок, конкурентов и строим оптимальную стратегию кампании.' },
        { step: 2, icon: '✍️', title: 'Создание кампаний', description: 'Убедительный копирайтинг, подбор ключевых слов, структурирование групп объявлений.' },
        { step: 3, icon: '🚀', title: 'Запуск и мониторинг', description: 'Запускаем кампании и ежедневно отслеживаем производительность.' },
        { step: 4, icon: '📈', title: 'Постоянная оптимизация', description: 'Тестируем, корректируем и постоянно улучшаем для растущего ROI.' },
      ],
    },
    trust: {
      title: 'Реальные результаты, реальные цифры',
      subtitle: 'Для клиентов из Молдовы и Европы',
      stats: [
        { value: '3.5x', label: 'Средний ROAS' },
        { value: '40%', label: 'Снижение стоимости клика' },
        { value: '2M+', label: 'Лей под управлением' },
        { value: '60+', label: 'Активных кампаний' },
      ],
    },
    faq: {
      title: 'Вопросы о Google Ads',
      subtitle: '',
      items: [
        { question: 'Какой минимальный рекомендуемый бюджет?', answer: 'Рекомендуем минимум 500 леев/месяц для локальных кампаний и 1500+ леев/месяц для конкурентных ниш.' },
        { question: 'Когда я увижу первые результаты?', answer: 'Первые клики и конверсии появляются в первые 24-48 часов после запуска. Полная оптимизация занимает 30-60 дней.' },
        { question: 'Включает ли ваша комиссия бюджет Google?', answer: 'Нет. Бюджет Google (рекламный бюджет) оплачивается отдельно напрямую в Google. Наша комиссия покрывает управление кампанией.' },
        { question: 'Могу ли я видеть, куда уходят деньги?', answer: 'Да! Полный доступ к аккаунту, еженедельные подробные отчёты, включённое отслеживание звонков.' },
      ],
    },
    cta: {
      title: 'Умножьте <span class="text-[#e8ff00]">рекламные инвестиции</span>',
      description: 'Бесплатный аудит ваших текущих кампаний. Выявляем немедленные возможности для оптимизации.',
      button: 'Запросить бесплатный аудит',
    },
  },
  en: {
    lang: 'en',
    hero: {
      badge: 'Google Advertising',
      title: 'Google Ads campaigns with <span class="text-[#e8ff00]">maximum ROI</span>',
      subtitle: 'We create and manage profitable Google Ads campaigns for businesses in Moldova and Europe. Pay only for real customers, not worthless clicks.',
      cta: 'Free campaign audit',
    },
    features: [
      { icon: '🎯', title: 'Precise Targeting', description: 'We reach exactly your audience: demographics, interests, behaviour, and location.' },
      { icon: '💰', title: 'Optimized Budget', description: 'Every euro invested counts. We constantly optimize for the lowest cost per conversion.' },
      { icon: '📊', title: 'Transparent Reporting', description: 'Detailed weekly reports. You know exactly where the money goes and what results it brings.' },
      { icon: '🛒', title: 'Google Shopping', description: 'Shopping campaigns for online stores. Your products appear with images and prices in Google.' },
      { icon: '🔄', title: 'Remarketing', description: 'We reconnect with visitors who didn\'t buy. Conversion at up to 5x lower costs.' },
      { icon: '📱', title: 'YouTube & Display', description: 'Video campaigns on YouTube and banners on Google Display Network. Maximum brand awareness.' },
    ],
    process: {
      title: 'How we manage your campaigns',
      subtitle: 'A continuous process of optimization and growth',
      steps: [
        { step: 1, icon: '🔍', title: 'Audit & Strategy', description: 'We analyze the market, competition and build the optimal campaign strategy.' },
        { step: 2, icon: '✍️', title: 'Campaign Creation', description: 'Persuasive copywriting, keyword selection, ad group structuring.' },
        { step: 3, icon: '🚀', title: 'Launch & Monitoring', description: 'We launch campaigns and monitor performance daily.' },
        { step: 4, icon: '📈', title: 'Continuous Optimization', description: 'We test, adjust and constantly improve for growing ROI.' },
      ],
    },
    trust: {
      title: 'Real results, real numbers',
      subtitle: 'For clients in Moldova and Europe',
      stats: [
        { value: '3.5x', label: 'Average ROAS' },
        { value: '40%', label: 'Cost/click reduction' },
        { value: '2M+', label: 'MDL managed' },
        { value: '60+', label: 'Active campaigns' },
      ],
    },
    faq: {
      title: 'Google Ads Questions',
      subtitle: '',
      items: [
        { question: 'What is the minimum recommended budget?', answer: 'We recommend at least 500 MDL/month for local campaigns and 1500+ MDL/month for competitive campaigns.' },
        { question: 'When will I see results?', answer: 'First clicks and conversions appear within 24-48 hours of launch. Full optimization takes 30-60 days.' },
        { question: 'Does your fee include the Google budget?', answer: 'No. Google\'s budget is paid separately, directly to Google. Our fee covers campaign management.' },
        { question: 'Can I see where the money goes?', answer: 'Yes! Full account access, detailed weekly reports, call tracking included.' },
      ],
    },
    cta: {
      title: 'Multiply your <span class="text-[#e8ff00]">advertising investment</span>',
      description: 'Free audit of your current campaigns. We identify immediate optimization opportunities.',
      button: 'Request free audit',
    },
  },
}

export default async function PublicitateGooglePage({ params }: PageProps) {
  const { lang } = await params
  if (!isValidLang(lang)) notFound()
  return <ServicePageTemplate data={DATA[lang as Lang]} currentSlug="publicitate-google" />
}
