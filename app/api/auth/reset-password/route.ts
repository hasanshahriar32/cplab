import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Use Payload's API to reset the password
    const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/users/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({
        success: true,
        message: 'Password reset successfully',
      });
    } else {
      return NextResponse.json(
        { error: data.message || 'Failed to reset password' },
        { status: response.status }
      );
    }

  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Failed to reset password' },
      { status: 500 }
    );
  }
}
