import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '../../../payload-config';

export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config });

    // Get all active audiences
    const audiences = await payload.find({
      collection: 'audiences',
      where: {
        isActive: {
          equals: true,
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: audiences.docs,
    });

  } catch (error) {
    console.error('Error fetching audiences:', error);
    return NextResponse.json(
      { error: 'Failed to fetch audiences' },
      { status: 500 }
    );
  }
}
