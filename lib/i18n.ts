import roMessages from '@/messages/ro.json'
import ruMessages from '@/messages/ru.json'
import enMessages from '@/messages/en.json'

export type Lang = 'ro' | 'ru' | 'en'
export const LOCALES: Lang[] = ['ro', 'ru', 'en']
export const DEFAULT_LOCALE: Lang = 'ro'

const messages = { ro: roMessages, ru: ruMessages, en: enMessages }

export function getMessages(lang: Lang) {
  return messages[lang] ?? messages[DEFAULT_LOCALE]
}

export function isValidLang(lang: string): lang is Lang {
  return LOCALES.includes(lang as Lang)
}
