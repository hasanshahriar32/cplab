import { getPayload } from "@/src/lib/payload"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '5')
    const exclude = searchParams.get('exclude')

    const payload = await getPayload()
    
    const whereCondition: any = {
      isPublished: {
        equals: true,
      },
    }

    // Exclude current article if specified
    if (exclude) {
      whereCondition.slug = {
        not_equals: exclude,
      }
    }

    const { docs: news } = await payload.find({
      collection: 'lab-news',
      where: whereCondition,
      sort: '-publishedDate',
      depth: 1,
      limit: limit,
      select: {
        id: true,
        title: true,
        slug: true,
        publishedDate: true,
        category: true,
        featuredImage: true,
      },
    })

    return NextResponse.json({
      success: true,
      news: news.map(item => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        publishedDate: item.publishedDate,
        category: item.category,
        featuredImage: typeof item.featuredImage === 'object' && item.featuredImage ? {
          url: (item.featuredImage as any).url,
          alt: (item.featuredImage as any).alt,
        } : undefined,
      })),
    })
  } catch (error) {
    console.error('Error fetching recent news:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch recent news' },
      { status: 500 }
    )
  }
}
