import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '../../../payload-config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const { searchParams } = new URL(request.url)
    
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search')
    const featured = searchParams.get('featured')

    let where: any = {
      isPublic: {
        equals: true
      }
    }

    // Add featured filter
    if (featured === 'true') {
      where.isFeatured = {
        equals: true
      }
    }

    // Add search filter
    if (search) {
      where.or = [
        {
          displayName: {
            contains: search
          }
        },
        {
          position: {
            contains: search
          }
        },
        {
          bio: {
            contains: search
          }
        }
      ]
    }

    const profiles = await payload.find({
      collection: 'profiles',
      where,
      page,
      limit,
      depth: 2,
      sort: '-createdAt'
    })

    return NextResponse.json(profiles)
  } catch (error) {
    console.error('Error fetching profiles:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayloadHMR({ config: configPromise })
    const data = await request.json()

    // Get user from request
    const userId = request.headers.get('x-user-id')
    const userRole = request.headers.get('x-user-role')

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check if user already has a profile
    const existingProfile = await payload.find({
      collection: 'profiles',
      where: {
        user: {
          equals: userId
        }
      }
    })

    if (existingProfile.docs.length > 0) {
      return NextResponse.json(
        { error: 'User already has a profile' },
        { status: 409 }
      )
    }

    // Ensure user field is set to current user (unless admin creating for someone else)
    if (userRole !== 'admin') {
      data.user = userId
    }

    // Create profile
    const newProfile = await payload.create({
      collection: 'profiles',
      data: data,
    })

    return NextResponse.json(newProfile, { status: 201 })
  } catch (error) {
    console.error('Error creating profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
