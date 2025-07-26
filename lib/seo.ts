import { Metadata } from 'next'
import { siteConfig } from '@/config/site'

export interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  authors?: string[]
  tags?: string[]
  category?: string
  noIndex?: boolean
  canonical?: string
}

export function generateMetadata({
  title,
  description,
  image,
  url = '',
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
  category,
  noIndex = false,
  canonical,
}: SEOProps = {}): Metadata {
  const metaTitle = title 
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} - ${siteConfig.description}`

  const metaDescription = description || siteConfig.description
  const metaImage = image || siteConfig.ogImage
  const metaUrl = `${siteConfig.url}${url}`
  const canonicalUrl = canonical || metaUrl

  const metadata: Metadata = {
    title: metaTitle,
    description: metaDescription,
    keywords: [
      ...siteConfig.researchAreas,
      'research laboratory',
      'academic research',
      'technology innovation',
      'scientific research',
      ...(tags || [])
    ],
    authors: authors ? authors.map(author => ({ name: author })) : [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type,
      siteName: siteConfig.name,
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: title || siteConfig.name,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: authors,
        tags,
        section: category,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      site: siteConfig.social.twitter,
      creator: siteConfig.social.twitter,
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
    },
  }

  return metadata
}

export function generateStructuredData({
  type = 'Organization',
  name,
  description,
  url,
  image,
  datePublished,
  dateModified,
  author,
  keywords,
}: {
  type?: 'Organization' | 'Article' | 'NewsArticle' | 'BlogPosting' | 'ResearchProject'
  name?: string
  description?: string
  url?: string
  image?: string
  datePublished?: string
  dateModified?: string
  author?: string
  keywords?: string[]
}) {
  const baseUrl = siteConfig.url

  if (type === 'Organization') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteConfig.name,
      description: siteConfig.description,
      url: baseUrl,
      logo: `${baseUrl}/icon-512x512.png`,
      image: siteConfig.ogImage,
      sameAs: [
        siteConfig.links.twitter,
        siteConfig.links.linkedin,
        siteConfig.links.github,
        siteConfig.links.researchgate,
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        contactType: 'customer service',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: siteConfig.contact.address,
      },
    }
  }

  if (type === 'Article' || type === 'NewsArticle' || type === 'BlogPosting') {
    return {
      '@context': 'https://schema.org',
      '@type': type,
      headline: name,
      description,
      image: image || siteConfig.ogImage,
      url: `${baseUrl}${url}`,
      datePublished,
      dateModified: dateModified || datePublished,
      author: {
        '@type': 'Person',
        name: author,
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.name,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/icon-512x512.png`,
        },
      },
      keywords: keywords?.join(', '),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${baseUrl}${url}`,
      },
    }
  }

  if (type === 'ResearchProject') {
    return {
      '@context': 'https://schema.org',
      '@type': 'ResearchProject',
      name,
      description,
      url: `${baseUrl}${url}`,
      image: image || siteConfig.ogImage,
      keywords: keywords?.join(', '),
      sponsor: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
    }
  }

  return null
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }
}

export function formatDateForSEO(date: string | Date): string {
  return new Date(date).toISOString()
}

export function extractTextFromRichText(content: any): string {
  if (!content?.root?.children) return ''
  
  const extractText = (node: any): string => {
    if (node.type === 'text') {
      return node.text || ''
    }
    
    if (node.children) {
      return node.children.map(extractText).join(' ')
    }
    
    return ''
  }
  
  return content.root.children.map(extractText).join(' ').slice(0, 160)
}

export function generateNewsMetadata(news: {
  title: string
  seoTitle?: string
  excerpt?: string
  seoDescription?: string
  content?: any
  slug: string
  publishedDate: string
  updatedAt?: string
  author: { name?: string; email: string }
  featuredImage?: { url?: string; alt?: string }
  tags?: Array<{ tag: string }>
  category: string
}): Metadata {
  const metaTitle = news.seoTitle || news.title
  const description = news.seoDescription || news.excerpt || extractTextFromRichText(news.content)
  const authorName = news.author.name || news.author.email.split('@')[0]
  
  // Use featured image if available, otherwise generate dynamic OG image
  const ogImage = news.featuredImage?.url || 
    `${siteConfig.url}/api/og?title=${encodeURIComponent(metaTitle)}&description=${encodeURIComponent(description.slice(0, 100))}&category=${encodeURIComponent(news.category)}`
  
  return generateMetadata({
    title: metaTitle,
    description,
    image: ogImage,
    url: `/news/${news.slug}`,
    type: 'article',
    publishedTime: formatDateForSEO(news.publishedDate),
    modifiedTime: news.updatedAt ? formatDateForSEO(news.updatedAt) : undefined,
    authors: [authorName],
    tags: news.tags?.map(t => t.tag),
    category: news.category.replace('-', ' '),
  })
}
