import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, email } = body;

    if (!token && !email) {
      return NextResponse.json(
        { error: 'Token or email is required' },
        { status: 400 }
      );
    }

    // Find subscriber by token or email
    const searchCriteria = token ? { unsubscribeToken: token } : { email };
    
    const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/newsletter-subscribers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch subscribers');
    }

    const { docs: subscribers } = await response.json();
    const subscriber = subscribers.find((sub: any) => 
      token ? sub.unsubscribeToken === token : sub.email === email
    );

    if (!subscriber) {
      return NextResponse.json(
        { error: 'Subscriber not found' },
        { status: 404 }
      );
    }

    if (subscriber.status === 'unsubscribed') {
      return NextResponse.json(
        { message: 'Already unsubscribed' },
        { status: 200 }
      );
    }

    // Update subscriber status
    const updateResponse = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/newsletter-subscribers/${subscriber.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'unsubscribed',
        unsubscribedAt: new Date(),
      }),
    });

    if (!updateResponse.ok) {
      throw new Error('Failed to unsubscribe');
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter',
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to unsubscribe', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  if (!token && !email) {
    return NextResponse.json(
      { error: 'Token or email parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Auto-unsubscribe via GET request (for email links)
    const result = await fetch(`${request.url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, email }),
    });

    const data = await result.json();

    if (result.ok) {
      return new NextResponse(`
        <html>
          <head><title>Unsubscribed</title></head>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; text-align: center;">
            <h2>Successfully Unsubscribed</h2>
            <p>You have been unsubscribed from the Cyber Physical Lab newsletter.</p>
            <p>We're sorry to see you go!</p>
            <a href="${process.env.PAYLOAD_PUBLIC_SERVER_URL}" style="color: #007cba;">Visit our website</a>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' },
      });
    } else {
      return new NextResponse(`
        <html>
          <head><title>Unsubscribe Error</title></head>
          <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; text-align: center;">
            <h2>Unsubscribe Error</h2>
            <p>${data.error || 'Failed to unsubscribe'}</p>
            <a href="${process.env.PAYLOAD_PUBLIC_SERVER_URL}" style="color: #007cba;">Visit our website</a>
          </body>
        </html>
      `, {
        headers: { 'Content-Type': 'text/html' },
        status: result.status,
      });
    }

  } catch (error) {
    return new NextResponse(`
      <html>
        <head><title>Unsubscribe Error</title></head>
        <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; text-align: center;">
          <h2>Unsubscribe Error</h2>
          <p>An error occurred while processing your unsubscribe request.</p>
          <a href="${process.env.PAYLOAD_PUBLIC_SERVER_URL}" style="color: #007cba;">Visit our website</a>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' },
      status: 500,
    });
  }
}
