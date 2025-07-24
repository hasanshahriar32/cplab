import { withPWA } from 'next-pwa'
import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['localhost', 'vercel-blobs-prod'], // Add Vercel Blob CDN domain
    unoptimized: true,
  },
  experimental: {
    reactCompiler: false,
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          },
        },
      },
    ],
    buildExcludes: [/middleware-manifest.json$/],
    scope: '/',
    sw: 'sw.js',
  },
}

export default withPWA(withPayload(nextConfig))
