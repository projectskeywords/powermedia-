import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isValidLang, type Lang } from '@/lib/i18n'
import ServicePageTemplate, { type ServicePageData } from '@/components/services/ServicePageTemplate'

interface PageProps {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLang(lang)) return {}

  const titles: Record<Lang, string> = {
    ro: 'Automatizări AI pentru Afaceri | Powermedia Moldova',
    ru: 'AI-автоматизация для бизнеса | Powermedia Молдова',
    en: 'AI Business Automation Solutions | Powermedia',
  }
  return { title: titles[lang as Lang] }
}

const PAGE_DATA: Record<Lang, ServicePageData> = {
  ro: {
    lang: 'ro',
    hero: {
      badge: 'Automatizări AI',
      title: 'Pune <span class="text-[#e8ff00]">AI-ul</span> la muncă pentru afacerea ta',
      subtitle: 'Automatizăm procesele repetitive, reducem costurile operaționale cu 40-70% și eliberăm echipa ta pentru muncă cu valoare adăugată reală.',
      cta: 'Analizează procesele mele gratuit',
    },
    features: [
      { icon: '🤖', title: 'Chatboți Inteligenți', description: 'Chatbot-uri cu AI care răspund clienților 24/7, califică lead-uri și programează întâlniri automat.' },
      { icon: '📊', title: 'Analiză Date cu AI', description: 'Extrage insights valoroase din datele afacerii tale. Rapoarte automate, predicții și recomandări.' },
      { icon: '📧', title: 'Email Marketing AI', description: 'Campanii email personalizate automat pe baza comportamentului fiecărui client.' },
      { icon: '⚙️', title: 'Automatizări Workflow', description: 'Elimină munca manuală repetitivă. Integrăm toate tool-urile tale într-un flux automat.' },
      { icon: '🎯', title: 'Lead Scoring AI', description: 'Prioritizează automat lead-urile cu cea mai mare probabilitate de conversie.' },
      { icon: '📝', title: 'Generare Conținut', description: 'Articole, descrieri produse, postări social media generate automat cu AI.' },
    ],
    process: {
      title: 'Cum implementăm AI în afacerea ta',
      subtitle: 'Procesul nostru structurat de implementare AI',
      steps: [
        { step: 1, icon: '🔍', title: 'Audit Procese', description: 'Analizăm procesele actuale și identificăm oportunitățile de automatizare.' },
        { step: 2, icon: '📐', title: 'Strategie AI', description: 'Proiectăm soluția AI personalizată pentru nevoile specifice ale afacerii tale.' },
        { step: 3, icon: '🔧', title: 'Implementare', description: 'Integrăm și configurăm soluțiile AI cu sistemele tale existente.' },
        { step: 4, icon: '📈', title: 'Optimizare', description: 'Monitorizăm, îmbunătățim și scalăm soluțiile pe baza rezultatelor.' },
      ],
    },
    trust: {
      title: 'Rezultate dovedite',
      subtitle: 'Clienți care au economisit timp și bani cu AI',
      stats: [
        { value: '40%', label: 'Reducere costuri operaționale' },
        { value: '70%', label: 'Automatizare procese repetitive' },
        { value: '3x', label: 'Creștere productivitate' },
        { value: '24/7', label: 'Disponibilitate sistem' },
      ],
    },
    faq: {
      title: 'Întrebări despre Automatizări AI',
      subtitle: '',
      items: [
        { question: 'Am nevoie de cunoștințe tehnice pentru a folosi AI?', answer: 'Nu. Configurăm totul pentru tine și oferim training complet. Soluțiile noastre sunt intuitive și ușor de utilizat.' },
        { question: 'Cât de repede văd rezultatele?', answer: 'Primele rezultate se văd în 2-4 săptămâni de la implementare. ROI-ul complet se atinge de obicei în 3-6 luni.' },
        { question: 'Se integrează cu sistemele mele existente?', answer: 'Da! Integrăm cu CRM, ERP, platforme e-commerce, Google Workspace, Slack, și sute de alte tool-uri.' },
        { question: 'Datele mele sunt în siguranță?', answer: 'Absolut. Respectăm GDPR complet și toate datele sunt procesate pe servere europene securizate.' },
      ],
    },
    cta: {
      title: 'Automatizează și <span class="text-[#e8ff00]">câștigă timp</span>',
      description: 'Audit gratuit al proceselor tale. Identificăm împreună oportunitățile de automatizare.',
      button: 'Solicită audit gratuit',
    },
  },
  ru: {
    lang: 'ru',
    hero: {
      badge: 'AI-автоматизация',
      title: 'Пусть <span class="text-[#e8ff00]">ИИ</span> работает на ваш бизнес',
      subtitle: 'Автоматизируем повторяющиеся процессы, сокращаем операционные расходы на 40-70% и освобождаем вашу команду для работы с реальной добавленной стоимостью.',
      cta: 'Бесплатный анализ процессов',
    },
    features: [
      { icon: '🤖', title: 'Умные чат-боты', description: 'Чат-боты с ИИ, отвечающие клиентам 24/7, квалифицирующие лиды и автоматически записывающие на встречи.' },
      { icon: '📊', title: 'Анализ данных с ИИ', description: 'Извлекайте ценные инсайты из данных вашего бизнеса. Автоматические отчёты и прогнозы.' },
      { icon: '📧', title: 'Email-маркетинг с ИИ', description: 'Персонализированные email-кампании, автоматически настраиваемые под поведение каждого клиента.' },
      { icon: '⚙️', title: 'Автоматизация рабочих процессов', description: 'Устраните ручную рутинную работу. Интегрируем все ваши инструменты в автоматический поток.' },
      { icon: '🎯', title: 'Скоринг лидов с ИИ', description: 'Автоматически приоритизируйте лиды с наибольшей вероятностью конверсии.' },
      { icon: '📝', title: 'Генерация контента', description: 'Статьи, описания продуктов, посты в соцсетях, генерируемые автоматически с помощью ИИ.' },
    ],
    process: {
      title: 'Как мы внедряем ИИ в ваш бизнес',
      subtitle: 'Наш структурированный процесс внедрения ИИ',
      steps: [
        { step: 1, icon: '🔍', title: 'Аудит процессов', description: 'Анализируем текущие процессы и выявляем возможности для автоматизации.' },
        { step: 2, icon: '📐', title: 'Стратегия ИИ', description: 'Разрабатываем индивидуальное решение ИИ для конкретных нужд вашего бизнеса.' },
        { step: 3, icon: '🔧', title: 'Внедрение', description: 'Интегрируем и настраиваем решения ИИ с вашими существующими системами.' },
        { step: 4, icon: '📈', title: 'Оптимизация', description: 'Мониторим, улучшаем и масштабируем решения на основе результатов.' },
      ],
    },
    trust: {
      title: 'Доказанные результаты',
      subtitle: 'Клиенты, которые сэкономили время и деньги с ИИ',
      stats: [
        { value: '40%', label: 'Снижение операционных затрат' },
        { value: '70%', label: 'Автоматизация рутинных процессов' },
        { value: '3x', label: 'Рост производительности' },
        { value: '24/7', label: 'Доступность системы' },
      ],
    },
    faq: {
      title: 'Вопросы об автоматизации ИИ',
      subtitle: '',
      items: [
        { question: 'Нужны ли технические знания для использования ИИ?', answer: 'Нет. Мы всё настраиваем за вас и проводим полное обучение. Наши решения интуитивны и просты в использовании.' },
        { question: 'Как быстро я увижу результаты?', answer: 'Первые результаты видны через 2-4 недели после внедрения. Полный ROI достигается обычно через 3-6 месяцев.' },
        { question: 'Интегрируется ли с моими существующими системами?', answer: 'Да! Интегрируем с CRM, ERP, e-commerce платформами, Google Workspace, Slack и сотнями других инструментов.' },
        { question: 'Безопасны ли мои данные?', answer: 'Абсолютно. Полностью соблюдаем GDPR, все данные обрабатываются на защищённых европейских серверах.' },
      ],
    },
    cta: {
      title: 'Автоматизируйте и <span class="text-[#e8ff00]">выиграйте время</span>',
      description: 'Бесплатный аудит ваших процессов. Определим возможности автоматизации вместе.',
      button: 'Запросить бесплатный аудит',
    },
  },
  en: {
    lang: 'en',
    hero: {
      badge: 'AI Automation',
      title: 'Put <span class="text-[#e8ff00]">AI</span> to work for your business',
      subtitle: 'We automate repetitive processes, reduce operational costs by 40-70%, and free your team for high-value work.',
      cta: 'Free process analysis',
    },
    features: [
      { icon: '🤖', title: 'Intelligent Chatbots', description: 'AI chatbots that respond to customers 24/7, qualify leads and schedule appointments automatically.' },
      { icon: '📊', title: 'AI Data Analysis', description: 'Extract valuable insights from your business data. Automatic reports, predictions and recommendations.' },
      { icon: '📧', title: 'AI Email Marketing', description: 'Personalized email campaigns automatically tailored to each customer\'s behavior.' },
      { icon: '⚙️', title: 'Workflow Automation', description: 'Eliminate repetitive manual work. Integrate all your tools into an automated flow.' },
      { icon: '🎯', title: 'AI Lead Scoring', description: 'Automatically prioritize leads with the highest conversion probability.' },
      { icon: '📝', title: 'Content Generation', description: 'Articles, product descriptions, social media posts automatically generated with AI.' },
    ],
    process: {
      title: 'How we implement AI in your business',
      subtitle: 'Our structured AI implementation process',
      steps: [
        { step: 1, icon: '🔍', title: 'Process Audit', description: 'We analyze current processes and identify automation opportunities.' },
        { step: 2, icon: '📐', title: 'AI Strategy', description: 'We design the custom AI solution for your business\'s specific needs.' },
        { step: 3, icon: '🔧', title: 'Implementation', description: 'We integrate and configure AI solutions with your existing systems.' },
        { step: 4, icon: '📈', title: 'Optimization', description: 'We monitor, improve and scale solutions based on results.' },
      ],
    },
    trust: {
      title: 'Proven results',
      subtitle: 'Clients who saved time and money with AI',
      stats: [
        { value: '40%', label: 'Operational cost reduction' },
        { value: '70%', label: 'Repetitive process automation' },
        { value: '3x', label: 'Productivity increase' },
        { value: '24/7', label: 'System availability' },
      ],
    },
    faq: {
      title: 'AI Automation Questions',
      subtitle: '',
      items: [
        { question: 'Do I need technical knowledge to use AI?', answer: 'No. We configure everything for you and provide complete training. Our solutions are intuitive and easy to use.' },
        { question: 'How quickly will I see results?', answer: 'First results are visible 2-4 weeks after implementation. Full ROI is typically achieved in 3-6 months.' },
        { question: 'Does it integrate with my existing systems?', answer: 'Yes! We integrate with CRM, ERP, e-commerce platforms, Google Workspace, Slack, and hundreds of other tools.' },
        { question: 'Is my data secure?', answer: 'Absolutely. We fully comply with GDPR and all data is processed on secure European servers.' },
      ],
    },
    cta: {
      title: 'Automate and <span class="text-[#e8ff00]">gain time</span>',
      description: 'Free process audit. We identify automation opportunities together.',
      button: 'Request free audit',
    },
  },
}

export default async function AutomatizariAIPage({ params }: PageProps) {
  const { lang } = await params
  if (!isValidLang(lang)) notFound()
  return <ServicePageTemplate data={PAGE_DATA[lang as Lang]} />
}
