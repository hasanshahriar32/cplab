import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    // Use Payload's API to verify the reset token
    const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/users/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        password: 'temp-password-for-verification', // This will fail but help us verify token
      }),
    });

    // If token is invalid, Payload will return an error
    // If token is valid but password is wrong, we'll get a different error
    const data = await response.json();
    
    if (response.status === 400 && data.message?.includes('token')) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Token is valid (even if password verification failed)
    return NextResponse.json({ valid: true });

  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify token' },
      { status: 500 }
    );
  }
}
