import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '../../../../payload-config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
    
    // Create a simple test profile
    const testProfile = {
      displayName: "Test User",
      position: "Test Position",
      department: "Test Department", 
      bio: "This is a test profile created via API",
      isPublic: true,
      user: "677e0c5b3b18e4a0f01a8fdc", // You'll need to replace this with an actual user ID
      slug: "test-user-" + Date.now(), // Make it unique
      socialLinks: {
        email: "test@example.com",
      },
      preferences: {
        showEmail: true,
        showPhone: false,
      }
    }

    console.log('Creating test profile:', testProfile)

    const profile = await payload.create({
      collection: 'profiles',
      data: testProfile,
    })

    return NextResponse.json({
      success: true,
      profile: profile,
      message: 'Test profile created successfully'
    })

  } catch (error) {
    console.error('Error creating test profile:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create test profile', 
        details: (error as Error).message 
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Test profile creation endpoint. Use POST to create a test profile.',
  })
}
