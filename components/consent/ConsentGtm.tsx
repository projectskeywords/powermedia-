'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { useConsent } from './useConsent'

const GTM_ID = 'GTM-NXGR45DF'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Încarcă Google Tag Manager doar după consimțământ pentru analytics.
 *
 * Două straturi, intenționat:
 *  1. Containerul nu se injectează deloc fără acord — fără el, Google nu
 *     primește nici măcar IP-ul vizitatorului.
 *  2. Consent Mode v2 (`consent update`) reflectă alegerea și în interiorul
 *     containerului, ca tag-urile adăugate ulterior din interfața GTM să o
 *     respecte fără modificări de cod aici.
 */
export default function ConsentGtm() {
  const { hydrated, choices } = useConsent()

  useEffect(() => {
    if (!hydrated) return
    window.gtag?.('consent', 'update', {
      analytics_storage: choices.analytics ? 'granted' : 'denied',
      ad_storage: choices.marketing ? 'granted' : 'denied',
      ad_user_data: choices.marketing ? 'granted' : 'denied',
      ad_personalization: choices.marketing ? 'granted' : 'denied',
    })
  }, [hydrated, choices])

  if (!hydrated || !choices.analytics) return null

  return (
    <Script id="gtm-loader" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  )
}
