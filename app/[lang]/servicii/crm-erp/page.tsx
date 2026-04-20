import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { isValidLang, type Lang } from '@/lib/i18n'
import ServicePageTemplate, { type ServicePageData } from '@/components/services/ServicePageTemplate'

interface PageProps { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params
  if (!isValidLang(lang)) return {}
  const titles: Record<Lang, string> = {
    ro: 'Sisteme CRM & ERP Personalizate Moldova | Powermedia',
    ru: 'CRM и ERP системы для бизнеса в Молдове | Powermedia',
    en: 'Custom CRM & ERP Systems Moldova | Powermedia',
  }
  return { title: titles[lang as Lang] }
}

const DATA: Record<Lang, ServicePageData> = {
  ro: {
    lang: 'ro',
    hero: {
      badge: 'CRM / ERP',
      title: 'Sisteme de gestiune care <span class="text-[#e8ff00]">scalează</span> odată cu tine',
      subtitle: 'Construim soluții CRM și ERP personalizate pentru afacerile moldovenești. Gestionează clienții, stocurile, facturarea și echipa dintr-un singur dashboard.',
      cta: 'Demo gratuit 30 minute',
    },
    features: [
      { icon: '👥', title: 'CRM Clienți', description: 'Gestionează relațiile cu clienții: istoricul complet, pipeline vânzări, follow-up-uri automate.' },
      { icon: '📋', title: 'Gestiune Comenzi', description: 'De la ofertă la facturare. Urmărire completă a fiecărei comenzi în timp real.' },
      { icon: '📊', title: 'Rapoarte & Analytics', description: 'Dashboarduri cu KPI-uri relevante. Decizii bazate pe date, nu pe intuiție.' },
      { icon: '👷', title: 'Gestiune Resurse Umane', description: 'Pontaj, concedii, salarii, evaluări de performanță — toate centralizate.' },
      { icon: '🏭', title: 'Gestiune Stocuri', description: 'Inventar în timp real, alerte stoc minim, comenzi automate către furnizori.' },
      { icon: '🔗', title: 'Integrări API', description: 'Se conectează cu contabilitatea ta (1C, SAGA), banca, platforma e-commerce.' },
    ],
    process: {
      title: 'Cum construim sistemul tău',
      subtitle: 'Implementare structurată, fără perturbarea activității',
      steps: [
        { step: 1, icon: '🔍', title: 'Analiză Business', description: 'Înțelegem fluxurile de lucru actuale, punctele de durere și obiectivele tale.' },
        { step: 2, icon: '📐', title: 'Proiectare Sistem', description: 'Proiectăm arhitectura sistemului adaptat exact nevoilor tale.' },
        { step: 3, icon: '⚙️', title: 'Dezvoltare & Testare', description: 'Construim și testăm riguros fiecare modul al sistemului.' },
        { step: 4, icon: '🎓', title: 'Training & Go-Live', description: 'Formăm echipa și implementăm sistemul cu suport continuu.' },
      ],
    },
    trust: {
      title: 'Sisteme implementate cu succes',
      subtitle: 'Pentru companii din Moldova',
      stats: [
        { value: '30+', label: 'Sisteme implementate' },
        { value: '50%', label: 'Reducere timp administrativ' },
        { value: '99.5%', label: 'Uptime garantat' },
        { value: '24h', label: 'Suport tehnic' },
      ],
    },
    faq: {
      title: 'Întrebări despre CRM/ERP',
      subtitle: '',
      items: [
        { question: 'Este compatibil cu legislația moldovenească?', answer: 'Da! Sistemele noastre respectă toate cerințele legale locale: TVA, facturare fiscală, raportare SFS.' },
        { question: 'Cât durează implementarea?', answer: 'Un sistem de bază se implementează în 4-6 săptămâni. Sisteme complexe cu multiple module pot dura 3-6 luni.' },
        { question: 'Datele mele sunt în siguranță?', answer: 'Backup zilnic automat, hosting pe servere securizate în Europa, acces bazat pe roluri și drepturi.' },
        { question: 'Pot accesa sistemul de pe telefon?', answer: 'Da! Toate sistemele noastre sunt responsive și au aplicații mobile native opționale.' },
      ],
    },
    cta: {
      title: 'Sistematizează și <span class="text-[#e8ff00]">scalează afacerea</span>',
      description: 'Demo gratuit 30 minute. Îți arătăm cum va arăta sistemul tău.',
      button: 'Rezervă demo gratuit',
    },
  },
  ru: {
    lang: 'ru',
    hero: {
      badge: 'CRM / ERP',
      title: 'Системы управления, которые <span class="text-[#e8ff00]">масштабируются</span> вместе с вами',
      subtitle: 'Создаём индивидуальные CRM и ERP решения для молдавского бизнеса. Управляйте клиентами, запасами, выставлением счетов и командой из единой панели.',
      cta: 'Бесплатное демо 30 минут',
    },
    features: [
      { icon: '👥', title: 'CRM клиентов', description: 'Управление отношениями с клиентами: полная история, воронка продаж, автоматические напоминания.' },
      { icon: '📋', title: 'Управление заказами', description: 'От предложения до выставления счёта. Полное отслеживание каждого заказа в реальном времени.' },
      { icon: '📊', title: 'Отчёты и аналитика', description: 'Дашборды с релевантными KPI. Решения на основе данных, а не интуиции.' },
      { icon: '👷', title: 'Управление персоналом', description: 'Учёт рабочего времени, отпуска, зарплаты, оценки производительности — всё централизовано.' },
      { icon: '🏭', title: 'Управление запасами', description: 'Инвентарь в реальном времени, оповещения о минимальном запасе, автозаказы поставщикам.' },
      { icon: '🔗', title: 'API интеграции', description: 'Подключается к вашей бухгалтерии (1C, SAGA), банку, e-commerce платформе.' },
    ],
    process: {
      title: 'Как мы создаём вашу систему',
      subtitle: 'Структурированное внедрение без нарушения работы',
      steps: [
        { step: 1, icon: '🔍', title: 'Анализ бизнеса', description: 'Понимаем текущие рабочие процессы, болевые точки и ваши цели.' },
        { step: 2, icon: '📐', title: 'Проектирование системы', description: 'Проектируем архитектуру, точно адаптированную к вашим потребностям.' },
        { step: 3, icon: '⚙️', title: 'Разработка и тестирование', description: 'Строим и тщательно тестируем каждый модуль системы.' },
        { step: 4, icon: '🎓', title: 'Обучение и запуск', description: 'Обучаем команду и внедряем систему с постоянной поддержкой.' },
      ],
    },
    trust: {
      title: 'Успешно внедрённые системы',
      subtitle: 'Для компаний в Молдове',
      stats: [
        { value: '30+', label: 'Внедрённых систем' },
        { value: '50%', label: 'Снижение административного времени' },
        { value: '99.5%', label: 'Гарантированный uptime' },
        { value: '24ч', label: 'Техническая поддержка' },
      ],
    },
    faq: {
      title: 'Вопросы о CRM/ERP',
      subtitle: '',
      items: [
        { question: 'Совместима ли система с молдавским законодательством?', answer: 'Да! Наши системы соответствуют всем местным законодательным требованиям: НДС, фискальные счета, отчётность СНС.' },
        { question: 'Сколько времени занимает внедрение?', answer: 'Базовая система внедряется за 4-6 недель. Сложные системы с несколькими модулями могут занять 3-6 месяцев.' },
        { question: 'Безопасны ли мои данные?', answer: 'Ежедневное автоматическое резервное копирование, безопасный хостинг в Европе, доступ на основе ролей.' },
        { question: 'Можно ли получить доступ с телефона?', answer: 'Да! Все наши системы адаптивны и имеют опциональные нативные мобильные приложения.' },
      ],
    },
    cta: {
      title: 'Систематизируйте и <span class="text-[#e8ff00]">масштабируйте бизнес</span>',
      description: 'Бесплатное демо 30 минут. Покажем, как будет выглядеть ваша система.',
      button: 'Записаться на бесплатное демо',
    },
  },
  en: {
    lang: 'en',
    hero: {
      badge: 'CRM / ERP',
      title: 'Management systems that <span class="text-[#e8ff00]">scale</span> with you',
      subtitle: 'We build custom CRM and ERP solutions for Moldovan businesses. Manage clients, inventory, invoicing and your team from a single dashboard.',
      cta: 'Free 30-minute demo',
    },
    features: [
      { icon: '👥', title: 'Client CRM', description: 'Manage client relationships: full history, sales pipeline, automatic follow-ups.' },
      { icon: '📋', title: 'Order Management', description: 'From quote to invoice. Full real-time tracking of every order.' },
      { icon: '📊', title: 'Reports & Analytics', description: 'Dashboards with relevant KPIs. Data-driven decisions, not guesswork.' },
      { icon: '👷', title: 'HR Management', description: 'Time tracking, leave, salaries, performance reviews — all centralized.' },
      { icon: '🏭', title: 'Inventory Management', description: 'Real-time inventory, minimum stock alerts, automatic supplier orders.' },
      { icon: '🔗', title: 'API Integrations', description: 'Connects to your accounting (1C, SAGA), bank, e-commerce platform.' },
    ],
    process: {
      title: 'How we build your system',
      subtitle: 'Structured implementation without disrupting operations',
      steps: [
        { step: 1, icon: '🔍', title: 'Business Analysis', description: 'We understand current workflows, pain points and your goals.' },
        { step: 2, icon: '📐', title: 'System Design', description: 'We design the architecture precisely tailored to your needs.' },
        { step: 3, icon: '⚙️', title: 'Development & Testing', description: 'We rigorously build and test each module of the system.' },
        { step: 4, icon: '🎓', title: 'Training & Go-Live', description: 'We train the team and deploy the system with continuous support.' },
      ],
    },
    trust: {
      title: 'Successfully implemented systems',
      subtitle: 'For companies across Moldova',
      stats: [
        { value: '30+', label: 'Systems implemented' },
        { value: '50%', label: 'Admin time reduction' },
        { value: '99.5%', label: 'Guaranteed uptime' },
        { value: '24h', label: 'Technical support' },
      ],
    },
    faq: {
      title: 'CRM/ERP Questions',
      subtitle: '',
      items: [
        { question: 'Is it compatible with Moldovan legislation?', answer: 'Yes! Our systems comply with all local legal requirements: VAT, fiscal invoicing, SFS reporting.' },
        { question: 'How long does implementation take?', answer: 'A basic system is implemented in 4-6 weeks. Complex multi-module systems may take 3-6 months.' },
        { question: 'Is my data secure?', answer: 'Daily automatic backups, secure European hosting, role-based access control.' },
        { question: 'Can I access it from my phone?', answer: 'Yes! All our systems are responsive and have optional native mobile apps.' },
      ],
    },
    cta: {
      title: 'Systematize and <span class="text-[#e8ff00]">scale your business</span>',
      description: 'Free 30-minute demo. We show you what your system will look like.',
      button: 'Book free demo',
    },
  },
}

export default async function CrmErpPage({ params }: PageProps) {
  const { lang } = await params
  if (!isValidLang(lang)) notFound()
  return <ServicePageTemplate data={DATA[lang as Lang]} />
}
