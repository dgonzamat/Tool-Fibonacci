import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import './globals.css'

const siteUrl = 'https://dgonzamat.github.io/Tool-Fibonacci'
const siteName = 'Tool × Fibonacci'
const siteDescription =
  'Explora los patrones matemáticos, la secuencia de Fibonacci y la proporción áurea en la música de Tool. Análisis interactivo de Lateralus, Schism y Forty Six & 2.'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} · Patrones matemáticos en la música de Tool`,
    template: `%s · ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: 'Daniel González' }],
  creator: 'Daniel González',
  keywords: [
    'Tool',
    'Fibonacci',
    'proporción áurea',
    'golden ratio',
    'Lateralus',
    'Schism',
    'matemáticas en la música',
    'análisis musical',
    'phi',
    'Maynard James Keenan',
    'progressive metal',
  ],
  category: 'music',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: '/',
    siteName,
    title: `${siteName} · Patrones matemáticos en la música de Tool`,
    description: siteDescription,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'Tool × Fibonacci',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteName} · Patrones matemáticos en la música de Tool`,
    description: siteDescription,
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.webmanifest',
  verification: {
    google: 'yUd3nome40cMo2VQNkHM-I811d3TdwR5zxuebVSn2wc',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#000000',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: siteName,
      description: siteDescription,
      inLanguage: 'es',
      publisher: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Daniel González',
    },
    {
      '@type': 'MusicGroup',
      name: 'Tool',
      genre: ['Progressive Metal', 'Progressive Rock', 'Art Rock'],
      url: 'https://toolband.com',
      sameAs: [
        'https://en.wikipedia.org/wiki/Tool_(band)',
        'https://www.allmusic.com/artist/tool-mn0000816492',
      ],
    },
    {
      '@type': 'MusicAlbum',
      name: 'Lateralus',
      byArtist: { '@type': 'MusicGroup', name: 'Tool' },
      datePublished: '2001-05-15',
    },
    {
      '@type': 'MusicAlbum',
      name: 'Ænima',
      byArtist: { '@type': 'MusicGroup', name: 'Tool' },
      datePublished: '1996-09-17',
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className="overflow-x-hidden">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:bg-yellow-500 focus:text-black focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          Saltar al contenido
        </a>
        {children}
        <Script
          id="ld-json"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  )
}
