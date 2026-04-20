import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isValidLang, type Lang } from '@/lib/i18n'
import ServicePageTemplate, { type ServicePageData } from '@/components/services/ServicePageTemplate'

interface PageProps { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLang(lang)) return {}
  const titles: Record<Lang, string> = {
    ro: 'Creare Magazin Online Moldova | Powermedia',
    ru: 'Создание интернет-магазина в Молдове | Powermedia',
    en: 'Online Store Development Moldova | Powermedia',
  }
  const descs: Record<Lang, string> = {
    ro: 'Creăm magazine online complete pentru afaceri din Moldova — plăți integrate, gestionare stocuri, design premium. E-commerce care vinde 24/7 în Moldova și Europa.',
    ru: 'Создаём полноценные интернет-магазины для бизнеса в Молдове — интеграция платежей, управление складом, премиум-дизайн. E-commerce работающий 24/7.',
    en: 'We build complete online stores for businesses in Moldova — payment integration, inventory management, premium design. E-commerce that sells 24/7.',
  }
  return {
    title: titles[lang as Lang],
    description: descs[lang as Lang],
    alternates: {
      canonical: `https://powermedia.md/${lang}/servicii/magazin-online`,
      languages: {
        ro: 'https://powermedia.md/ro/servicii/magazin-online',
        ru: 'https://powermedia.md/ru/servicii/magazin-online',
        en: 'https://powermedia.md/en/servicii/magazin-online',
      },
    },
  }
}

const DATA: Record<Lang, ServicePageData> = {
  ro: {
    lang: 'ro',
    hero: {
      badge: 'Magazin Online',
      title: 'Magazin Online <span class="text-[#e8ff00]">Moldova</span> — E-commerce care vinde',
      subtitle: 'Construim magazine online complete cu integrare plăți, gestionare stocuri, și tot ce ai nevoie pentru a vinde online în Moldova și Europa.',
      cta: 'Lansează magazinul tău online',
    },
    features: [
      { icon: '💳', title: 'Plăți Online', description: 'Integrare completă cu toate metodele de plată: card, PayPal, MAIB, Moldova Agroindbank.' },
      { icon: '📦', title: 'Gestionare Stocuri', description: 'Sistem automat de inventar cu notificări de stoc scăzut și sincronizare cu furnizorii.' },
      { icon: '🚚', title: 'Integrare Curierat', description: 'Conexiune cu Poșta Moldovei, Nova Poshta, DHL. Tracking automat pentru clienți.' },
      { icon: '📱', title: 'App Mobile', description: 'Aplicație mobilă pentru clienți (iOS/Android) inclusă în pachetele premium.' },
      { icon: '📊', title: 'Analytics Vânzări', description: 'Dashboard complet cu rapoarte vânzări, produse top, comportament clienți.' },
      { icon: '🔍', title: 'SEO pentru E-commerce', description: 'Optimizare completă pentru Google Shopping, meta tags produse, sitemap automat.' },
    ],
    process: {
      title: 'De la idee la magazin funcțional',
      subtitle: 'Lansăm magazinul tău în 4-6 săptămâni',
      steps: [
        { step: 1, icon: '📋', title: 'Analiză & Planificare', description: 'Analizăm produsele, concurența și piața pentru a planifica strategia optimă.' },
        { step: 2, icon: '🎨', title: 'Design UX/UI', description: 'Design orientat spre conversie: fiecare element gândit să transforme vizitatorul în cumpărător.' },
        { step: 3, icon: '⚙️', title: 'Configurare & Integrări', description: 'Configurăm toate integrările: plăți, curierat, facturare, email marketing.' },
        { step: 4, icon: '🚀', title: 'Lansare & Promovare', description: 'Lansăm magazinul și setăm primele campanii Google Shopping și Facebook Ads.' },
      ],
    },
    trust: {
      title: 'Magazine online de succes',
      subtitle: 'Livrate pentru afaceri din Moldova',
      stats: [
        { value: '45+', label: 'Magazine online livrate' },
        { value: '2M+', label: 'Lei vânzări generate' },
        { value: '35%', label: 'Conversie medie' },
        { value: '4.8★', label: 'Rating clienți' },
      ],
    },
    faq: {
      title: 'Întrebări despre Magazine Online',
      subtitle: '',
      items: [
        { question: 'Ce platformă e-commerce folosiți?', answer: 'Construim pe Next.js, WooCommerce sau Shopify în funcție de nevoile tale. Recomandăm soluția optimă pentru volumul și tipul produselor tale.' },
        { question: 'Pot importa produsele mele existente?', answer: 'Da! Facem import în masă din Excel, CSV sau din magazinul tău actual. Până la mii de produse în câteva ore.' },
        { question: 'Acceptați plăți în MDL?', answer: 'Da, integrăm cu toate băncile moldovenești: MAIB, Mobiasbancă, Victoriabank. Plus plăți internaționale (Visa/Mastercard, PayPal).' },
        { question: 'Oferă facturare automată?', answer: 'Da! Generăm automat facturi și chitanțe conform legislației moldovenești și le trimitem clienților pe email.' },
      ],
    },
    cta: {
      title: 'Vinde online <span class="text-[#e8ff00]">24 de ore din 24</span>',
      description: 'Consultație gratuită. Analizăm produsele tale și construim strategia optimă.',
      button: 'Lansează magazinul acum',
    },
  },
  ru: {
    lang: 'ru',
    hero: {
      badge: 'Интернет-магазин',
      title: 'E-commerce, который <span class="text-[#e8ff00]">продаёт</span> круглосуточно',
      subtitle: 'Создаём полноценные интернет-магазины с интеграцией платежей, управлением запасами и всем необходимым для онлайн-продаж в Молдове и Европе.',
      cta: 'Запустить интернет-магазин',
    },
    features: [
      { icon: '💳', title: 'Онлайн-платежи', description: 'Полная интеграция со всеми способами оплаты: карта, PayPal, молдавские банки.' },
      { icon: '📦', title: 'Управление запасами', description: 'Автоматическая система инвентаря с уведомлениями о низком запасе.' },
      { icon: '🚚', title: 'Интеграция курьерских служб', description: 'Связь с Почтой Молдовы, Nova Poshta, DHL. Автоматическое отслеживание.' },
      { icon: '📱', title: 'Мобильное приложение', description: 'Мобильное приложение для клиентов (iOS/Android) в премиум-пакетах.' },
      { icon: '📊', title: 'Аналитика продаж', description: 'Полная панель управления с отчётами о продажах и поведении клиентов.' },
      { icon: '🔍', title: 'SEO для e-commerce', description: 'Полная оптимизация для Google Shopping, мета-теги продуктов, автосайтмап.' },
    ],
    process: {
      title: 'От идеи до работающего магазина',
      subtitle: 'Запускаем ваш магазин за 4-6 недель',
      steps: [
        { step: 1, icon: '📋', title: 'Анализ и планирование', description: 'Анализируем продукты, конкурентов и рынок для оптимальной стратегии.' },
        { step: 2, icon: '🎨', title: 'Дизайн UX/UI', description: 'Дизайн, ориентированный на конверсию: каждый элемент превращает посетителя в покупателя.' },
        { step: 3, icon: '⚙️', title: 'Настройка и интеграции', description: 'Настраиваем платежи, доставку, выставление счетов, email-маркетинг.' },
        { step: 4, icon: '🚀', title: 'Запуск и продвижение', description: 'Запускаем магазин и настраиваем первые кампании Google Shopping и Facebook Ads.' },
      ],
    },
    trust: {
      title: 'Успешные интернет-магазины',
      subtitle: 'Созданные для бизнесов в Молдове',
      stats: [
        { value: '45+', label: 'Магазинов создано' },
        { value: '2M+', label: 'Лей продаж сгенерировано' },
        { value: '35%', label: 'Средняя конверсия' },
        { value: '4.8★', label: 'Рейтинг клиентов' },
      ],
    },
    faq: {
      title: 'Вопросы об интернет-магазинах',
      subtitle: '',
      items: [
        { question: 'Какую e-commerce платформу вы используете?', answer: 'Создаём на Next.js, WooCommerce или Shopify в зависимости от ваших потребностей.' },
        { question: 'Можно ли импортировать существующие продукты?', answer: 'Да! Делаем массовый импорт из Excel, CSV или вашего текущего магазина. Тысячи товаров за несколько часов.' },
        { question: 'Принимаете ли вы платежи в молдавских леях?', answer: 'Да, интегрируем со всеми молдавскими банками: MAIB, Mobiasbancă, Victoriabank. Плюс международные платежи.' },
        { question: 'Автоматическое выставление счетов?', answer: 'Да! Автоматически генерируем счета по молдавскому законодательству и отправляем клиентам по email.' },
      ],
    },
    cta: {
      title: 'Продавайте онлайн <span class="text-[#e8ff00]">24 часа в сутки</span>',
      description: 'Бесплатная консультация. Анализируем ваши продукты и строим оптимальную стратегию.',
      button: 'Запустить магазин сейчас',
    },
  },
  en: {
    lang: 'en',
    hero: {
      badge: 'Online Store',
      title: 'E-commerce that <span class="text-[#e8ff00]">sells</span> around the clock',
      subtitle: 'We build complete online stores with payment integration, inventory management, and everything you need to sell online in Moldova and Europe.',
      cta: 'Launch your online store',
    },
    features: [
      { icon: '💳', title: 'Online Payments', description: 'Full integration with all payment methods: card, PayPal, and local Moldovan banks.' },
      { icon: '📦', title: 'Inventory Management', description: 'Automatic inventory system with low-stock notifications and supplier sync.' },
      { icon: '🚚', title: 'Courier Integration', description: 'Connection with major carriers. Automatic tracking for customers.' },
      { icon: '📱', title: 'Mobile App', description: 'Customer mobile app (iOS/Android) included in premium packages.' },
      { icon: '📊', title: 'Sales Analytics', description: 'Full dashboard with sales reports, top products, and customer behaviour.' },
      { icon: '🔍', title: 'E-commerce SEO', description: 'Complete optimization for Google Shopping, product meta tags, automatic sitemap.' },
    ],
    process: {
      title: 'From idea to working store',
      subtitle: 'We launch your store in 4-6 weeks',
      steps: [
        { step: 1, icon: '📋', title: 'Analysis & Planning', description: 'We analyze your products, competition and market for the optimal strategy.' },
        { step: 2, icon: '🎨', title: 'UX/UI Design', description: 'Conversion-oriented design: every element designed to turn visitors into buyers.' },
        { step: 3, icon: '⚙️', title: 'Setup & Integrations', description: 'We configure payments, shipping, invoicing, and email marketing.' },
        { step: 4, icon: '🚀', title: 'Launch & Promotion', description: 'We launch the store and set up initial Google Shopping and Facebook Ads campaigns.' },
      ],
    },
    trust: {
      title: 'Successful online stores',
      subtitle: 'Delivered for businesses across Moldova',
      stats: [
        { value: '45+', label: 'Stores delivered' },
        { value: '2M+', label: 'MDL sales generated' },
        { value: '35%', label: 'Average conversion' },
        { value: '4.8★', label: 'Client rating' },
      ],
    },
    faq: {
      title: 'Online Store Questions',
      subtitle: '',
      items: [
        { question: 'What e-commerce platform do you use?', answer: 'We build on Next.js, WooCommerce or Shopify depending on your needs.' },
        { question: 'Can I import my existing products?', answer: 'Yes! We do bulk imports from Excel, CSV or your current store. Thousands of products in hours.' },
        { question: 'Do you support Moldovan Leu payments?', answer: 'Yes, we integrate with all Moldovan banks plus international payment processors (Visa/Mastercard, PayPal).' },
        { question: 'Do you offer automatic invoicing?', answer: 'Yes! We automatically generate invoices compliant with Moldovan legislation and send them to customers by email.' },
      ],
    },
    cta: {
      title: 'Sell online <span class="text-[#e8ff00]">24 hours a day</span>',
      description: 'Free consultation. We analyze your products and build the optimal strategy.',
      button: 'Launch your store now',
    },
  },
}

export default async function MagazinOnlinePage({ params }: PageProps) {
  const { lang } = await params
  if (!isValidLang(lang)) notFound()
  return <ServicePageTemplate data={DATA[lang as Lang]} currentSlug="magazin-online" />
}
