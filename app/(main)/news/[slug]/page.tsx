import { getPayload } from "@/src/lib/payload"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import BackgroundStripes from "@/components/background-stripes"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import BackgroundPaths from "@/components/background-paths"
import Link from "next/link"
import { RichText } from "@/components/rich-text"
import { generateNewsMetadata, generateStructuredData, generateBreadcrumbStructuredData, formatDateForSEO } from "@/lib/seo"
import { siteConfig } from "@/config/site"

interface NewsDetailProps {
  params: {
    slug: string
  }
}

interface NewsWithAuthor {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: any // Rich text content
  publishedDate: string
  updatedAt: string
  category: 'lab-update' | 'research-achievement' | 'publication' | 'event' | 'award' | 'collaboration'
  isFeatured: boolean
  tags?: Array<{ tag: string }>
  author: {
    id: string
    name?: string
    email: string
  }
  featuredImage?: {
    alt?: string
    url?: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: NewsDetailProps): Promise<Metadata> {
  const newsItem = await getNewsItem(params.slug)
  
  if (!newsItem) {
    return {
      title: 'News Not Found',
      description: 'The requested news article could not be found.',
    }
  }

  return generateNewsMetadata(newsItem)
}

async function getNewsItem(slug: string): Promise<NewsWithAuthor | null> {
  try {
    const payload = await getPayload()
    
    const { docs } = await payload.find({
      collection: 'lab-news',
      where: {
        slug: {
          equals: slug,
        },
        isPublished: {
          equals: true,
        },
      },
      depth: 2,
      limit: 1,
    })

    return docs[0] as NewsWithAuthor || null
  } catch (error) {
    console.error('Error fetching news item:', error)
    return null
  }
}

async function getRelatedNews(currentSlug: string, category: string): Promise<NewsWithAuthor[]> {
  try {
    const payload = await getPayload()
    
    const { docs } = await payload.find({
      collection: 'lab-news',
      where: {
        slug: {
          not_equals: currentSlug,
        },
        category: {
          equals: category,
        },
        isPublished: {
          equals: true,
        },
      },
      depth: 2,
      limit: 3,
      sort: '-publishedDate',
    })

    return docs as NewsWithAuthor[]
  } catch (error) {
    console.error('Error fetching related news:', error)
    return []
  }
}

export default async function NewsDetailPage({ params }: NewsDetailProps) {
  const { slug } = params
  const newsItem = await getNewsItem(slug)
  
  if (!newsItem) {
    notFound()
  }

  const relatedNews = await getRelatedNews(slug, newsItem.category)

  // Generate structured data
  const articleStructuredData = generateStructuredData({
    type: 'NewsArticle',
    name: newsItem.title,
    description: newsItem.excerpt,
    url: `/news/${newsItem.slug}`,
    image: newsItem.featuredImage?.url,
    datePublished: formatDateForSEO(newsItem.publishedDate),
    dateModified: formatDateForSEO(newsItem.updatedAt),
    author: newsItem.author.name || newsItem.author.email,
    keywords: newsItem.tags?.map(t => t.tag),
  })

  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'News', url: '/news' },
    { name: newsItem.title, url: `/news/${newsItem.slug}` },
  ])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "lab-update":
        return "bg-blue-500/20 text-blue-300"
      case "research-achievement":
        return "bg-green-500/20 text-green-300"
      case "publication":
        return "bg-purple-500/20 text-purple-300"
      case "event":
        return "bg-yellow-500/20 text-yellow-300"
      case "award":
        return "bg-orange-500/20 text-orange-300"
      case "collaboration":
        return "bg-pink-500/20 text-pink-300"
      default:
        return "bg-gray-500/20 text-gray-300"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      
      <BackgroundPaths />
      <AnimatedBackground />
      <BackgroundStripes />

      <div className="relative z-10">
        <Navbar />
        
        {/* Breadcrumb */}
        <section className="pt-32 pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex text-sm text-gray-400 mb-8">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/news" className="hover:text-white transition-colors">
                News
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-200">{newsItem.title}</span>
            </nav>
          </div>
        </section>

        {/* Article Header */}
        <section className="pb-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(newsItem.category)}`}>
                {newsItem.category.replace("-", " ").toUpperCase()}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {newsItem.title}
            </h1>
            
            {newsItem.excerpt && (
              <p className="text-xl text-gray-300 mb-8">
                {newsItem.excerpt}
              </p>
            )}
            
            <div className="flex items-center justify-between text-gray-400 mb-8 pb-8 border-b border-gray-700">
              <div className="flex items-center space-x-4">
                <span>By {newsItem.author.name || newsItem.author.email}</span>
                <span>•</span>
                <span>{formatDate(newsItem.publishedDate)}</span>
              </div>
              
              {newsItem.tags && newsItem.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {newsItem.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                    >
                      {tag.tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {newsItem.featuredImage && (
          <section className="pb-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <figure>
                <img
                  src={newsItem.featuredImage.url || '/placeholder.jpg'}
                  alt={newsItem.featuredImage.alt || newsItem.title}
                  className="w-full h-64 md:h-96 object-cover rounded-xl border border-gray-700"
                />
              </figure>
            </div>
          </section>
        )}

        {/* Article Content */}
        <section className="pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <article className="prose prose-lg prose-invert max-w-none">
              <RichText data={newsItem.content} />
            </article>
          </div>
        </section>

        {/* Related News */}
        {relatedNews.length > 0 && (
          <section className="py-16 border-t border-gray-800">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold text-white mb-12 text-center">
                Related News
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {relatedNews.map((item) => (
                  <Link
                    key={item.id}
                    href={`/news/${item.slug}`}
                    className="group block bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <div className="aspect-video bg-gray-700 relative">
                      <img
                        src={item.featuredImage?.url || '/placeholder.jpg'}
                        alt={item.featuredImage?.alt || item.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                          {item.category.replace("-", " ").toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">
                        {formatDate(item.publishedDate)}
                      </p>
                      {item.excerpt && (
                        <p className="text-gray-300 text-sm overflow-hidden" style={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical'
                        }}>
                          {item.excerpt}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <AnimatedFooter />
      </div>
    </div>
  )
}
