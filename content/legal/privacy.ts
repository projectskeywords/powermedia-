import type { Lang } from '@/lib/i18n'
import type { LegalDoc } from '@/components/legal/LegalDocument'
import { COMPANY, DPA, CONTACT_RETENTION_MONTHS } from '@/lib/company'

/**
 * Politica de confidențialitate.
 *
 * Cele trei versiuni trebuie să spună același lucru. La orice modificare de
 * fond se actualizează toate trei simultan și se incrementează
 * LEGAL_LAST_UPDATED din lib/company.ts.
 */
export const PRIVACY_DOC: Record<Lang, LegalDoc> = {
  ro: {
    title: 'Politica de confidențialitate',
    subtitle: `Cum colectează, folosește și protejează ${COMPANY.legalName} datele tale cu caracter personal.`,
    updatedLabel: 'Ultima actualizare:',
    sections: [
      {
        heading: '1. Cine este operatorul',
        blocks: [
          `Operatorul datelor tale cu caracter personal este ${COMPANY.legalName}, persoană juridică înregistrată în Republica Moldova, IDNO ${COMPANY.idno}, care operează site-ul ${COMPANY.site} sub marca ${COMPANY.brand}.`,
          {
            list: [
              `Adresa juridică: ${COMPANY.registeredAddress}`,
              `Adresa de corespondență: ${COMPANY.officeAddress}`,
              `E-mail: ${COMPANY.email}`,
              `Telefon: ${COMPANY.phone}`,
            ],
          },
          `Pentru orice întrebare privind datele tale sau pentru exercitarea drepturilor descrise mai jos, scrie la ${COMPANY.email}. Răspundem în cel mult 30 de zile.`,
        ],
      },
      {
        heading: '2. Cadrul legal aplicabil',
        blocks: [
          'Prelucrăm datele cu caracter personal în conformitate cu Legea nr. 133/2011 privind protecția datelor cu caracter personal, iar începând cu 23 august 2026 în conformitate cu Legea nr. 195 din 25 iulie 2024 privind protecția datelor cu caracter personal, care transpune integral Regulamentul (UE) 2016/679 (GDPR).',
          'Această politică este scrisă pentru a respecta cerințele Legii nr. 195/2024 încă de la publicare, chiar dacă unele dintre ele devin obligatorii de la 23 august 2026.',
        ],
      },
      {
        heading: '3. Ce date colectăm și de ce',
        blocks: [
          'Colectăm doar datele de care avem efectiv nevoie. Nu cumpărăm baze de date și nu colectăm date despre tine din alte surse.',
          'Formularul de contact. Când ne scrii prin formularul de pe site, colectăm:',
          {
            list: [
              'numele pe care îl indici — ca să știm cui răspundem;',
              'numărul de telefon — este câmp obligatoriu, pentru că majoritatea solicitărilor se rezolvă mai repede printr-un apel;',
              'adresa de e-mail — opțională, o folosim doar dacă preferi răspuns scris;',
              'conținutul mesajului tău și limba în care ne-ai scris.',
            ],
          },
          'Aceste date ne sunt trimise prin e-mail și ajung în căsuța noastră poștală. Nu le stocăm într-o bază de date separată și nu le folosim pentru a-ți trimite comunicări comerciale nesolicitate.',
          'Statistici de utilizare (doar cu acordul tău). Dacă accepți cookie-urile de analiză, Google Analytics colectează date despre modul în care este folosit site-ul: paginile vizitate, durata vizitei, tipul dispozitivului și adresa IP. Dacă refuzi, Google Tag Manager nu se încarcă deloc, iar aceste date nu sunt colectate. Detaliile sunt în Politica de cookies.',
          'Jurnale tehnice ale serverului. Furnizorul nostru de găzduire înregistrează automat adresa IP, momentul cererii și tipul browserului, pentru funcționarea și securitatea site-ului. Aceste jurnale sunt necesare pentru a livra site-ul și pentru a detecta abuzuri.',
        ],
      },
      {
        heading: '4. Temeiul legal al prelucrării',
        blocks: [
          'Fiecare prelucrare are un temei legal distinct:',
          {
            list: [
              'Mesajele din formularul de contact — consimțământul tău, exprimat prin bifarea căsuței de la formular. Îl poți retrage oricând, scriindu-ne la adresa de mai sus; retragerea nu afectează legalitatea prelucrării de dinaintea retragerii.',
              'Cookie-urile de analiză — consimțământul tău, exprimat prin bannerul de cookie-uri. Îl poți retrage oricând din Politica de cookies.',
              'Cookie-urile strict necesare și jurnalele serverului — interesul nostru legitim de a livra un site funcțional și securizat. Fără ele site-ul nu poate fi furnizat.',
            ],
          },
        ],
      },
      {
        heading: '5. Cui transmitem datele',
        blocks: [
          'Nu vindem datele tale. Nu le transmitem nimănui în scopuri de marketing. Le transmitem doar furnizorilor care ne ajută să operăm site-ul, fiecare prelucrându-le exclusiv conform instrucțiunilor noastre:',
          {
            list: [
              'Vercel Inc. (SUA) — găzduirea site-ului. Procesează jurnalele tehnice și, tranzitoriu, conținutul formularului.',
              'Resend (Resend, Inc., SUA) — livrarea e-mailurilor trimise din formularul de contact.',
              'Google LLC (SUA / Irlanda) — Google Analytics și Google Tag Manager, doar dacă ai acceptat cookie-urile de analiză.',
              'Google LLC — serviciul de e-mail prin care primim mesajele, folosit ca alternativă tehnică la Resend.',
            ],
          },
          'Putem transmite date și autorităților publice, dacă legea ne obligă și în limitele acelei obligații.',
        ],
      },
      {
        heading: '6. Transferuri în afara Republicii Moldova',
        blocks: [
          'Furnizorii de mai sus sunt stabiliți în Statele Unite ale Americii și în Uniunea Europeană, ceea ce înseamnă că datele tale sunt transferate în afara Republicii Moldova.',
          'Aceste transferuri se realizează în temeiul clauzelor contractuale standard încheiate cu fiecare furnizor și al garanțiilor oferite de aceștia. Poți solicita informații despre garanțiile aplicabile scriindu-ne la adresa de contact.',
        ],
      },
      {
        heading: '7. Cât timp păstrăm datele',
        blocks: [
          {
            list: [
              `Mesajele din formularul de contact — cel mult ${CONTACT_RETENTION_MONTHS} de luni de la ultima comunicare cu tine, după care sunt șterse. Dacă devii client, datele relevante se păstrează pe durata relației contractuale și ulterior conform termenelor legale de arhivare.`,
              'Datele de analiză — conform termenelor de păstrare configurate în Google Analytics, cel mult 14 luni.',
              'Jurnalele tehnice ale serverului — perioade scurte, stabilite de furnizorul de găzduire, de regulă sub 30 de zile.',
              'Alegerea ta privind cookie-urile — 12 luni, după care te întrebăm din nou.',
            ],
          },
        ],
      },
      {
        heading: '8. Drepturile tale',
        blocks: [
          'În legătură cu datele tale cu caracter personal ai următoarele drepturi:',
          {
            list: [
              'dreptul de acces — să afli dacă prelucrăm date despre tine și să primești o copie a lor;',
              'dreptul la rectificare — să corectăm datele inexacte sau să completăm datele incomplete;',
              'dreptul la ștergere — să ștergem datele tale, când nu mai avem un motiv legitim să le păstrăm;',
              'dreptul la restricționarea prelucrării — să suspendăm prelucrarea, în anumite situații;',
              'dreptul la portabilitate — să primești datele într-un format structurat, folosit în mod curent și citibil automat;',
              'dreptul la opoziție — să te opui prelucrării întemeiate pe interesul nostru legitim;',
              'dreptul de a-ți retrage consimțământul, oricând, la fel de ușor cum l-ai dat;',
              'dreptul de a nu fi supus unei decizii bazate exclusiv pe prelucrare automatizată — pe acest site nu luăm astfel de decizii.',
            ],
          },
          `Pentru a-ți exercita oricare dintre aceste drepturi, scrie-ne la ${COMPANY.email}. Îți răspundem în cel mult 30 de zile. Exercitarea drepturilor este gratuită. Îți putem cere să îți confirmi identitatea, ca să nu dezvăluim datele tale altcuiva.`,
        ],
      },
      {
        heading: '9. Dreptul de a depune o plângere',
        blocks: [
          `Dacă apreciezi că îți încălcăm drepturile, te rugăm să ne scrii mai întâi nouă — de cele mai multe ori putem rezolva problema direct. Ai însă oricând dreptul să te adresezi autorității de supraveghere:`,
          {
            list: [
              `${DPA.nameRo} (${DPA.abbr})`,
              DPA.address,
              DPA.site,
            ],
          },
          'Ai de asemenea dreptul de a te adresa instanței de judecată.',
        ],
      },
      {
        heading: '10. Securitatea datelor',
        blocks: [
          'Site-ul este servit exclusiv prin conexiune criptată (HTTPS). Accesul la mesajele primite prin formular este limitat la persoanele care au nevoie de ele pentru a-ți răspunde. Furnizorii noștri sunt aleși dintre cei care oferă garanții privind securitatea prelucrării.',
          'Niciun sistem nu este perfect sigur. Dacă are loc o încălcare a securității care îți poate afecta drepturile, te informăm și notificăm autoritatea, conform legii.',
        ],
      },
      {
        heading: '11. Copiii',
        blocks: [
          'Site-ul și serviciile noastre se adresează companiilor și persoanelor adulte. Nu colectăm intenționat date de la copii. Dacă afli că un copil ne-a transmis date, scrie-ne și le ștergem.',
        ],
      },
      {
        heading: '12. Modificări ale acestei politici',
        blocks: [
          'Putem actualiza această politică atunci când se schimbă modul în care lucrăm sau cerințele legale. Versiunea în vigoare este întotdeauna cea publicată pe această pagină, iar data ultimei actualizări este indicată la început.',
          'Dacă modificarea este semnificativă, te anunțăm vizibil pe site, iar dacă privește cookie-urile, îți vom cere din nou acordul.',
        ],
      },
    ],
  },

  ru: {
    title: 'Политика конфиденциальности',
    subtitle: `Как ${COMPANY.legalName} собирает, использует и защищает ваши персональные данные.`,
    updatedLabel: 'Последнее обновление:',
    sections: [
      {
        heading: '1. Кто является оператором',
        blocks: [
          `Оператором ваших персональных данных является ${COMPANY.legalName}, юридическое лицо, зарегистрированное в Республике Молдова, IDNO ${COMPANY.idno}, которое управляет сайтом ${COMPANY.site} под маркой ${COMPANY.brand}.`,
          {
            list: [
              `Юридический адрес: ${COMPANY.registeredAddress}`,
              `Адрес для корреспонденции: ${COMPANY.officeAddress}`,
              `Эл. почта: ${COMPANY.email}`,
              `Телефон: ${COMPANY.phone}`,
            ],
          },
          `По любым вопросам о ваших данных или для осуществления прав, описанных ниже, пишите на ${COMPANY.email}. Мы отвечаем не позднее чем в течение 30 дней.`,
        ],
      },
      {
        heading: '2. Применимое законодательство',
        blocks: [
          'Мы обрабатываем персональные данные в соответствии с Законом № 133/2011 о защите персональных данных, а с 23 августа 2026 года — в соответствии с Законом № 195 от 25 июля 2024 года о защите персональных данных, который полностью транспонирует Регламент (ЕС) 2016/679 (GDPR).',
          'Настоящая политика составлена с учётом требований Закона № 195/2024 уже с момента публикации, хотя часть из них становится обязательной с 23 августа 2026 года.',
        ],
      },
      {
        heading: '3. Какие данные мы собираем и зачем',
        blocks: [
          'Мы собираем только те данные, которые нам действительно нужны. Мы не покупаем базы данных и не собираем сведения о вас из других источников.',
          'Форма обратной связи. Когда вы пишете нам через форму на сайте, мы собираем:',
          {
            list: [
              'указанное вами имя — чтобы знать, кому отвечаем;',
              'номер телефона — обязательное поле, поскольку большинство запросов быстрее решается звонком;',
              'адрес эл. почты — необязательный, используется только если вы предпочитаете письменный ответ;',
              'содержание вашего сообщения и язык, на котором вы написали.',
            ],
          },
          'Эти данные отправляются нам по электронной почте и попадают в наш почтовый ящик. Мы не храним их в отдельной базе данных и не используем для отправки вам нежелательных коммерческих сообщений.',
          'Статистика использования (только с вашего согласия). Если вы принимаете аналитические cookie, Google Analytics собирает данные о том, как используется сайт: посещённые страницы, длительность визита, тип устройства и IP-адрес. При отказе Google Tag Manager не загружается вовсе, и эти данные не собираются. Подробности — в Политике использования cookie.',
          'Технические журналы сервера. Наш хостинг-провайдер автоматически записывает IP-адрес, время запроса и тип браузера — для работы и безопасности сайта. Эти журналы необходимы для предоставления сайта и выявления злоупотреблений.',
        ],
      },
      {
        heading: '4. Правовое основание обработки',
        blocks: [
          'У каждой обработки своё правовое основание:',
          {
            list: [
              'Сообщения из формы обратной связи — ваше согласие, выраженное отметкой в поле у формы. Вы можете отозвать его в любой момент, написав нам по указанному выше адресу; отзыв не влияет на законность обработки до момента отзыва.',
              'Аналитические cookie — ваше согласие, выраженное через баннер cookie. Вы можете отозвать его в любой момент через Политику использования cookie.',
              'Строго необходимые cookie и журналы сервера — наш законный интерес предоставлять работающий и защищённый сайт. Без них сайт не может быть предоставлен.',
            ],
          },
        ],
      },
      {
        heading: '5. Кому мы передаём данные',
        blocks: [
          'Мы не продаём ваши данные. Мы не передаём их никому в маркетинговых целях. Мы передаём их только поставщикам, которые помогают нам управлять сайтом, и каждый из них обрабатывает данные исключительно по нашим указаниям:',
          {
            list: [
              'Vercel Inc. (США) — хостинг сайта. Обрабатывает технические журналы и, транзитом, содержимое формы.',
              'Resend (Resend, Inc., США) — доставка писем, отправленных через форму обратной связи.',
              'Google LLC (США / Ирландия) — Google Analytics и Google Tag Manager, только если вы приняли аналитические cookie.',
              'Google LLC — почтовый сервис, через который мы получаем сообщения, используется как техническая альтернатива Resend.',
            ],
          },
          'Мы также можем передавать данные государственным органам, если этого требует закон и в пределах такого требования.',
        ],
      },
      {
        heading: '6. Передача за пределы Республики Молдова',
        blocks: [
          'Указанные выше поставщики находятся в Соединённых Штатах Америки и Европейском союзе, что означает передачу ваших данных за пределы Республики Молдова.',
          'Такие передачи осуществляются на основании стандартных договорных условий, заключённых с каждым поставщиком, и предоставляемых ими гарантий. Вы можете запросить информацию о применимых гарантиях, написав нам по контактному адресу.',
        ],
      },
      {
        heading: '7. Сколько мы храним данные',
        blocks: [
          {
            list: [
              `Сообщения из формы обратной связи — не более ${CONTACT_RETENTION_MONTHS} месяцев с момента последней переписки с вами, после чего они удаляются. Если вы становитесь клиентом, соответствующие данные хранятся в течение срока договорных отношений и далее согласно установленным законом срокам архивирования.`,
              'Аналитические данные — согласно срокам хранения, настроенным в Google Analytics, не более 14 месяцев.',
              'Технические журналы сервера — короткие сроки, установленные хостинг-провайдером, как правило менее 30 дней.',
              'Ваш выбор относительно cookie — 12 месяцев, после чего мы спросим снова.',
            ],
          },
        ],
      },
      {
        heading: '8. Ваши права',
        blocks: [
          'В отношении ваших персональных данных вы имеете следующие права:',
          {
            list: [
              'право на доступ — узнать, обрабатываем ли мы данные о вас, и получить их копию;',
              'право на исправление — чтобы мы исправили неточные данные или дополнили неполные;',
              'право на удаление — чтобы мы удалили ваши данные, когда у нас больше нет законного основания их хранить;',
              'право на ограничение обработки — приостановить обработку в определённых случаях;',
              'право на переносимость — получить данные в структурированном, широко используемом и машиночитаемом формате;',
              'право на возражение — возразить против обработки, основанной на нашем законном интересе;',
              'право отозвать согласие в любой момент, так же легко, как вы его дали;',
              'право не быть объектом решения, основанного исключительно на автоматизированной обработке — на этом сайте мы таких решений не принимаем.',
            ],
          },
          `Чтобы воспользоваться любым из этих прав, напишите нам на ${COMPANY.email}. Мы ответим не позднее чем в течение 30 дней. Осуществление прав бесплатно. Мы можем попросить вас подтвердить свою личность, чтобы не раскрыть ваши данные другому лицу.`,
        ],
      },
      {
        heading: '9. Право подать жалобу',
        blocks: [
          'Если вы считаете, что мы нарушаем ваши права, пожалуйста, сначала напишите нам — чаще всего мы можем решить вопрос напрямую. Однако вы всегда вправе обратиться в надзорный орган:',
          {
            list: [
              `${DPA.nameRu} (${DPA.abbr})`,
              DPA.address,
              DPA.site,
            ],
          },
          'Вы также вправе обратиться в суд.',
        ],
      },
      {
        heading: '10. Безопасность данных',
        blocks: [
          'Сайт передаётся исключительно по зашифрованному соединению (HTTPS). Доступ к сообщениям, полученным через форму, ограничен лицами, которым они нужны для ответа вам. Наши поставщики выбраны из числа тех, кто предоставляет гарантии безопасности обработки.',
          'Ни одна система не является абсолютно безопасной. В случае нарушения безопасности, способного затронуть ваши права, мы уведомим вас и надзорный орган в соответствии с законом.',
        ],
      },
      {
        heading: '11. Дети',
        blocks: [
          'Наш сайт и услуги предназначены для компаний и совершеннолетних лиц. Мы не собираем намеренно данные детей. Если вам стало известно, что ребёнок передал нам данные, напишите нам, и мы их удалим.',
        ],
      },
      {
        heading: '12. Изменения настоящей политики',
        blocks: [
          'Мы можем обновлять настоящую политику при изменении характера нашей работы или требований законодательства. Действующей всегда является версия, опубликованная на этой странице; дата последнего обновления указана в начале.',
          'Если изменение существенное, мы заметно уведомим вас на сайте, а если оно касается cookie — запросим ваше согласие заново.',
        ],
      },
    ],
  },

  en: {
    title: 'Privacy Policy',
    subtitle: `How ${COMPANY.legalName} collects, uses and protects your personal data.`,
    updatedLabel: 'Last updated:',
    sections: [
      {
        heading: '1. Who the controller is',
        blocks: [
          `The controller of your personal data is ${COMPANY.legalName}, a legal entity registered in the Republic of Moldova, IDNO ${COMPANY.idno}, which operates the ${COMPANY.site} website under the ${COMPANY.brand} brand.`,
          {
            list: [
              `Registered address: ${COMPANY.registeredAddress}`,
              `Correspondence address: ${COMPANY.officeAddress}`,
              `Email: ${COMPANY.email}`,
              `Phone: ${COMPANY.phone}`,
            ],
          },
          `For any question about your data, or to exercise the rights described below, write to ${COMPANY.email}. We respond within 30 days at the latest.`,
        ],
      },
      {
        heading: '2. Applicable legal framework',
        blocks: [
          'We process personal data in accordance with Law no. 133/2011 on the protection of personal data and, from 23 August 2026, in accordance with Law no. 195 of 25 July 2024 on the protection of personal data, which fully transposes Regulation (EU) 2016/679 (GDPR).',
          'This policy is written to meet the requirements of Law no. 195/2024 from the moment of publication, even though some of them only become binding on 23 August 2026.',
        ],
      },
      {
        heading: '3. What data we collect and why',
        blocks: [
          'We collect only the data we actually need. We do not buy databases and we do not gather information about you from other sources.',
          'Contact form. When you write to us through the form on the site, we collect:',
          {
            list: [
              'the name you provide — so we know who we are replying to;',
              'your phone number — a required field, because most enquiries are resolved faster by a call;',
              'your email address — optional, used only if you prefer a written reply;',
              'the content of your message and the language you wrote in.',
            ],
          },
          'This data is sent to us by email and lands in our mailbox. We do not store it in a separate database and we do not use it to send you unsolicited commercial messages.',
          'Usage statistics (only with your consent). If you accept analytics cookies, Google Analytics collects data about how the site is used: pages visited, visit duration, device type and IP address. If you decline, Google Tag Manager is not loaded at all and this data is not collected. Details are in the Cookie Policy.',
          'Server technical logs. Our hosting provider automatically records the IP address, request time and browser type, for the operation and security of the site. These logs are necessary to deliver the site and to detect abuse.',
        ],
      },
      {
        heading: '4. Legal basis for processing',
        blocks: [
          'Each processing activity has its own legal basis:',
          {
            list: [
              'Contact form messages — your consent, given by ticking the box at the form. You can withdraw it at any time by writing to the address above; withdrawal does not affect the lawfulness of processing before withdrawal.',
              'Analytics cookies — your consent, given through the cookie banner. You can withdraw it at any time from the Cookie Policy.',
              'Strictly necessary cookies and server logs — our legitimate interest in delivering a working and secure website. Without them the site cannot be provided.',
            ],
          },
        ],
      },
      {
        heading: '5. Who we share data with',
        blocks: [
          'We do not sell your data. We do not pass it to anyone for marketing purposes. We share it only with the providers that help us run the site, each processing it exclusively on our instructions:',
          {
            list: [
              'Vercel Inc. (USA) — website hosting. Processes technical logs and, in transit, the form content.',
              'Resend (Resend, Inc., USA) — delivery of emails sent from the contact form.',
              'Google LLC (USA / Ireland) — Google Analytics and Google Tag Manager, only if you accepted analytics cookies.',
              'Google LLC — the email service through which we receive messages, used as a technical alternative to Resend.',
            ],
          },
          'We may also disclose data to public authorities where the law requires it and within the limits of that obligation.',
        ],
      },
      {
        heading: '6. Transfers outside the Republic of Moldova',
        blocks: [
          'The providers listed above are established in the United States of America and the European Union, which means your data is transferred outside the Republic of Moldova.',
          'These transfers take place on the basis of standard contractual clauses concluded with each provider and the safeguards they offer. You may request information about the applicable safeguards by writing to our contact address.',
        ],
      },
      {
        heading: '7. How long we keep data',
        blocks: [
          {
            list: [
              `Contact form messages — at most ${CONTACT_RETENTION_MONTHS} months from our last communication with you, after which they are deleted. If you become a client, the relevant data is kept for the duration of the contractual relationship and afterwards according to statutory archiving periods.`,
              'Analytics data — according to the retention periods configured in Google Analytics, at most 14 months.',
              'Server technical logs — short periods set by the hosting provider, typically under 30 days.',
              'Your cookie choice — 12 months, after which we ask again.',
            ],
          },
        ],
      },
      {
        heading: '8. Your rights',
        blocks: [
          'In relation to your personal data you have the following rights:',
          {
            list: [
              'the right of access — to find out whether we process data about you and to receive a copy of it;',
              'the right to rectification — to have inaccurate data corrected or incomplete data completed;',
              'the right to erasure — to have your data deleted when we no longer have a legitimate reason to keep it;',
              'the right to restriction of processing — to have processing suspended in certain situations;',
              'the right to data portability — to receive your data in a structured, commonly used and machine-readable format;',
              'the right to object — to object to processing based on our legitimate interest;',
              'the right to withdraw your consent at any time, as easily as you gave it;',
              'the right not to be subject to a decision based solely on automated processing — we make no such decisions on this site.',
            ],
          },
          `To exercise any of these rights, write to us at ${COMPANY.email}. We reply within 30 days at the latest. Exercising your rights is free of charge. We may ask you to confirm your identity, so that we do not disclose your data to someone else.`,
        ],
      },
      {
        heading: '9. Right to lodge a complaint',
        blocks: [
          'If you believe we are infringing your rights, please write to us first — most of the time we can resolve the matter directly. You are, however, always entitled to contact the supervisory authority:',
          {
            list: [
              `${DPA.nameEn} (${DPA.abbr})`,
              DPA.address,
              DPA.site,
            ],
          },
          'You also have the right to bring the matter before a court.',
        ],
      },
      {
        heading: '10. Data security',
        blocks: [
          'The site is served exclusively over an encrypted connection (HTTPS). Access to messages received through the form is limited to the people who need them in order to reply to you. Our providers are chosen from among those offering guarantees regarding the security of processing.',
          'No system is perfectly secure. If a security breach occurs that may affect your rights, we will inform you and notify the authority, as required by law.',
        ],
      },
      {
        heading: '11. Children',
        blocks: [
          'Our site and services are aimed at companies and adults. We do not knowingly collect data from children. If you learn that a child has sent us data, write to us and we will delete it.',
        ],
      },
      {
        heading: '12. Changes to this policy',
        blocks: [
          'We may update this policy when the way we work or legal requirements change. The version in force is always the one published on this page, and the date of the last update is shown at the top.',
          'If a change is significant we will notify you visibly on the site, and if it concerns cookies we will ask for your consent again.',
        ],
      },
    ],
  },
}
