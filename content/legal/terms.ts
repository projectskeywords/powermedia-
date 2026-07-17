import type { Lang } from '@/lib/i18n'
import type { LegalDoc } from '@/components/legal/LegalDocument'
import { COMPANY } from '@/lib/company'

export const TERMS_DOC: Record<Lang, LegalDoc> = {
  ro: {
    title: 'Termeni și condiții',
    subtitle: `Regulile de utilizare a site-ului ${COMPANY.site}.`,
    updatedLabel: 'Ultima actualizare:',
    sections: [
      {
        heading: '1. Cine administrează acest site',
        blocks: [
          `Site-ul ${COMPANY.site} este administrat de ${COMPANY.legalName}, IDNO ${COMPANY.idno}, cu sediul la ${COMPANY.registeredAddress}, care își desfășoară activitatea sub marca ${COMPANY.brand}.`,
          'Prin utilizarea site-ului accepți acești termeni. Dacă nu ești de acord cu ei, te rugăm să nu îl folosești.',
        ],
      },
      {
        heading: '2. Ce este și ce nu este acest site',
        blocks: [
          'Site-ul prezintă serviciile noastre și publică articole pe teme digitale. Are caracter informativ.',
          'Informațiile de aici, inclusiv orice indicații de preț, nu constituie o ofertă fermă în sensul legii. Un raport contractual între noi ia naștere doar printr-un contract semnat sau printr-o comandă confirmată expres în scris de noi.',
        ],
      },
      {
        heading: '3. Utilizarea site-ului',
        blocks: [
          'Poți folosi site-ul liber, în scopuri legitime. Nu este permis:',
          {
            list: [
              'să încerci să obții acces neautorizat la site, la panoul de administrare sau la infrastructura care îl susține;',
              'să îl folosești pentru a distribui programe dăunătoare sau conținut ilegal;',
              'să îl supui unei sarcini automate excesive, care afectează funcționarea pentru ceilalți;',
              'să extragi sistematic conținutul în scopuri comerciale, fără acordul nostru scris.',
            ],
          },
        ],
      },
      {
        heading: '4. Drepturi de autor',
        blocks: [
          'Textele, imaginile, elementele grafice, codul și structura site-ului ne aparțin sau le folosim în baza unor licențe. Sunt protejate de legislația privind dreptul de autor.',
          'Poți cita fragmente scurte din articolele noastre, cu indicarea sursei și un link către pagina originală. Pentru orice reproducere de amploare mai mare, scrie-ne întâi.',
          'Mărcile, denumirile și logourile terților afișate pe site aparțin titularilor lor și sunt folosite doar în scop descriptiv.',
        ],
      },
      {
        heading: '5. Articolele de pe site',
        blocks: [
          'O parte dintre articolele publicate în secțiunea de articole sunt redactate cu ajutorul unor instrumente de inteligență artificială și revizuite ulterior de noi.',
          'Le publicăm cu bună-credință, dar au caracter general și informativ: nu sunt consultanță juridică, fiscală, tehnică sau de afaceri adaptată situației tale. Înainte de a lua o decizie pe baza lor, verifică informația sau întreabă-ne direct.',
        ],
      },
      {
        heading: '6. Disponibilitate și limitarea răspunderii',
        blocks: [
          'Depunem eforturi rezonabile ca site-ul să fie disponibil și informația corectă și actuală, dar nu garantăm funcționarea neîntreruptă sau lipsită de erori. Putem modifica sau retrage oricând conținut, fără preaviz.',
          'În limitele permise de lege, nu răspundem pentru prejudicii indirecte rezultate din utilizarea sau imposibilitatea de a utiliza site-ul. Nimic din acești termeni nu limitează răspunderea noastră în cazurile în care legea nu permite limitarea ei.',
        ],
      },
      {
        heading: '7. Linkuri către alte site-uri',
        blocks: [
          'Site-ul poate conține linkuri către site-uri terțe. Nu le controlăm conținutul și nu răspundem pentru el. Un link nu înseamnă că le susținem conținutul.',
        ],
      },
      {
        heading: '8. Datele tale cu caracter personal',
        blocks: [
          'Prelucrarea datelor tale este descrisă separat, în Politica de confidențialitate și în Politica de cookies. Acele documente au prioritate față de acești termeni în tot ce privește datele cu caracter personal.',
        ],
      },
      {
        heading: '9. Modificarea termenilor',
        blocks: [
          'Putem actualiza acești termeni. Versiunea aplicabilă este cea publicată aici la momentul în care folosești site-ul, iar data ultimei actualizări este indicată la început.',
        ],
      },
      {
        heading: '10. Legea aplicabilă',
        blocks: [
          'Acești termeni sunt guvernați de legislația Republicii Moldova. Litigiile se soluționează de instanțele competente din Republica Moldova, dacă nu am convenit altfel în scris.',
          'Versiunea în limba română a acestor termeni prevalează în caz de neconcordanță între traduceri.',
        ],
      },
      {
        heading: '11. Contact',
        blocks: [
          {
            list: [
              `${COMPANY.legalName}, IDNO ${COMPANY.idno}`,
              `Adresa juridică: ${COMPANY.registeredAddress}`,
              `Adresa de corespondență: ${COMPANY.officeAddress}`,
              `E-mail: ${COMPANY.email}`,
              `Telefon: ${COMPANY.phone}`,
            ],
          },
        ],
      },
    ],
  },

  ru: {
    title: 'Условия использования',
    subtitle: `Правила пользования сайтом ${COMPANY.site}.`,
    updatedLabel: 'Последнее обновление:',
    sections: [
      {
        heading: '1. Кто управляет этим сайтом',
        blocks: [
          `Сайтом ${COMPANY.site} управляет ${COMPANY.legalName}, IDNO ${COMPANY.idno}, с юридическим адресом ${COMPANY.registeredAddress}, осуществляющая деятельность под маркой ${COMPANY.brand}.`,
          'Пользуясь сайтом, вы принимаете настоящие условия. Если вы с ними не согласны, пожалуйста, не используйте его.',
        ],
      },
      {
        heading: '2. Что представляет собой этот сайт',
        blocks: [
          'Сайт представляет наши услуги и публикует статьи на цифровую тематику. Он носит информационный характер.',
          'Размещённая здесь информация, включая любые указания цен, не является твёрдой офертой в смысле закона. Договорные отношения между нами возникают только на основании подписанного договора или заказа, прямо подтверждённого нами в письменной форме.',
        ],
      },
      {
        heading: '3. Использование сайта',
        blocks: [
          'Вы можете свободно пользоваться сайтом в законных целях. Не допускается:',
          {
            list: [
              'пытаться получить несанкционированный доступ к сайту, панели администрирования или поддерживающей его инфраструктуре;',
              'использовать его для распространения вредоносных программ или незаконного контента;',
              'создавать чрезмерную автоматическую нагрузку, влияющую на работу сайта для других;',
              'систематически извлекать контент в коммерческих целях без нашего письменного согласия.',
            ],
          },
        ],
      },
      {
        heading: '4. Авторские права',
        blocks: [
          'Тексты, изображения, графические элементы, код и структура сайта принадлежат нам либо используются нами на основании лицензий. Они защищены законодательством об авторском праве.',
          'Вы можете цитировать короткие фрагменты наших статей с указанием источника и ссылкой на оригинальную страницу. Для более объёмного воспроизведения сначала напишите нам.',
          'Товарные знаки, наименования и логотипы третьих лиц, отображаемые на сайте, принадлежат их правообладателям и используются исключительно в описательных целях.',
        ],
      },
      {
        heading: '5. Статьи на сайте',
        blocks: [
          'Часть статей, публикуемых в разделе статей, подготовлена с использованием инструментов искусственного интеллекта и впоследствии проверена нами.',
          'Мы публикуем их добросовестно, однако они носят общий информационный характер: это не юридическая, налоговая, техническая или бизнес-консультация, адаптированная к вашей ситуации. Прежде чем принимать решение на их основе, проверьте информацию или спросите нас напрямую.',
        ],
      },
      {
        heading: '6. Доступность и ограничение ответственности',
        blocks: [
          'Мы прилагаем разумные усилия для доступности сайта и точности информации, но не гарантируем бесперебойную или безошибочную работу. Мы вправе в любой момент изменить или удалить контент без предварительного уведомления.',
          'В пределах, допускаемых законом, мы не несём ответственности за косвенный ущерб, возникший из использования или невозможности использования сайта. Ничто в настоящих условиях не ограничивает нашу ответственность в случаях, когда закон этого не допускает.',
        ],
      },
      {
        heading: '7. Ссылки на другие сайты',
        blocks: [
          'Сайт может содержать ссылки на сторонние сайты. Мы не контролируем их содержание и не несём за него ответственности. Наличие ссылки не означает, что мы поддерживаем их содержание.',
        ],
      },
      {
        heading: '8. Ваши персональные данные',
        blocks: [
          'Обработка ваших данных описана отдельно — в Политике конфиденциальности и Политике использования cookie. Эти документы имеют приоритет над настоящими условиями во всём, что касается персональных данных.',
        ],
      },
      {
        heading: '9. Изменение условий',
        blocks: [
          'Мы можем обновлять настоящие условия. Применимой является версия, опубликованная здесь на момент использования вами сайта; дата последнего обновления указана в начале.',
        ],
      },
      {
        heading: '10. Применимое право',
        blocks: [
          'Настоящие условия регулируются законодательством Республики Молдова. Споры разрешаются компетентными судами Республики Молдова, если мы письменно не договорились об ином.',
          'В случае расхождений между переводами преимущественную силу имеет версия на румынском языке.',
        ],
      },
      {
        heading: '11. Контакты',
        blocks: [
          {
            list: [
              `${COMPANY.legalName}, IDNO ${COMPANY.idno}`,
              `Юридический адрес: ${COMPANY.registeredAddress}`,
              `Адрес для корреспонденции: ${COMPANY.officeAddress}`,
              `Эл. почта: ${COMPANY.email}`,
              `Телефон: ${COMPANY.phone}`,
            ],
          },
        ],
      },
    ],
  },

  en: {
    title: 'Terms and Conditions',
    subtitle: `The rules for using the ${COMPANY.site} website.`,
    updatedLabel: 'Last updated:',
    sections: [
      {
        heading: '1. Who runs this site',
        blocks: [
          `The ${COMPANY.site} website is operated by ${COMPANY.legalName}, IDNO ${COMPANY.idno}, with its registered office at ${COMPANY.registeredAddress}, trading under the ${COMPANY.brand} brand.`,
          'By using the site you accept these terms. If you do not agree with them, please do not use it.',
        ],
      },
      {
        heading: '2. What this site is and is not',
        blocks: [
          'The site presents our services and publishes articles on digital topics. It is informational in nature.',
          'The information here, including any price indications, does not constitute a binding offer in the legal sense. A contractual relationship between us arises only through a signed contract or an order expressly confirmed by us in writing.',
        ],
      },
      {
        heading: '3. Using the site',
        blocks: [
          'You may use the site freely, for legitimate purposes. It is not permitted to:',
          {
            list: [
              'attempt to gain unauthorised access to the site, the admin panel or the infrastructure behind it;',
              'use it to distribute malware or unlawful content;',
              'subject it to excessive automated load that affects its operation for others;',
              'systematically extract its content for commercial purposes without our written consent.',
            ],
          },
        ],
      },
      {
        heading: '4. Copyright',
        blocks: [
          'The texts, images, graphics, code and structure of the site belong to us or are used by us under licence. They are protected by copyright law.',
          'You may quote short excerpts from our articles, citing the source and linking to the original page. For any larger reproduction, write to us first.',
          'Third-party trade marks, names and logos shown on the site belong to their owners and are used for descriptive purposes only.',
        ],
      },
      {
        heading: '5. Articles on the site',
        blocks: [
          'Some of the articles published in the articles section are drafted with the help of artificial intelligence tools and subsequently reviewed by us.',
          'We publish them in good faith, but they are general and informational: they are not legal, tax, technical or business advice tailored to your situation. Before making a decision based on them, verify the information or ask us directly.',
        ],
      },
      {
        heading: '6. Availability and limitation of liability',
        blocks: [
          'We make reasonable efforts to keep the site available and the information accurate and current, but we do not guarantee uninterrupted or error-free operation. We may change or withdraw content at any time, without notice.',
          'To the extent permitted by law, we are not liable for indirect damages arising from the use of, or inability to use, the site. Nothing in these terms limits our liability in cases where the law does not allow it to be limited.',
        ],
      },
      {
        heading: '7. Links to other sites',
        blocks: [
          'The site may contain links to third-party websites. We do not control their content and are not responsible for it. A link does not mean we endorse their content.',
        ],
      },
      {
        heading: '8. Your personal data',
        blocks: [
          'The processing of your data is described separately, in the Privacy Policy and the Cookie Policy. Those documents take precedence over these terms in everything concerning personal data.',
        ],
      },
      {
        heading: '9. Changes to these terms',
        blocks: [
          'We may update these terms. The applicable version is the one published here at the time you use the site, and the date of the last update is shown at the top.',
        ],
      },
      {
        heading: '10. Governing law',
        blocks: [
          'These terms are governed by the law of the Republic of Moldova. Disputes are settled by the competent courts of the Republic of Moldova, unless we have agreed otherwise in writing.',
          'In case of discrepancy between translations, the Romanian version of these terms prevails.',
        ],
      },
      {
        heading: '11. Contact',
        blocks: [
          {
            list: [
              `${COMPANY.legalName}, IDNO ${COMPANY.idno}`,
              `Registered address: ${COMPANY.registeredAddress}`,
              `Correspondence address: ${COMPANY.officeAddress}`,
              `Email: ${COMPANY.email}`,
              `Phone: ${COMPANY.phone}`,
            ],
          },
        ],
      },
    ],
  },
}
