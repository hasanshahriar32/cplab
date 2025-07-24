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
  keywords: ['research', 'cyber physical systems', 'IoT', 'technology', 'lab', 'academic'],
  authors: [{ name: 'Cyber Physical Lab' }],
  creator: 'Cyber Physical Lab',
  publisher: 'Cyber Physical Lab',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Cyber Physical Lab',
    title: 'Cyber Physical Lab - Research Platform',
    description: 'Advanced research platform for Cyber Physical Systems, IoT, and cutting-edge technology research.',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cyber Physical Lab - Research Platform',
    description: 'Advanced research platform for Cyber Physical Systems, IoT, and cutting-edge technology research.',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'CPLab',
  },
  applicationName: 'Cyber Physical Lab',
  icons: {
    icon: [
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
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
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link rel="shortcut icon" href="/icon-192x192.png" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
