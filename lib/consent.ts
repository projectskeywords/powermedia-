/**
 * Consimțământ cookies — Legea nr. 195/2024 (RM), în vigoare din 23.08.2026.
 *
 * Categoria `necessary` nu este opțională: acoperă strict cookie-urile fără de
 * care site-ul nu funcționează (sesiune admin, memorarea acestei alegeri).
 * Restul pornesc dezactivate și rămân așa până la o acțiune explicită.
 */

export type ConsentCategory = 'necessary' | 'analytics' | 'marketing'

export type ConsentChoices = Readonly<Record<ConsentCategory, boolean>>

export interface ConsentRecord {
  /** Versiunea politicii acceptate — la schimbare, consimțământul se re-cere. */
  readonly version: number
  /** ISO 8601, momentul alegerii. Dovada că alegerea a fost făcută. */
  readonly timestamp: string
  readonly choices: ConsentChoices
}

/**
 * Incrementează la orice modificare de fond a politicii de cookies
 * (categorie nouă, furnizor nou). Vizitatorii vor fi întrebați din nou.
 */
export const CONSENT_VERSION = 1

export const CONSENT_STORAGE_KEY = 'pm_consent'

/**
 * După acest interval alegerea expiră și vizitatorul e întrebat din nou.
 * 12 luni — în linia recomandărilor autorităților europene de profil, pe care
 * Legea nr. 195/2024 le urmează îndeaproape.
 */
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000

/** Evenimentul prin care componentele află de o schimbare în aceeași filă. */
export const CONSENT_EVENT = 'pm:consent-change'

export const DENY_ALL: ConsentChoices = {
  necessary: true,
  analytics: false,
  marketing: false,
}

/**
 * Ce acordă butonul „Accept": exclusiv categoriile pe care bannerul le
 * prezintă efectiv vizitatorului.
 *
 * `marketing` rămâne fals pentru că nu îl afișăm nicăieri — nu poți consimți
 * la ceva ce nu ți s-a arătat. Când site-ul chiar va folosi tag-uri de
 * marketing, acestea se adaugă întâi în banner și în politica de cookies, apoi
 * aici; altfel am colecta un acord fictiv.
 */
export const ACCEPT_OFFERED: ConsentChoices = {
  necessary: true,
  analytics: true,
  marketing: false,
}

function isConsentChoices(value: unknown): value is ConsentChoices {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    typeof v.necessary === 'boolean' &&
    typeof v.analytics === 'boolean' &&
    typeof v.marketing === 'boolean'
  )
}

function isConsentRecord(value: unknown): value is ConsentRecord {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Record<string, unknown>
  return (
    typeof v.version === 'number' &&
    typeof v.timestamp === 'string' &&
    isConsentChoices(v.choices)
  )
}

function isExpired(record: ConsentRecord): boolean {
  const at = Date.parse(record.timestamp)
  if (Number.isNaN(at)) return true
  return Date.now() - at > CONSENT_MAX_AGE_MS
}

function parseConsent(raw: string | null): ConsentRecord | null {
  if (!raw) return null

  try {
    const parsed: unknown = JSON.parse(raw)
    if (!isConsentRecord(parsed)) return null
    if (parsed.version !== CONSENT_VERSION) return null
    if (isExpired(parsed)) return null
    return parsed
  } catch {
    // JSON invalid — tratăm ca „fără alegere" și întrebăm din nou.
    return null
  }
}

function rawFromStorage(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY)
  } catch {
    // localStorage indisponibil (mod privat, cotă depășită).
    return null
  }
}

/**
 * Instantaneu memorat, cheie fiind șirul brut din localStorage.
 *
 * useSyncExternalStore cere ca două apeluri consecutive fără schimbare să
 * întoarcă exact aceeași referință; altfel React re-randează la nesfârșit.
 * De aceea re-parsăm doar când șirul brut chiar s-a schimbat.
 */
let cachedRaw: string | null = null
let cachedRecord: ConsentRecord | null = null
let cachePrimed = false

/**
 * Rezervă pentru cazul în care localStorage nu poate fi scris (mod privat,
 * cotă depășită). Alegerea rămâne valabilă în sesiunea curentă în loc să
 * dispară instant — la următoarea vizită vom întreba din nou, ceea ce e
 * acceptabil; ce nu ar fi acceptabil e să ignorăm un refuz.
 */
let memoryRecord: ConsentRecord | null = null
let storageWritable = true

/**
 * Citește alegerea salvată. Returnează null dacă nu există, e coruptă, a
 * expirat sau aparține unei versiuni vechi de politică — în toate cazurile
 * trebuie întrebat din nou, iar până atunci nu se încarcă nimic opțional.
 */
export function readConsent(): ConsentRecord | null {
  if (typeof window === 'undefined') return null
  if (!storageWritable) return memoryRecord

  const raw = rawFromStorage()
  if (!cachePrimed || raw !== cachedRaw) {
    cachedRaw = raw
    cachedRecord = parseConsent(raw)
    cachePrimed = true
  }
  return cachedRecord
}

/** Pe server nu există alegere: nu randăm nimic care depinde de ea. */
export function readServerConsent(): null {
  return null
}

/** Abonare la schimbări: în fila curentă (CONSENT_EVENT) și în alte file (storage). */
export function subscribeConsent(onChange: () => void): () => void {
  window.addEventListener(CONSENT_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

/** Salvează alegerea și anunță ascultătorii din fila curentă. */
export function writeConsent(choices: ConsentChoices): ConsentRecord {
  const record: ConsentRecord = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    choices: { ...choices, necessary: true },
  }

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record))
    storageWritable = true
  } catch {
    // Nu putem persista: ținem alegerea în memorie pentru sesiunea curentă,
    // în loc să aruncăm o eroare în fața vizitatorului.
    storageWritable = false
  }

  memoryRecord = record
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT))
  return record
}

/** Șterge alegerea — folosit de butonul „retrage consimțământul". */
export function clearConsent(): void {
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY)
  } catch {
    // vezi writeConsent
  }
  memoryRecord = null
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT))
}
