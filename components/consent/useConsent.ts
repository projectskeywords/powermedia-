'use client'

import { useCallback, useSyncExternalStore } from 'react'
import {
  DENY_ALL,
  readConsent,
  readServerConsent,
  subscribeConsent,
  writeConsent,
  clearConsent,
  type ConsentChoices,
  type ConsentRecord,
} from '@/lib/consent'

interface UseConsentResult {
  /** null = vizitatorul nu a ales încă. */
  readonly record: ConsentRecord | null
  /**
   * false pe server și la randarea de hidratare. Pe server nu știm ce a ales
   * vizitatorul, iar a ghici ar produce fie un banner care pâlpâie pentru cei
   * care au ales deja, fie o nepotrivire de hidratare.
   */
  readonly hydrated: boolean
  readonly choices: ConsentChoices
  readonly save: (choices: ConsentChoices) => void
  readonly withdraw: () => void
}

/** Abonare inertă: valoarea nu se schimbă niciodată după hidratare. */
const subscribeNever = () => () => {}
const onClient = () => true
const onServer = () => false

export function useConsent(): UseConsentResult {
  const record = useSyncExternalStore(subscribeConsent, readConsent, readServerConsent)
  const hydrated = useSyncExternalStore(subscribeNever, onClient, onServer)

  const save = useCallback((choices: ConsentChoices) => {
    writeConsent(choices)
  }, [])

  const withdraw = useCallback(() => {
    clearConsent()
  }, [])

  return {
    record,
    hydrated,
    choices: record?.choices ?? DENY_ALL,
    save,
    withdraw,
  }
}
