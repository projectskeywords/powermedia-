import type { Lang } from '@/lib/i18n'
import type { LegalDoc } from '@/components/legal/LegalDocument'
import { COMPANY } from '@/lib/company'

/**
 * Politica de cookies.
 *
 * Lista de mai jos trebuie să corespundă exact cu ce stochează codul:
 * lib/consent.ts (pm_consent), app/api/admin/auth/route.ts (pm_admin) și
 * containerul GTM. Orice tag nou adăugat în GTM se reflectă și aici.
 */
export const COOKIES_DOC: Record<Lang, LegalDoc> = {
  ro: {
    title: 'Politica de cookies',
    subtitle: 'Ce stocăm pe dispozitivul tău, de ce, și cum te răzgândești.',
    updatedLabel: 'Ultima actualizare:',
    sections: [
      {
        heading: '1. Pe scurt',
        blocks: [
          'Site-ul funcționează complet fără cookie-uri opționale. Singurele lucruri pe care le stocăm fără să te întrebăm sunt cele fără de care site-ul nu poate fi livrat — și niciunul dintre ele nu te urmărește.',
          'Nu se încarcă niciun instrument de analiză sau de publicitate până când nu apeși „Accept". Dacă refuzi sau ignori bannerul, Google Tag Manager nu este descărcat deloc.',
        ],
      },
      {
        heading: '2. Ce sunt cookie-urile și tehnologiile similare',
        blocks: [
          'Un cookie este un fișier mic pe care un site îl salvează în browserul tău, ca să își amintească ceva între pagini sau între vizite. Browserul îl trimite înapoi la fiecare cerere.',
          'Există și alte tehnologii cu efect similar, cum este stocarea locală (localStorage) — datele rămân în browser, dar nu sunt trimise automat către server. Legea le tratează la fel, pentru că amândouă înseamnă stocarea de informații pe dispozitivul tău. În această politică le numim, împreună, cookie-uri.',
        ],
      },
      {
        heading: '3. Ce folosim, concret',
        blocks: [
          'Strict necesare — se activează întotdeauna, nu îți cerem acordul pentru ele, pentru că fără ele site-ul nu poate funcționa:',
          {
            list: [
              'pm_consent (stocare locală, 12 luni) — reține exact alegerea ta de la bannerul de cookie-uri, ca să nu te întrebăm la fiecare pagină. Conține doar categoriile acceptate, momentul alegerii și versiunea politicii. Ironia e reală: ca să reținem că ai refuzat, trebuie să stocăm ceva. După 12 luni expiră și te întrebăm din nou.',
              'pm_admin (cookie, 7 zile) — sesiunea de administrare a site-ului. Se creează doar dacă cineva se autentifică în panoul de administrare. Ca vizitator obișnuit nu îl vei avea niciodată.',
            ],
          },
          'De analiză — se încarcă doar după ce apeși „Accept". Le poți refuza sau retrage oricând, fără nicio consecință asupra funcționării site-ului:',
          {
            list: [
              '_ga (cookie, 2 ani) — plasat de Google Analytics prin Google Tag Manager. Deosebește vizitatorii unul de altul, printr-un identificator aleatoriu.',
              '_ga_<identificator> (cookie, 2 ani) — plasat de Google Analytics. Reține starea sesiunii curente.',
            ],
          },
          'De marketing — nu folosim. Nu avem pe site pixeli de publicitate, remarketing sau butoane de rețele sociale care să te urmărească. Dacă asta se schimbă, actualizăm această pagină și îți cerem acordul din nou, înainte de a încărca ceva.',
        ],
      },
      {
        heading: '4. Cine mai vede aceste date',
        blocks: [
          'Cookie-urile strict necesare sunt citite doar de noi. Cookie-urile de analiză sunt plasate de Google LLC, care acționează ca furnizor al nostru; datele colectate prin ele ajung la Google și pot fi transferate în afara Republicii Moldova.',
          'Detaliile despre furnizori, transferuri și drepturile tale sunt în Politica de confidențialitate.',
        ],
      },
      {
        heading: '5. Cum îți schimbi alegerea',
        blocks: [
          'Folosește panoul de mai jos — poți accepta, refuza sau retrage complet consimțământul, oricând. Retragerea e la fel de simplă ca acordul: un singur clic, în același loc.',
          'Dacă retragi consimțământul, Google Tag Manager nu se mai încarcă la următoarea încărcare a paginii. Cookie-urile _ga plasate anterior de Google rămân însă în browserul tău până expiră; le poți șterge din setările browserului, secțiunea de date ale site-urilor.',
        ],
      },
      {
        heading: '6. Controlul din browser',
        blocks: [
          'Independent de acest site, browserul tău îți permite să blochezi sau să ștergi cookie-urile pentru orice site. Găsești opțiunile în setările browserului, de regulă la secțiunea „Confidențialitate și securitate".',
          'Reține că blocarea totală a cookie-urilor poate afecta funcționarea multor site-uri — pe al nostru, nu: fără cookie-uri opționale funcționează normal.',
        ],
      },
      {
        heading: '7. Întrebări',
        blocks: [
          `Dacă ceva de aici nu e clar, scrie-ne la ${COMPANY.email} și îți explicăm.`,
        ],
      },
    ],
  },

  ru: {
    title: 'Политика использования cookie',
    subtitle: 'Что мы храним на вашем устройстве, зачем и как передумать.',
    updatedLabel: 'Последнее обновление:',
    sections: [
      {
        heading: '1. Кратко',
        blocks: [
          'Сайт полностью работает без необязательных cookie. Единственное, что мы храним, не спрашивая вас, — это то, без чего сайт не может быть предоставлен, и ничто из этого вас не отслеживает.',
          'Никакие инструменты аналитики или рекламы не загружаются, пока вы не нажмёте «Принять». Если вы откажетесь или проигнорируете баннер, Google Tag Manager не загружается вовсе.',
        ],
      },
      {
        heading: '2. Что такое cookie и схожие технологии',
        blocks: [
          'Cookie — это небольшой файл, который сайт сохраняет в вашем браузере, чтобы запомнить что-либо между страницами или визитами. Браузер отправляет его обратно при каждом запросе.',
          'Существуют и другие технологии со схожим эффектом, например локальное хранилище (localStorage) — данные остаются в браузере, но не отправляются на сервер автоматически. Закон относится к ним одинаково, поскольку в обоих случаях речь идёт о хранении информации на вашем устройстве. В этой политике мы называем их вместе — cookie.',
        ],
      },
      {
        heading: '3. Что именно мы используем',
        blocks: [
          'Строго необходимые — включены всегда, согласия на них мы не спрашиваем, поскольку без них сайт не может работать:',
          {
            list: [
              'pm_consent (локальное хранилище, 12 месяцев) — хранит именно ваш выбор в баннере cookie, чтобы не спрашивать на каждой странице. Содержит только принятые категории, момент выбора и версию политики. Ирония настоящая: чтобы запомнить ваш отказ, нам нужно что-то сохранить. Через 12 месяцев запись истекает, и мы спросим снова.',
              'pm_admin (cookie, 7 дней) — сессия администрирования сайта. Создаётся, только если кто-то входит в панель администратора. У обычного посетителя его никогда не будет.',
            ],
          },
          'Аналитические — загружаются только после нажатия «Принять». Вы можете отклонить их или отозвать согласие в любой момент, без каких-либо последствий для работы сайта:',
          {
            list: [
              '_ga (cookie, 2 года) — устанавливается Google Analytics через Google Tag Manager. Различает посетителей с помощью случайного идентификатора.',
              '_ga_<идентификатор> (cookie, 2 года) — устанавливается Google Analytics. Хранит состояние текущей сессии.',
            ],
          },
          'Маркетинговые — не используем. На сайте нет рекламных пикселей, ремаркетинга или кнопок соцсетей, которые бы вас отслеживали. Если это изменится, мы обновим эту страницу и запросим ваше согласие заново, прежде чем что-либо загружать.',
        ],
      },
      {
        heading: '4. Кто ещё видит эти данные',
        blocks: [
          'Строго необходимые cookie читаем только мы. Аналитические cookie устанавливает Google LLC, выступающая нашим поставщиком; собранные через них данные поступают в Google и могут передаваться за пределы Республики Молдова.',
          'Подробности о поставщиках, передачах и ваших правах — в Политике конфиденциальности.',
        ],
      },
      {
        heading: '5. Как изменить свой выбор',
        blocks: [
          'Используйте панель ниже — вы можете принять, отклонить или полностью отозвать согласие в любой момент. Отзыв так же прост, как и согласие: один клик, в том же месте.',
          'Если вы отзовёте согласие, Google Tag Manager перестанет загружаться при следующей загрузке страницы. Однако ранее установленные Google файлы _ga остаются в вашем браузере до истечения срока; их можно удалить в настройках браузера, в разделе данных сайтов.',
        ],
      },
      {
        heading: '6. Управление через браузер',
        blocks: [
          'Независимо от этого сайта, ваш браузер позволяет блокировать или удалять cookie для любого сайта. Соответствующие опции находятся в настройках браузера, обычно в разделе «Конфиденциальность и безопасность».',
          'Учтите, что полная блокировка cookie может нарушить работу многих сайтов — но не нашего: без необязательных cookie он работает нормально.',
        ],
      },
      {
        heading: '7. Вопросы',
        blocks: [
          `Если что-то здесь непонятно, напишите нам на ${COMPANY.email}, и мы объясним.`,
        ],
      },
    ],
  },

  en: {
    title: 'Cookie Policy',
    subtitle: 'What we store on your device, why, and how to change your mind.',
    updatedLabel: 'Last updated:',
    sections: [
      {
        heading: '1. In short',
        blocks: [
          'The site works entirely without optional cookies. The only things we store without asking are those without which the site cannot be delivered — and none of them track you.',
          'No analytics or advertising tool loads until you press "Accept". If you decline or ignore the banner, Google Tag Manager is not downloaded at all.',
        ],
      },
      {
        heading: '2. What cookies and similar technologies are',
        blocks: [
          'A cookie is a small file that a website saves in your browser to remember something between pages or visits. The browser sends it back with every request.',
          'There are other technologies with a similar effect, such as local storage (localStorage) — the data stays in the browser but is not sent to the server automatically. The law treats them the same, because both mean storing information on your device. In this policy we call them all cookies.',
        ],
      },
      {
        heading: '3. What we actually use',
        blocks: [
          'Strictly necessary — always on, we do not ask for consent for these, because without them the site cannot function:',
          {
            list: [
              'pm_consent (local storage, 12 months) — remembers exactly what you chose on the cookie banner, so we do not ask on every page. It contains only the accepted categories, the moment of the choice and the policy version. The irony is real: to remember that you declined, we have to store something. After 12 months it expires and we ask again.',
              'pm_admin (cookie, 7 days) — the site administration session. Created only if someone logs into the admin panel. As an ordinary visitor you will never have it.',
            ],
          },
          'Analytics — loaded only after you press "Accept". You can decline or withdraw at any time, with no consequences for how the site works:',
          {
            list: [
              '_ga (cookie, 2 years) — set by Google Analytics via Google Tag Manager. Distinguishes visitors from one another using a random identifier.',
              '_ga_<identifier> (cookie, 2 years) — set by Google Analytics. Holds the state of the current session.',
            ],
          },
          'Marketing — we do not use any. There are no advertising pixels, remarketing tags or social network buttons on this site that would track you. If that changes, we will update this page and ask for your consent again before loading anything.',
        ],
      },
      {
        heading: '4. Who else sees this data',
        blocks: [
          'Strictly necessary cookies are read only by us. Analytics cookies are set by Google LLC, acting as our provider; the data collected through them reaches Google and may be transferred outside the Republic of Moldova.',
          'Details about providers, transfers and your rights are in the Privacy Policy.',
        ],
      },
      {
        heading: '5. How to change your choice',
        blocks: [
          'Use the panel below — you can accept, decline or fully withdraw consent at any time. Withdrawing is as simple as consenting: one click, in the same place.',
          'If you withdraw consent, Google Tag Manager stops loading on the next page load. However, _ga cookies previously set by Google remain in your browser until they expire; you can delete them from your browser settings, under site data.',
        ],
      },
      {
        heading: '6. Browser controls',
        blocks: [
          'Independently of this site, your browser lets you block or delete cookies for any website. You will find the options in your browser settings, usually under "Privacy and security".',
          'Note that blocking all cookies can break many websites — but not ours: without optional cookies it works normally.',
        ],
      },
      {
        heading: '7. Questions',
        blocks: [
          `If anything here is unclear, write to us at ${COMPANY.email} and we will explain.`,
        ],
      },
    ],
  },
}
