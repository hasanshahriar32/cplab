import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '../../../payload-config';

export async function POST(request: NextRequest) {
  try {
    const { email, audienceId } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    if (!audienceId) {
      return NextResponse.json(
        { error: 'Audience ID is required' },
        { status: 400 }
      );
    }

    const payload = await getPayload({ config });

    // Find the contact
    const contacts = await payload.find({
      collection: 'contacts',
      where: {
        and: [
          {
            email: {
              equals: email.toLowerCase(),
            },
          },
          {
            audience: {
              equals: audienceId,
            },
          },
        ],
      },
    });

    if (contacts.docs.length === 0) {
      return NextResponse.json(
        { error: 'No subscription found for this email address' },
        { status: 404 }
      );
    }

    const contact = contacts.docs[0];

    if (!contact.subscribed) {
      return NextResponse.json({
        success: true,
        message: 'You are already unsubscribed',
        data: {
          contact,
          alreadyUnsubscribed: true,
        },
      });
    }

    // Unsubscribe the contact
    const updatedContact = await payload.update({
      collection: 'contacts',
      id: contact.id,
      data: {
        subscribed: false,
        unsubscribedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully unsubscribed from the audience',
      data: {
        contact: updatedContact,
      },
    });

  } catch (error) {
    console.error('Error unsubscribing from audience:', error);
    return NextResponse.json(
      { error: 'Failed to unsubscribe. Please try again later.' },
      { status: 500 }
    );
  }
}
