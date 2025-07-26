'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

interface RecentNewsItem {
  id: string
  title: string
  slug: string
  publishedDate: string
  category: string
  featuredImage?: {
    url?: string
    alt?: string
  }
}

interface RecentNewsProps {
  limit?: number
  className?: string
  currentSlug?: string // To exclude current article
}

export function RecentNews({ limit = 5, className = "", currentSlug }: RecentNewsProps) {
  const [recentNews, setRecentNews] = useState<RecentNewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchRecentNews() {
      try {
        setLoading(true)
        const response = await fetch('/api/recent-news?' + new URLSearchParams({
          limit: limit.toString(),
          ...(currentSlug && { exclude: currentSlug })
        }))
        
        if (response.ok) {
          const data = await response.json()
          setRecentNews(data.news || [])
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Error fetching recent news:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchRecentNews()
  }, [limit, currentSlug])

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
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  if (loading) {
    return (
      <div className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 ${className}`}>
        <h3 className="text-xl font-bold text-white mb-6">Recent News</h3>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-700 rounded mb-2"></div>
              <div className="h-3 bg-gray-700 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error || recentNews.length === 0) {
    return (
      <div className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 ${className}`}>
        <h3 className="text-xl font-bold text-white mb-6">Recent News</h3>
        <p className="text-gray-400 text-sm">No recent news available.</p>
      </div>
    )
  }

  return (
    <div className={`bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 ${className}`}>
      <h3 className="text-xl font-bold text-white mb-6">Recent News</h3>
      <div className="space-y-4">
        {recentNews.map((item) => (
          <Link
            key={item.id}
            href={`/news/${item.slug}`}
            className="group block"
          >
            <article className="flex space-x-3 hover:bg-gray-700/30 p-2 rounded-lg transition-colors">
              {item.featuredImage?.url && (
                <div className="flex-shrink-0">
                  <img
                    src={item.featuredImage.url}
                    alt={item.featuredImage.alt || item.title}
                    className="w-16 h-16 object-cover rounded-lg border border-gray-600"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium text-sm group-hover:text-blue-400 transition-colors line-clamp-2 mb-1">
                  {item.title}
                </h4>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(item.category)}`}>
                    {item.category.replace("-", " ").toUpperCase()}
                  </span>
                  <time className="text-gray-400 text-xs">
                    {formatDate(item.publishedDate)}
                  </time>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-700">
        <Link
          href="/news"
          className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center"
        >
          View All News →
        </Link>
      </div>
    </div>
  )
}
