import type { Lang } from '@/lib/i18n'

/**
 * Textele bannerului, în cele trei limbi ale site-ului.
 *
 * Ținute separat de componentă pentru că sunt text juridic: se revizuiesc
 * împreună cu politica de cookies, nu împreună cu UI-ul.
 */
export interface CookieTexts {
  title: string
  body: string
  acceptAll: string
  rejectAll: string
  settings: string
  save: string
  policyLink: string
  alwaysOn: string
  categories: {
    necessary: { name: string; desc: string }
    analytics: { name: string; desc: string }
  }
}

export const COOKIE_TEXTS: Record<Lang, CookieTexts> = {
  ro: {
    title: 'Cookie-uri pe acest site',
    body: 'Folosim cookie-uri strict necesare pentru ca site-ul să funcționeze. Cu acordul tău am folosi și cookie-uri de analiză, ca să vedem ce pagini sunt utile. Poți refuza — site-ul funcționează la fel.',
    acceptAll: 'Accept',
    rejectAll: 'Refuz',
    settings: 'Personalizează',
    save: 'Salvează alegerea',
    policyLink: 'Politica de cookies',
    alwaysOn: 'Întotdeauna active',
    categories: {
      necessary: {
        name: 'Strict necesare',
        desc: 'Asigură funcționarea site-ului și memorează alegerea ta de aici. Nu pot fi dezactivate, pentru că fără ele site-ul nu poate fi livrat.',
      },
      analytics: {
        name: 'Analiză',
        desc: 'Google Analytics, încărcat prin Google Tag Manager. Ne arată agregat ce pagini sunt vizitate. Dacă refuzi, Google Tag Manager nu se încarcă deloc.',
      },
    },
  },
  ru: {
    title: 'Файлы cookie на этом сайте',
    body: 'Мы используем строго необходимые файлы cookie для работы сайта. С вашего согласия мы также использовали бы аналитические cookie, чтобы понимать, какие страницы полезны. Вы можете отказаться — сайт будет работать так же.',
    acceptAll: 'Принять',
    rejectAll: 'Отклонить',
    settings: 'Настроить',
    save: 'Сохранить выбор',
    policyLink: 'Политика использования cookie',
    alwaysOn: 'Всегда активны',
    categories: {
      necessary: {
        name: 'Строго необходимые',
        desc: 'Обеспечивают работу сайта и запоминают ваш выбор здесь. Их нельзя отключить, так как без них сайт не может быть предоставлен.',
      },
      analytics: {
        name: 'Аналитика',
        desc: 'Google Analytics, загружаемый через Google Tag Manager. Показывает в агрегированном виде, какие страницы посещают. При отказе Google Tag Manager не загружается вовсе.',
      },
    },
  },
  en: {
    title: 'Cookies on this site',
    body: 'We use strictly necessary cookies to make the site work. With your consent we would also use analytics cookies to see which pages are useful. You can decline — the site works the same either way.',
    acceptAll: 'Accept',
    rejectAll: 'Decline',
    settings: 'Customise',
    save: 'Save choice',
    policyLink: 'Cookie policy',
    alwaysOn: 'Always on',
    categories: {
      necessary: {
        name: 'Strictly necessary',
        desc: 'Keep the site working and remember your choice here. They cannot be disabled, because without them the site cannot be delivered.',
      },
      analytics: {
        name: 'Analytics',
        desc: 'Google Analytics, loaded via Google Tag Manager. Shows us in aggregate which pages get visited. If you decline, Google Tag Manager is not loaded at all.',
      },
    },
  },
}
