import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Powermedia — Agenție Digitală Moldova',
    template: '%s | Powermedia',
  },
  description:
    'Agenție digitală #1 în Moldova — creare website, magazine online, CRM/ERP, Google Ads și automatizări AI. Soluții digitale premium pentru afaceri din Chișinău.',
  metadataBase: new URL('https://powermedia.md'),
  openGraph: {
    type: 'website',
    siteName: 'Powermedia',
    locale: 'ro_RO',
    url: 'https://powermedia.md',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@powermedia_md',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

/** LocalBusiness + ProfessionalService schema — injectat pe toate paginile */
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['LocalBusiness', 'ProfessionalService'],
      '@id': 'https://powermedia.md/#organization',
      name: 'Powermedia',
      description:
        'Agenție digitală din Moldova — creare website, magazine online, CRM/ERP, Google Ads și automatizări AI',
      url: 'https://powermedia.md',
      telephone: '+37368996315',
      email: 'vlad@keywords.md',
      logo: {
        '@type': 'ImageObject',
        url: 'https://powermedia.md/logo.png',
        width: 200,
        height: 60,
      },
      image: 'https://powermedia.md/og-image.jpg',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Bd. Iurii Gagarin 10, CBC',
        addressLocality: 'Chișinău',
        addressRegion: 'Chișinău',
        postalCode: 'MD-2028',
        addressCountry: 'MD',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 47.0229,
        longitude: 28.8353,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      priceRange: '€€',
      currenciesAccepted: 'MDL, EUR',
      paymentAccepted: 'Cash, Credit Card, Bank Transfer',
      areaServed: [
        { '@type': 'Country', name: 'Moldova' },
        { '@type': 'AdministrativeArea', name: 'Chișinău' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicii Digitale Powermedia',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Creare Website Moldova',
              url: 'https://powermedia.md/ro/servicii/creare-website',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Magazin Online Moldova',
              url: 'https://powermedia.md/ro/servicii/magazin-online',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Publicitate Google Ads Moldova',
              url: 'https://powermedia.md/ro/servicii/publicitate-google',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Automatizări AI',
              url: 'https://powermedia.md/ro/servicii/automatizari-ai',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Sisteme CRM / ERP Moldova',
              url: 'https://powermedia.md/ro/servicii/crm-erp',
            },
          },
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '48',
        bestRating: '5',
        worstRating: '1',
      },
      sameAs: [
        'https://www.facebook.com/powermedia.md',
        'https://www.instagram.com/powermedia.md',
        'https://www.linkedin.com/company/powermedia-md',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://powermedia.md/#website',
      url: 'https://powermedia.md',
      name: 'Powermedia',
      publisher: { '@id': 'https://powermedia.md/#organization' },
      inLanguage: ['ro', 'ru', 'en'],
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://powermedia.md/ro/articole?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ro"
      className={geistSans.variable}
      suppressHydrationWarning
    >
      <head>
        {/* Performance: preconnect la resurse externe */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Schema.org LocalBusiness — toate paginile */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />

        {/* Google Tag Manager */}
        <Script id="gtm-head" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NXGR45DF');`}
        </Script>
      </head>
      <body className="min-h-screen antialiased bg-zinc-950 text-white">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NXGR45DF"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}
