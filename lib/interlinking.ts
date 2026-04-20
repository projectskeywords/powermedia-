type Lang = 'ro' | 'ru' | 'en'

interface ServiceLink {
  url: string
  anchors: string[]
}

const SERVICE_LINKS: Record<Lang, ServiceLink[]> = {
  ro: [
    {
      url: '/ro/servicii/creare-website',
      anchors: ['creare website', 'site web profesionist', 'dezvoltare web Moldova'],
    },
    {
      url: '/ro/servicii/magazin-online',
      anchors: ['magazin online', 'e-commerce Moldova', 'shop online'],
    },
    {
      url: '/ro/servicii/automatizari-ai',
      anchors: ['automatizări AI', 'inteligență artificială', 'automatizare procese'],
    },
    {
      url: '/ro/servicii/publicitate-google',
      anchors: ['publicitate Google', 'Google Ads Moldova', 'reclame online'],
    },
    {
      url: '/ro/servicii/crm-erp',
      anchors: ['sistem CRM', 'software ERP', 'sistem de gestiune'],
    },
  ],
  ru: [
    {
      url: '/ru/servicii/creare-website',
      anchors: ['создание сайта', 'веб-разработка в Молдове', 'профессиональный сайт'],
    },
    {
      url: '/ru/servicii/magazin-online',
      anchors: ['интернет-магазин', 'e-commerce в Молдове', 'онлайн-торговля'],
    },
    {
      url: '/ru/servicii/automatizari-ai',
      anchors: ['AI-автоматизация', 'искусственный интеллект', 'автоматизация бизнеса'],
    },
    {
      url: '/ru/servicii/publicitate-google',
      anchors: ['реклама в Google', 'Google Ads Молдова', 'контекстная реклама'],
    },
    {
      url: '/ru/servicii/crm-erp',
      anchors: ['CRM-система', 'ERP-программа', 'система управления'],
    },
  ],
  en: [
    {
      url: '/en/servicii/creare-website',
      anchors: ['website development', 'professional web design', 'custom website'],
    },
    {
      url: '/en/servicii/magazin-online',
      anchors: ['online store development', 'e-commerce solutions', 'web shop'],
    },
    {
      url: '/en/servicii/automatizari-ai',
      anchors: ['AI automation', 'artificial intelligence solutions', 'business automation'],
    },
    {
      url: '/en/servicii/publicitate-google',
      anchors: ['Google Ads management', 'PPC advertising', 'Google advertising'],
    },
    {
      url: '/en/servicii/crm-erp',
      anchors: ['CRM system', 'ERP software', 'business management system'],
    },
  ],
}

interface RelatedArticle {
  slug: string
  title: string
}

export function buildInternalLinks(
  content: string,
  lang: Lang,
  relatedArticles: RelatedArticle[] = []
): string {
  const links = SERVICE_LINKS[lang]
  let linkIndex = 0

  let result = content.replace(/\{\{INTERLINK_SERVICE\}\}/g, () => {
    const link = links[linkIndex % links.length]
    const anchor = link.anchors[0]
    linkIndex++
    return `<a href="${link.url}" class="internal-link">${anchor}</a>`
  })

  // Add related article links after first H2 close
  const relatedToShow = relatedArticles.slice(0, 2)
  if (relatedToShow.length > 0) {
    const relatedLabel =
      lang === 'ro' ? 'Citește și' : lang === 'ru' ? 'Читайте также' : 'See also'
    const relatedLinks = relatedToShow
      .map((a) => `<a href="/${lang}/articole/${a.slug}">${a.title}</a>`)
      .join(', ')
    result = result.replace(
      /(<\/h2>)/,
      `$1\n<p class="related-articles"><em>${relatedLabel}: ${relatedLinks}</em></p>\n`
    )
  }

  return result
}
