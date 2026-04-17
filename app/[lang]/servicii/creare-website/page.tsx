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
    ro: 'Creare Website Profesional Moldova | Powermedia',
    ru: 'Создание сайта в Молдове | Powermedia',
    en: 'Professional Website Development Moldova | Powermedia',
  }
  const descs: Record<Lang, string> = {
    ro: 'Creăm site-uri profesionale, rapide și optimizate SEO pentru afaceri din Moldova. Design modern, hosting inclus.',
    ru: 'Создаём профессиональные, быстрые и SEO-оптимизированные сайты для бизнеса в Молдове.',
    en: 'We create professional, fast and SEO-optimized websites for businesses. Modern design, hosting included.',
  }

  return { title: titles[lang as Lang], description: descs[lang as Lang] }
}

const PAGE_DATA: Record<Lang, ServicePageData> = {
  ro: {
    lang: 'ro',
    hero: {
      badge: 'Creare Website',
      title: 'Site-uri care <span class="text-[#e8ff00]">vând</span> și conving',
      subtitle: 'Construim prezențe digitale complete — de la landing pages la platforme complexe. Design premium, performanță maximă, SEO integrat de la bun început.',
      cta: 'Solicită ofertă gratuită',
    },
    features: [
      { icon: '🎨', title: 'Design Custom', description: 'Fiecare pixel conceput special pentru brandul tău. Zero template-uri generice.' },
      { icon: '⚡', title: 'Performanță 90+', description: 'Google PageSpeed 90+ garantat. Site-urile noastre se încarcă în sub 2 secunde.' },
      { icon: '🔍', title: 'SEO Integrat', description: 'Optimizat pentru motoarele de căutare din prima zi. Structură tehnică impecabilă.' },
      { icon: '📱', title: 'Mobile-First', description: 'Experiență perfectă pe orice dispozitiv. 70% din trafic vine de pe mobil.' },
      { icon: '🔒', title: 'Securitate SSL', description: 'HTTPS, protecție DDoS, backup zilnic. Datele tale sunt mereu în siguranță.' },
      { icon: '🚀', title: 'Hosting Premium', description: 'Hosting pe servere europene cu uptime 99.9% inclus în primele 12 luni.' },
    ],
    benefits: {
      title: 'Ce câștigă afacerea ta',
      subtitle: 'Un site profesional nu e un cost — e cea mai profitabilă investiție digitală',
      items: [
        { title: 'Credibilitate instantă', description: '75% din utilizatori judecă credibilitatea unei companii după design-ul site-ului. Un site profesional transformă vizitatorii în clienți plătitori.' },
        { title: 'Vizibilitate în Google', description: 'Un site SEO-optimizat apare în primele rezultate Google pentru căutările clienților tăi. Trafic organic gratuit, 24/7.' },
        { title: 'Vânzări non-stop', description: 'Site-ul tău lucrează și la 3 noaptea. Orice client, oricând, din orice parte a lumii îți poate contacta sau cumpăra de la tine.' },
        { title: 'Avantaj față de concurență', description: '60% din companiile mici din Moldova nu au un site optimizat. Fii primul din industria ta cu o prezență digitală de nivel internațional.' },
      ],
    },
    pricing: {
      title: 'Pachete și prețuri',
      subtitle: 'Prețuri transparente, fără costuri ascunse. Alege pachetul potrivit afacerii tale.',
      plans: [
        {
          name: 'Landing Page',
          price: '300€',
          description: 'Perfect pentru prezentarea unui produs sau serviciu specific.',
          features: [
            'Design custom 1 pagină',
            'Optimizare SEO de bază',
            'Formular de contact',
            'Responsive mobile',
            'Domeniu .md inclus 1 an',
            'Hosting 6 luni inclus',
          ],
        },
        {
          name: 'Site Prezentare',
          price: '800€',
          badge: 'Popular',
          highlighted: true,
          description: 'Soluția completă pentru afaceri care vor să crească online.',
          features: [
            'Design custom 5-8 pagini',
            'SEO tehnic avansat',
            'Blog integrat',
            'Panou de administrare',
            'Domeniu + hosting 12 luni',
            'Integrare Google Analytics',
            'Training utilizare inclus',
          ],
        },
        {
          name: 'Platformă Custom',
          price: 'De la 2000€',
          description: 'Soluții digitale complexe pentru afaceri ambițioase.',
          features: [
            'Design 100% personalizat',
            'Funcționalități avansate',
            'Integrări API externe',
            'Dashboard admin complet',
            'Suport prioritar 12 luni',
            'Optimizare continuă SEO',
            'Performanță 95+ PageSpeed',
          ],
        },
      ],
    },
    technologies: {
      title: 'Tehnologiile pe care le folosim',
      items: [
        { name: 'Next.js', category: 'Framework' },
        { name: 'React', category: 'UI' },
        { name: 'TypeScript', category: 'Language' },
        { name: 'Tailwind CSS', category: 'Styling' },
        { name: 'Vercel', category: 'Hosting' },
        { name: 'PostgreSQL', category: 'Database' },
        { name: 'Figma', category: 'Design' },
        { name: 'WordPress', category: 'CMS' },
        { name: 'Cloudflare', category: 'CDN' },
        { name: 'Google Analytics', category: 'Analytics' },
        { name: 'Stripe', category: 'Payments' },
        { name: 'Resend', category: 'Email' },
      ],
    },
    process: {
      title: 'Cum creăm site-ul tău',
      subtitle: 'Un proces transparent în 4 pași, de la idee la lansare',
      steps: [
        { step: 1, icon: '💬', title: 'Consultație', description: 'Discutăm nevoile, obiectivele și viziunea ta pentru site.' },
        { step: 2, icon: '🎨', title: 'Design & Prototip', description: 'Creăm mockup-uri vizuale și le refinăm cu feedback-ul tău.' },
        { step: 3, icon: '💻', title: 'Dezvoltare', description: 'Programăm site-ul cu cele mai moderne tehnologii web.' },
        { step: 4, icon: '🚀', title: 'Lansare & Suport', description: 'Lansăm site-ul și oferim suport tehnic continuu.' },
      ],
    },
    trust: {
      title: 'De ce să ne alegi pe noi',
      subtitle: 'Rezultate dovedite, clienți din toată Moldova',
      stats: [
        { value: '120+', label: 'Site-uri livrate' },
        { value: '98%', label: 'Clienți mulțumiți' },
        { value: '2.1s', label: 'Timp mediu încărcare' },
        { value: '5★', label: 'Rating Google' },
      ],
    },
    faq: {
      title: 'Întrebări frecvente',
      subtitle: 'Răspunsuri la cele mai comune întrebări despre creare website',
      items: [
        { question: 'Cât costă un site web în Moldova?', answer: 'Prețurile variază în funcție de complexitate: de la 300€ pentru un landing page simplu până la 5000€+ pentru platforme complexe. Oferim consultație gratuită pentru a stabili bugetul optim.' },
        { question: 'Cât timp durează crearea unui site?', answer: 'Un site de prezentare simplu se realizează în 2-3 săptămâni. Proiectele complexe pot dura 4-8 săptămâni. Respectăm termenele agreate.' },
        { question: 'Includeți hosting și domeniu?', answer: 'Da! Hosting premium pe servere europene și înregistrarea domeniului .md sau .com sunt incluse gratuit în primul an.' },
        { question: 'Pot să-mi actualizez singur conținutul?', answer: 'Absolut! Toate site-urile noastre vin cu panou de administrare intuitiv. Oferim și training gratuit.' },
        { question: 'Oferiți suport după lansare?', answer: 'Da, oferim suport tehnic 24/7 pentru primele 3 luni și pachete de mentenanță lunară opționale.' },
      ],
    },
    cta: {
      title: 'Gata să lansezi site-ul <span class="text-[#e8ff00]">visului tău</span>?',
      description: 'Consultație gratuită. Ofertă personalizată în 24h.',
      button: 'Solicită ofertă acum',
    },
  },
  ru: {
    lang: 'ru',
    hero: {
      badge: 'Создание сайта',
      title: 'Сайты, которые <span class="text-[#e8ff00]">продают</span>',
      subtitle: 'Создаём полноценные цифровые присутствия — от лендингов до сложных платформ. Премиальный дизайн, максимальная производительность, SEO с первого дня.',
      cta: 'Получить бесплатное предложение',
    },
    features: [
      { icon: '🎨', title: 'Индивидуальный дизайн', description: 'Каждый пиксель разработан специально для вашего бренда. Никаких шаблонов.' },
      { icon: '⚡', title: 'Производительность 90+', description: 'Google PageSpeed 90+ гарантирован. Сайты загружаются менее чем за 2 секунды.' },
      { icon: '🔍', title: 'Встроенное SEO', description: 'Оптимизировано для поисковых систем с первого дня. Безупречная техническая структура.' },
      { icon: '📱', title: 'Mobile-First', description: 'Идеальный опыт на любом устройстве. 70% трафика приходит с мобильных.' },
      { icon: '🔒', title: 'Безопасность SSL', description: 'HTTPS, защита от DDoS, ежедневное резервное копирование. Ваши данные в безопасности.' },
      { icon: '🚀', title: 'Премиум хостинг', description: 'Хостинг на европейских серверах с 99.9% uptime включён в первые 12 месяцев.' },
    ],
    benefits: {
      title: 'Что получает ваш бизнес',
      subtitle: 'Профессиональный сайт — это не расход, а самая выгодная цифровая инвестиция',
      items: [
        { title: 'Мгновенное доверие', description: '75% пользователей оценивают доверие к компании по дизайну сайта. Профессиональный сайт превращает посетителей в платящих клиентов.' },
        { title: 'Видимость в Google', description: 'SEO-оптимизированный сайт появляется в первых результатах Google по запросам ваших клиентов. Бесплатный органический трафик 24/7.' },
        { title: 'Продажи круглосуточно', description: 'Ваш сайт работает даже в 3 ночи. Любой клиент в любое время из любой точки мира может связаться с вами или сделать покупку.' },
        { title: 'Преимущество перед конкурентами', description: '60% малых компаний Молдовы не имеют оптимизированного сайта. Будьте первыми в своей отрасли с цифровым присутствием международного уровня.' },
      ],
    },
    pricing: {
      title: 'Пакеты и цены',
      subtitle: 'Прозрачные цены без скрытых платежей. Выберите подходящий пакет.',
      plans: [
        {
          name: 'Лендинг',
          price: '300€',
          description: 'Идеально для презентации конкретного продукта или услуги.',
          features: [
            'Индивидуальный дизайн 1 страницы',
            'Базовая SEO-оптимизация',
            'Форма обратной связи',
            'Адаптивный мобильный дизайн',
            'Домен .md включён на 1 год',
            'Хостинг 6 месяцев включён',
          ],
        },
        {
          name: 'Сайт-визитка',
          price: '800€',
          badge: 'Популярно',
          highlighted: true,
          description: 'Полное решение для бизнеса, который хочет расти онлайн.',
          features: [
            'Индивидуальный дизайн 5-8 страниц',
            'Продвинутое техническое SEO',
            'Интегрированный блог',
            'Панель управления',
            'Домен + хостинг 12 месяцев',
            'Интеграция Google Analytics',
            'Обучение работе включено',
          ],
        },
        {
          name: 'Кастомная платформа',
          price: 'От 2000€',
          description: 'Сложные цифровые решения для амбициозного бизнеса.',
          features: [
            '100% кастомный дизайн',
            'Расширенный функционал',
            'Внешние API-интеграции',
            'Полная панель администратора',
            'Приоритетная поддержка 12 мес.',
            'Постоянная SEO-оптимизация',
            'Производительность 95+ PageSpeed',
          ],
        },
      ],
    },
    technologies: {
      title: 'Технологии, которые мы используем',
      items: [
        { name: 'Next.js', category: 'Framework' },
        { name: 'React', category: 'UI' },
        { name: 'TypeScript', category: 'Язык' },
        { name: 'Tailwind CSS', category: 'Стили' },
        { name: 'Vercel', category: 'Хостинг' },
        { name: 'PostgreSQL', category: 'БД' },
        { name: 'Figma', category: 'Дизайн' },
        { name: 'WordPress', category: 'CMS' },
        { name: 'Cloudflare', category: 'CDN' },
        { name: 'Google Analytics', category: 'Аналитика' },
        { name: 'Stripe', category: 'Платежи' },
        { name: 'Resend', category: 'Email' },
      ],
    },
    process: {
      title: 'Как мы создаём ваш сайт',
      subtitle: 'Прозрачный процесс в 4 шага, от идеи до запуска',
      steps: [
        { step: 1, icon: '💬', title: 'Консультация', description: 'Обсуждаем ваши потребности, цели и видение сайта.' },
        { step: 2, icon: '🎨', title: 'Дизайн и прототип', description: 'Создаём визуальные макеты и дорабатываем их с вашим участием.' },
        { step: 3, icon: '💻', title: 'Разработка', description: 'Программируем сайт с использованием современных технологий.' },
        { step: 4, icon: '🚀', title: 'Запуск и поддержка', description: 'Запускаем сайт и обеспечиваем постоянную техническую поддержку.' },
      ],
    },
    trust: {
      title: 'Почему выбирают нас',
      subtitle: 'Доказанные результаты, клиенты по всей Молдове',
      stats: [
        { value: '120+', label: 'Созданных сайтов' },
        { value: '98%', label: 'Довольных клиентов' },
        { value: '2.1с', label: 'Среднее время загрузки' },
        { value: '5★', label: 'Рейтинг Google' },
      ],
    },
    faq: {
      title: 'Часто задаваемые вопросы',
      subtitle: 'Ответы на самые распространённые вопросы о создании сайтов',
      items: [
        { question: 'Сколько стоит сайт в Молдове?', answer: 'Цены варьируются в зависимости от сложности: от 300€ за простой лендинг до 5000€+ за сложные платформы. Предлагаем бесплатную консультацию для определения оптимального бюджета.' },
        { question: 'Сколько времени занимает создание сайта?', answer: 'Простой сайт-визитка создаётся за 2-3 недели. Сложные проекты могут занять 4-8 недель. Соблюдаем согласованные сроки.' },
        { question: 'Включены ли хостинг и домен?', answer: 'Да! Премиум-хостинг на европейских серверах и регистрация домена .md или .com включены бесплатно в первый год.' },
        { question: 'Могу ли я сам обновлять контент?', answer: 'Конечно! Все наши сайты поставляются с интуитивной панелью управления. Также предоставляем бесплатное обучение.' },
        { question: 'Предлагаете ли вы поддержку после запуска?', answer: 'Да, мы предоставляем техническую поддержку 24/7 в первые 3 месяца и опциональные пакеты ежемесячного обслуживания.' },
      ],
    },
    cta: {
      title: 'Готовы запустить <span class="text-[#e8ff00]">свой сайт</span>?',
      description: 'Бесплатная консультация. Персональное предложение в течение 24 часов.',
      button: 'Запросить предложение',
    },
  },
  en: {
    lang: 'en',
    hero: {
      badge: 'Website Development',
      title: 'Websites that <span class="text-[#e8ff00]">convert</span> and grow',
      subtitle: 'We build complete digital presences — from landing pages to complex platforms. Premium design, maximum performance, SEO integrated from day one.',
      cta: 'Get a free quote',
    },
    features: [
      { icon: '🎨', title: 'Custom Design', description: 'Every pixel crafted specifically for your brand. Zero generic templates.' },
      { icon: '⚡', title: '90+ Performance', description: 'Google PageSpeed 90+ guaranteed. Our sites load in under 2 seconds.' },
      { icon: '🔍', title: 'SEO Integrated', description: 'Optimized for search engines from day one. Impeccable technical structure.' },
      { icon: '📱', title: 'Mobile-First', description: 'Perfect experience on any device. 70% of traffic comes from mobile.' },
      { icon: '🔒', title: 'SSL Security', description: 'HTTPS, DDoS protection, daily backups. Your data is always secure.' },
      { icon: '🚀', title: 'Premium Hosting', description: 'Hosting on European servers with 99.9% uptime included for 12 months.' },
    ],
    benefits: {
      title: 'What your business gains',
      subtitle: 'A professional website is not a cost — it\'s the most profitable digital investment',
      items: [
        { title: 'Instant credibility', description: '75% of users judge a company\'s credibility by website design. A professional site turns visitors into paying customers.' },
        { title: 'Google visibility', description: 'An SEO-optimised site appears in the first Google results for your clients\' searches. Free organic traffic, 24/7.' },
        { title: 'Sales around the clock', description: 'Your website works even at 3am. Any customer, at any time, from anywhere in the world can contact or buy from you.' },
        { title: 'Advantage over competitors', description: '60% of small companies in Moldova don\'t have an optimised website. Be first in your industry with an international-level digital presence.' },
      ],
    },
    pricing: {
      title: 'Packages & pricing',
      subtitle: 'Transparent prices, no hidden fees. Choose the right package for your business.',
      plans: [
        {
          name: 'Landing Page',
          price: '€300',
          description: 'Perfect for presenting a specific product or service.',
          features: [
            'Custom 1-page design',
            'Basic SEO optimisation',
            'Contact form',
            'Mobile responsive',
            '.md domain included 1 year',
            'Hosting 6 months included',
          ],
        },
        {
          name: 'Presentation Site',
          price: '€800',
          badge: 'Popular',
          highlighted: true,
          description: 'The complete solution for businesses that want to grow online.',
          features: [
            'Custom 5-8 page design',
            'Advanced technical SEO',
            'Integrated blog',
            'Admin panel',
            'Domain + hosting 12 months',
            'Google Analytics integration',
            'Usage training included',
          ],
        },
        {
          name: 'Custom Platform',
          price: 'From €2,000',
          description: 'Complex digital solutions for ambitious businesses.',
          features: [
            '100% custom design',
            'Advanced functionality',
            'External API integrations',
            'Full admin dashboard',
            'Priority support 12 months',
            'Continuous SEO optimisation',
            '95+ PageSpeed performance',
          ],
        },
      ],
    },
    technologies: {
      title: 'Technologies we use',
      items: [
        { name: 'Next.js', category: 'Framework' },
        { name: 'React', category: 'UI' },
        { name: 'TypeScript', category: 'Language' },
        { name: 'Tailwind CSS', category: 'Styling' },
        { name: 'Vercel', category: 'Hosting' },
        { name: 'PostgreSQL', category: 'Database' },
        { name: 'Figma', category: 'Design' },
        { name: 'WordPress', category: 'CMS' },
        { name: 'Cloudflare', category: 'CDN' },
        { name: 'Google Analytics', category: 'Analytics' },
        { name: 'Stripe', category: 'Payments' },
        { name: 'Resend', category: 'Email' },
      ],
    },
    process: {
      title: 'How we build your website',
      subtitle: 'A transparent 4-step process, from idea to launch',
      steps: [
        { step: 1, icon: '💬', title: 'Consultation', description: 'We discuss your needs, goals and vision for the website.' },
        { step: 2, icon: '🎨', title: 'Design & Prototype', description: 'We create visual mockups and refine them with your feedback.' },
        { step: 3, icon: '💻', title: 'Development', description: 'We code your website using the most modern web technologies.' },
        { step: 4, icon: '🚀', title: 'Launch & Support', description: 'We launch the site and provide ongoing technical support.' },
      ],
    },
    trust: {
      title: 'Why choose us',
      subtitle: 'Proven results, clients across Moldova and Europe',
      stats: [
        { value: '120+', label: 'Websites delivered' },
        { value: '98%', label: 'Happy clients' },
        { value: '2.1s', label: 'Avg load time' },
        { value: '5★', label: 'Google rating' },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to common questions about website development',
      items: [
        { question: 'How much does a website cost?', answer: 'Prices vary by complexity: from €300 for a simple landing page to €5000+ for complex platforms. We offer a free consultation to determine the optimal budget.' },
        { question: 'How long does it take to build a website?', answer: 'A simple presentation website takes 2-3 weeks. Complex projects may take 4-8 weeks. We respect agreed deadlines.' },
        { question: 'Do you include hosting and domain?', answer: 'Yes! Premium hosting on European servers and domain registration are included free for the first year.' },
        { question: 'Can I update the content myself?', answer: 'Absolutely! All our websites come with an intuitive admin panel. We also provide free training.' },
        { question: 'Do you offer support after launch?', answer: 'Yes, we provide 24/7 technical support for the first 3 months and optional monthly maintenance packages.' },
      ],
    },
    cta: {
      title: 'Ready to launch your <span class="text-[#e8ff00]">dream website</span>?',
      description: 'Free consultation. Personalized quote in 24h.',
      button: 'Request a quote now',
    },
  },
}

export default async function CreareWebsitePage({ params }: PageProps) {
  const { lang } = await params
  if (!isValidLang(lang)) notFound()

  const data = PAGE_DATA[lang as Lang]
  return <ServicePageTemplate data={data} />
}
