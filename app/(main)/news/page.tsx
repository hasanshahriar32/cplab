import BackgroundStripes from "@/components/background-stripes"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import AnimatedFooter from "@/components/animated-footer"
import BackgroundPaths from "@/components/background-paths"
import { RecentNews } from "@/components/recent-news"
import Link from "next/link"
import { getPayload } from "@/src/lib/payload"
import { generateMetadata as generateSEOMetadata, generateStructuredData, generateBreadcrumbStructuredData } from "@/lib/seo"
import { Metadata } from "next"

export const metadata: Metadata = generateSEOMetadata({
  title: "Lab News & Research Updates",
  description: "Stay informed about our latest research breakthroughs, achievements, collaborations, and lab activities. Discover cutting-edge developments in cyber-physical systems, IoT, and technology innovation.",
  url: "/news",
  type: "website",
})

interface NewsWithAuthor {
  id: string
  title: string
  slug: string
  excerpt?: string
  publishedDate: string
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

interface NewsPageProps {
  searchParams: Promise<{
    category?: string
    sort?: 'newest' | 'oldest' | 'featured'
    page?: string
  }>
}

async function getNewsData(searchParams: {
  category?: string
  sort?: 'newest' | 'oldest' | 'featured'
  page?: string
}): Promise<{
  news: NewsWithAuthor[]
  totalCount: number
  totalPages: number
}> {
  try {
    const payload = await getPayload()
    const page = parseInt(searchParams.page || '1')
    const limit = 12
    const skip = (page - 1) * limit

    // Build where condition
    const whereCondition: any = {
      isPublished: {
        equals: true,
      },
    }

    if (searchParams.category && searchParams.category !== 'all') {
      whereCondition.category = {
        equals: searchParams.category,
      }
    }

    // Determine sort order
    let sort = '-publishedDate' // Default: newest first
    switch (searchParams.sort) {
      case 'oldest':
        sort = 'publishedDate'
        break
      case 'featured':
        sort = '-isFeatured,-publishedDate'
        break
      case 'newest':
      default:
        sort = '-publishedDate'
        break
    }

    const { docs: news, totalDocs } = await payload.find({
      collection: 'lab-news',
      where: whereCondition,
      sort,
      depth: 2,
      limit,
      page,
    })

    const totalPages = Math.ceil(totalDocs / limit)

    return {
      news: news as NewsWithAuthor[],
      totalCount: totalDocs,
      totalPages,
    }
  } catch (error) {
    console.error('Error fetching news:', error)
    return {
      news: [],
      totalCount: 0,
      totalPages: 0,
    }
  }
}

export default async function NewsPage({ searchParams }: NewsPageProps) {
  const resolvedSearchParams = await searchParams
  const { news, totalCount, totalPages } = await getNewsData(resolvedSearchParams)
  const currentPage = parseInt(resolvedSearchParams.page || '1')
  
  // Generate structured data
  const breadcrumbStructuredData = generateBreadcrumbStructuredData([
    { name: 'Home', url: '/' },
    { name: 'News', url: '/news' },
  ])

  const organizationStructuredData = generateStructuredData({
    type: 'Organization',
  })
  const categories = [
    { value: "all", label: "All News", icon: "📰" },
    { value: "lab-update", label: "Lab Updates", icon: "🔬" },
    { value: "research-achievement", label: "Research", icon: "🎓" },
    { value: "publication", label: "Publications", icon: "📄" },
    { value: "event", label: "Events", icon: "🎪" },
    { value: "award", label: "Awards", icon: "🏆" },
    { value: "collaboration", label: "Partnerships", icon: "🤝" },
  ]

  const sortOptions = [
    { value: "newest", label: "Newest First" },
    { value: "oldest", label: "Oldest First" },
    { value: "featured", label: "Featured First" },
  ]

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

  const createUrl = (params: { category?: string; sort?: string; page?: string }) => {
    const url = new URLSearchParams()
    
    // Add current search params
    Object.entries(resolvedSearchParams).forEach(([key, value]) => {
      if (value && value !== 'all') {
        url.set(key, value)
      }
    })
    
    // Override with new params
    Object.entries(params).forEach(([key, value]) => {
      if (value && value !== 'all') {
        url.set(key, value)
      } else {
        url.delete(key)
      }
    })

    const queryString = url.toString()
    return queryString ? `/news?${queryString}` : '/news'
  }

  const featuredNews = news.filter(item => item.isFeatured).slice(0, 2)
  const regularNews = news.filter(item => !item.isFeatured || !featuredNews.includes(item))

  // Fallback content if no news is available
  if (news.length === 0) {
    return (
      <div className="relative min-h-screen bg-black">
        <BackgroundPaths />
        <AnimatedBackground />
        <BackgroundStripes />

        <div className="relative z-10">
          <Navbar />
          
          {/* Hero Section */}
          <section className="pt-32 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                  Lab News & Updates
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Stay informed about our latest research breakthroughs, achievements, 
                  collaborations, and lab activities.
                </p>
              </div>
            </div>
          </section>

          {/* No News Message */}
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-12 border border-gray-700/50">
                <h2 className="text-3xl font-bold text-white mb-6">
                  No News Available Yet
                </h2>
                <p className="text-xl text-gray-300 mb-8">
                  We're working on bringing you the latest updates from our lab. 
                  Check back soon for exciting news about our research and achievements!
                </p>
                <Link
                  href="/research"
                  className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Explore Our Research
                </Link>
              </div>
            </div>
          </section>

          <AnimatedFooter />
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      
      <BackgroundPaths />
      <AnimatedBackground />
      <BackgroundStripes />

      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <section className="pt-32 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Lab News & Updates
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                Stay informed about our latest research breakthroughs, achievements, 
                collaborations, and lab activities.
              </p>
              <div className="text-sm text-gray-400">
                {totalCount} {totalCount === 1 ? 'article' : 'articles'} found
              </div>
            </div>
          </div>
        </section>

        {/* Filters and Sort */}
        <section className="pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => {
                  const isActive = resolvedSearchParams.category === category.value || 
                    (!resolvedSearchParams.category && category.value === 'all')
                  return (
                    <Link
                      key={category.value}
                      href={createUrl({ category: category.value, page: '1' })}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                        isActive
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:text-white hover:border-blue-500/50'
                      }`}
                    >
                      <span>{category.icon}</span>
                      <span className="text-sm font-medium">{category.label}</span>
                    </Link>
                  )
                })}
              </div>

              {/* Sort Options */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">Sort by:</span>
                <div className="flex space-x-2">
                  {sortOptions.map((option) => {
                    const isActive = resolvedSearchParams.sort === option.value || 
                      (!resolvedSearchParams.sort && option.value === 'newest')
                    return (
                      <Link
                        key={option.value}
                        href={createUrl({ sort: option.value, page: '1' })}
                        className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-800/50 text-gray-300 hover:text-white hover:bg-gray-700/50'
                        }`}
                      >
                        {option.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <section className="pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Featured News */}
                {featuredNews.length > 0 && (
                  <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6">Featured News</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {featuredNews.map((item) => (
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
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)}`}>
                                {item.category.replace("-", " ").toUpperCase()}
                              </span>
                            </div>
                            <div className="absolute top-4 right-4">
                              <span className="px-2 py-1 bg-orange-500 text-white text-xs font-bold rounded">
                                FEATURED
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                              <span>By {item.author.name || item.author.email}</span>
                              <span>{formatDate(item.publishedDate)}</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                              {item.title}
                            </h3>
                            {item.excerpt && (
                              <p className="text-gray-300 mb-4 line-clamp-2">{item.excerpt}</p>
                            )}
                            {item.tags && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {item.tags.slice(0, 3).map((tag, index) => (
                                  <span
                                    key={index}
                                    className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs"
                                  >
                                    {tag.tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Regular News */}
                {regularNews.length > 0 ? (
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6">
                      {featuredNews.length > 0 ? 'Latest Updates' : 'All News'}
                    </h2>
                    <div className="grid gap-6">
                      {regularNews.map((item) => (
                        <Link
                          key={item.id}
                          href={`/news/${item.slug}`}
                          className="group block bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/30 transition-all duration-300"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
                            {item.featuredImage?.url && (
                              <div className="lg:w-1/4 mb-4 lg:mb-0">
                                <img
                                  src={item.featuredImage.url}
                                  alt={item.featuredImage.alt || item.title}
                                  className="w-full h-48 lg:h-32 object-cover rounded-lg"
                                />
                              </div>
                            )}
                            <div className="lg:w-3/4">
                              <div className="flex items-center justify-between mb-3">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(item.category)}`}>
                                  {item.category.replace("-", " ").toUpperCase()}
                                </span>
                                <div className="text-sm text-gray-400">
                                  {formatDate(item.publishedDate)}
                                </div>
                              </div>
                              
                              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                                {item.title}
                              </h3>
                              
                              <p className="text-gray-400 text-sm mb-2">
                                By {item.author.name || item.author.email}
                              </p>
                              
                              {item.excerpt && (
                                <p className="text-gray-300 mb-4 line-clamp-2">{item.excerpt}</p>
                              )}
                              
                              {item.tags && item.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                  {item.tags.slice(0, 4).map((tag, index) => (
                                    <span
                                      key={index}
                                      className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs"
                                    >
                                      {tag.tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                      <div className="flex justify-center items-center space-x-2 mt-12">
                        {/* Previous Page */}
                        {currentPage > 1 && (
                          <Link
                            href={createUrl({ page: (currentPage - 1).toString() })}
                            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            Previous
                          </Link>
                        )}

                        {/* Page Numbers */}
                        {[...Array(totalPages)].map((_, i) => {
                          const pageNum = i + 1
                          const isActive = pageNum === currentPage
                          
                          return (
                            <Link
                              key={pageNum}
                              href={createUrl({ page: pageNum.toString() })}
                              className={`px-4 py-2 rounded-lg transition-colors ${
                                isActive
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                              }`}
                            >
                              {pageNum}
                            </Link>
                          )
                        })}

                        {/* Next Page */}
                        {currentPage < totalPages && (
                          <Link
                            href={createUrl({ page: (currentPage + 1).toString() })}
                            className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            Next
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-2xl font-bold text-white mb-4">No News Found</h3>
                    <p className="text-gray-400 mb-6">
                      No news articles match your current filters.
                    </p>
                    <Link
                      href="/news"
                      className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                    >
                      View All News
                    </Link>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-8">
                  <RecentNews limit={5} />
                  
                  {/* Quick Stats */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <h3 className="text-lg font-bold text-white mb-4">News Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Total Articles</span>
                        <span className="text-white font-semibold">{totalCount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Current Page</span>
                        <span className="text-white font-semibold">{currentPage} of {totalPages}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Featured</span>
                        <span className="text-white font-semibold">{featuredNews.length}</span>
                      </div>
                    </div>
                  </div>

                  {/* Categories Overview */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50">
                    <h3 className="text-lg font-bold text-white mb-4">Categories</h3>
                    <div className="space-y-2">
                      {categories.slice(1).map((category) => (
                        <Link
                          key={category.value}
                          href={createUrl({ category: category.value, page: '1' })}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-700/30 transition-colors group"
                        >
                          <div className="flex items-center space-x-2">
                            <span>{category.icon}</span>
                            <span className="text-gray-300 text-sm group-hover:text-white">
                              {category.label}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500">→</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl p-12 border border-gray-700/50">
              <h2 className="text-3xl font-bold text-white mb-6">
                Stay Updated
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Subscribe to our newsletter to receive the latest updates about our research, 
                publications, and lab activities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <button className="px-8 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </section>

        <AnimatedFooter />
      </div>
    </div>
  )
}
