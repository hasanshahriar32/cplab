import { Inter } from "next/font/google"
import type React from "react"
import type { Metadata } from "next"
import MouseMoveEffect from "@/components/mouse-move-effect"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Cyber Physical Lab - Research Platform",
  description: "Advanced research platform for Cyber Physical Systems, IoT, and cutting-edge technology research.",
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['research', 'cyber physical systems', 'IoT', 'technology', 'lab', 'academic', 'innovation', 'computer science', 'engineering'],
  authors: [{ name: 'Cyber Physical Lab' }],
  creator: 'Cyber Physical Lab',
  publisher: 'Cyber Physical Lab',
  robots: 'index,follow',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://cyberphysicallab.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Cyber Physical Lab',
    title: 'Cyber Physical Lab - Research Platform',
    description: 'Advanced research platform for Cyber Physical Systems, IoT, and cutting-edge technology research.',
    url: '/',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Cyber Physical Lab - Research Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cyberphysicallab',
    creator: '@cyberphysicallab',
    title: 'Cyber Physical Lab - Research Platform',
    description: 'Advanced research platform for Cyber Physical Systems, IoT, and cutting-edge technology research.',
    images: ['/og-image.jpg'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CPLab',
  },
  applicationName: 'Cyber Physical Lab',
  category: 'research',
  classification: 'academic research laboratory',
  icons: {
    icon: [
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    other: {
      'msvalidate.01': process.env.BING_SITE_VERIFICATION || '',
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0a0a23" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="CPLab" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="shortcut icon" href="/icon-192x192.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Cyber Physical Lab",
              "description": "Advanced research platform for Cyber Physical Systems, IoT, and cutting-edge technology research.",
              "url": "https://cyberphysicallab.com",
              "logo": "https://cyberphysicallab.com/icon-512x512.png",
              "sameAs": [
                "https://twitter.com/cyberphysicallab",
                "https://linkedin.com/company/cyber-physical-lab",
                "https://github.com/cyberphysicallab",
                "https://researchgate.net/lab/cyber-physical-lab"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "info@cyberphysicallab.com",
                "contactType": "customer service"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
