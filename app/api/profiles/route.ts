import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import configPromise from '../../../payload-config'

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config: configPromise })
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
    const payload = await getPayload({ config: configPromise })
    
    // Better parsing with multipart/form-data support
    let data
    const contentType = request.headers.get('content-type') || ''
    
    if (contentType.includes('multipart/form-data')) {
      // Handle multipart/form-data (PayloadCMS admin panel)
      console.log('Parsing multipart/form-data request')
      const formData = await request.formData()
      const payloadData = formData.get('_payload')
      
      if (typeof payloadData === 'string') {
        try {
          data = JSON.parse(payloadData)
          console.log('Parsed payload data:', JSON.stringify(data, null, 2))
        } catch (parseError) {
          console.error('Error parsing _payload field:', parseError)
          return NextResponse.json(
            { error: 'Invalid JSON in _payload field' },
            { status: 400 }
          )
        }
      } else {
        console.error('_payload field not found in form data')
        return NextResponse.json(
          { error: '_payload field not found in form data' },
          { status: 400 }
        )
      }
    } else if (contentType.includes('application/json')) {
      // Handle JSON requests (API calls)
      try {
        const body = await request.text()
        console.log('Raw JSON request body:', body)
        console.log('Body length:', body.length)
        
        if (!body || body.trim() === '') {
          return NextResponse.json(
            { error: 'Request body is empty' },
            { status: 400 }
          )
        }
        data = JSON.parse(body)
      } catch (jsonError) {
        console.error('JSON parsing error:', jsonError)
        return NextResponse.json(
          { error: 'Invalid JSON format in request body', details: (jsonError as Error).message },
          { status: 400 }
        )
      }
    } else {
      return NextResponse.json(
        { error: 'Unsupported content type. Use application/json or multipart/form-data' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!data.displayName) {
      return NextResponse.json(
        { error: 'Display name is required' },
        { status: 400 }
      )
    }

    if (!data.user) {
      return NextResponse.json(
        { error: 'User is required' },
        { status: 400 }
      )
    }

    // Check if user already has a profile
    const existingProfile = await payload.find({
      collection: 'profiles',
      where: {
        user: {
          equals: data.user
        }
      }
    })

    if (existingProfile.docs.length > 0) {
      return NextResponse.json(
        { error: 'User already has a profile' },
        { status: 409 }
      )
    }

    // Create profile
    const newProfile = await payload.create({
      collection: 'profiles',
      data: data,
    })

    console.log('Profile created successfully:', newProfile.id)
    return NextResponse.json(newProfile, { status: 201 })
  } catch (error) {
    console.error('Error creating profile:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
