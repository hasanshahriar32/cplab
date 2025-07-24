import NewsletterService from '@/src/lib/newsletter';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, interests, source } = body;

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const result = await NewsletterService.addSubscriber({
      email,
      firstName,
      lastName,
      interests: interests || ['general'],
      source: source || 'website',
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      subscriber: result.subscriber,
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    // Handle duplicate email error
    if (error instanceof Error && error.message.includes('duplicate')) {
      return NextResponse.json(
        { error: 'This email is already subscribed to our newsletter' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { 
        error: 'Failed to subscribe to newsletter', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Newsletter subscription endpoint',
    endpoints: {
      POST: '/api/newsletter/subscribe',
      required: ['email'],
      optional: ['firstName', 'lastName', 'interests', 'source'],
      example: {
        email: 'user@example.com',
        firstName: 'John',
        lastName: 'Doe',
        interests: ['research', 'news'],
        source: 'website'
      }
    }
  });
}
