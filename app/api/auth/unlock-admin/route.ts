import type { NextRequest } from 'next/server';
import { getPayload } from 'payload';
import config from '../../../../payload-config';

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config });
    const { email } = await request.json();

    if (!email) {
      return Response.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Find the user
    const users = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email.toLowerCase(),
        },
      },
    });

    if (users.docs.length === 0) {
      return Response.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const user = users.docs[0];

    // Only unlock admin users
    if (user.role !== 'admin') {
      return Response.json(
        { error: 'Only admin users can be unlocked through this endpoint' },
        { status: 403 }
      );
    }

    // Unlock the user
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        loginAttempts: 0,
        lockUntil: null,
      },
    });

    return Response.json({
      success: true,
      message: 'Admin user unlocked successfully',
    });
  } catch (error) {
    console.error('Error unlocking admin user:', error);
    return Response.json(
      { error: 'Failed to unlock admin user' },
      { status: 500 }
    );
  }
}
