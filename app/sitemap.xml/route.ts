import { getPayload } from "@/src/lib/payload"
import { siteConfig } from "@/config/site"

export async function GET() {
  const payload = await getPayload()
  
  // Get all published news
  const { docs: news } = await payload.find({
    collection: 'lab-news',
    where: {
      isPublished: {
        equals: true,
      },
    },
    limit: 1000,
  })

  // Static routes
  const staticRoutes = [
    '',
    '/news',
    '/services',
    '/research',
    '/team',
    '/contact',
    '/get-started',
    '/publications',
    '/success-stories',
    '/artists',
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${staticRoutes
    .map(
      (route) => `
  <url>
    <loc>${siteConfig.url}${route}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${route === '' ? 'daily' : route === '/news' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '' ? '1.0' : route === '/news' ? '0.9' : '0.8'}</priority>
  </url>`
    )
    .join('')}
  ${news
    .map(
      (item: any) => `
  <url>
    <loc>${siteConfig.url}/news/${item.slug}</loc>
    <lastmod>${new Date(item.updatedAt || item.publishedDate).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <news:news>
      <news:publication>
        <news:name>${siteConfig.name}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${new Date(item.publishedDate).toISOString()}</news:publication_date>
      <news:title>${item.title}</news:title>
      <news:keywords>${item.tags?.map((t: any) => t.tag).join(', ') || ''}</news:keywords>
    </news:news>
  </url>`
    )
    .join('')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=86400, stale-while-revalidate',
    },
  })
}
