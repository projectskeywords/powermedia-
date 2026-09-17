/**
 * Datele operatorului de date, sursă unică pentru documentele legale.
 *
 * Dacă se schimbă sediul, IDNO-ul sau contactul, se schimbă aici — nu în
 * fiecare traducere în parte, unde ar rămâne inevitabil desincronizate.
 */
export const COMPANY = {
  legalName: 'OUTBOX IT SRL',
  brand: 'Powermedia',
  idno: '1025600027689',
  /** Adresa juridică din Registrul de stat. */
  registeredAddress: 'MD-6526, r-l Anenii Noi, s. Mereni, str. Dumbravelor 88',
  /** Adresa de lucru / corespondență. */
  officeAddress: 'bd. Iuri Gagarin 10, Chișinău, MD-2001',
  email: 'vlad@keywords.md',
  phone: '+373 68 996 315',
  site: 'powermedia.md',
  siteUrl: 'https://powermedia.md',
} as const

/** Autoritatea de supraveghere din RM. */
export const DPA = {
  nameRo: 'Centrul Național pentru Protecția Datelor cu Caracter Personal',
  nameRu: 'Национальный центр по защите персональных данных',
  nameEn: 'National Center for Personal Data Protection',
  abbr: 'CNPDCP',
  address: 'str. Serghei Lazo 48, MD-2004, Chișinău',
  site: 'datepersonale.md',
  siteUrl: 'https://datepersonale.md',
} as const

/**
 * Data ultimei revizuiri a documentelor legale, ISO 8601.
 * De actualizat la orice modificare de fond.
 */
export const LEGAL_LAST_UPDATED = '2026-07-17'

/**
 * Termenul de păstrare a mesajelor din formularul de contact.
 * DE CONFIRMAT cu operatorul — valoarea trebuie să reflecte practica reală,
 * nu invers.
 */
export const CONTACT_RETENTION_MONTHS = 24
