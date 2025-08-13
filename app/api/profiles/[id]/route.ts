import { NextRequest, NextResponse } from 'next/server'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '../../../../payload-config'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const payload = await getPayloadHMR({ config: configPromise })

    // First try to find by slug
    let profile = null
    
    const profileBySlug = await payload.find({
      collection: 'profiles',
      where: {
        slug: {
          equals: id,
        },
      },
      depth: 3,
    })

    if (profileBySlug.docs.length > 0) {
      profile = profileBySlug.docs[0]
    } else {
      // Then try to find by ID
      try {
        profile = await payload.findByID({
          collection: 'profiles',
          id: id,
          depth: 3,
        })
      } catch (error) {
        // Profile not found by ID either
      }
    }

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      )
    }

    // Check if profile is public or user has access
    const user = request.headers.get('x-user-id')
    if (!profile.isPublic && (!user || (user !== profile.user?.id && user !== 'admin'))) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      )
    }

    return NextResponse.json(profile)
  } catch (error) {
    console.error('Error fetching profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const payload = await getPayloadHMR({ config: configPromise })
    const data = await request.json()

    // Get user from request (you'll need to implement proper auth)
    const userId = request.headers.get('x-user-id')
    const userRole = request.headers.get('x-user-role')

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get existing profile to check ownership
    const existingProfile = await payload.findByID({
      collection: 'profiles',
      id: id,
      depth: 1,
    })

    // Check if user can update this profile
    const canUpdate = userRole === 'admin' || existingProfile.user?.id === userId

    if (!canUpdate) {
      return NextResponse.json(
        { error: 'Permission denied' },
        { status: 403 }
      )
    }

    // Update profile
    const updatedProfile = await payload.update({
      collection: 'profiles',
      id: id,
      data: data,
    })

    return NextResponse.json(updatedProfile)
  } catch (error) {
    console.error('Error updating profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const payload = await getPayloadHMR({ config: configPromise })

    // Get user from request
    const userId = request.headers.get('x-user-id')
    const userRole = request.headers.get('x-user-role')

    if (!userId) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get existing profile to check ownership
    const existingProfile = await payload.findByID({
      collection: 'profiles',
      id: id,
      depth: 1,
    })

    // Check if user can delete this profile
    const canDelete = userRole === 'admin' || existingProfile.user?.id === userId

    if (!canDelete) {
      return NextResponse.json(
        { error: 'Permission denied' },
        { status: 403 }
      )
    }

    // Delete profile
    await payload.delete({
      collection: 'profiles',
      id: id,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
