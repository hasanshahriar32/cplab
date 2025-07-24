import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '../../../payload-config';

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName, audienceId } = await request.json();

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

    // Check if audience exists and is active
    const audience = await payload.findByID({
      collection: 'audiences',
      id: audienceId,
    });

    if (!audience) {
      return NextResponse.json(
        { error: 'Audience not found' },
        { status: 404 }
      );
    }

    if (!audience.isActive) {
      return NextResponse.json(
        { error: 'This audience is not accepting new subscriptions' },
        { status: 400 }
      );
    }

    // Check if contact already exists
    const existingContacts = await payload.find({
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

    if (existingContacts.docs.length > 0) {
      const existingContact = existingContacts.docs[0];
      
      if (existingContact.subscribed) {
        return NextResponse.json({
          success: true,
          message: 'You are already subscribed to this audience',
          data: {
            contact: existingContact,
            alreadySubscribed: true,
          },
        });
      } else {
        // Resubscribe existing contact
        const updatedContact = await payload.update({
          collection: 'contacts',
          id: existingContact.id,
          data: {
            subscribed: true,
            firstName: firstName || existingContact.firstName,
            lastName: lastName || existingContact.lastName,
            source: 'website',
          },
        });

        return NextResponse.json({
          success: true,
          message: 'Successfully resubscribed to the audience',
          data: {
            contact: updatedContact,
            resubscribed: true,
          },
        });
      }
    }

    // Create new contact
    const newContact = await payload.create({
      collection: 'contacts',
      data: {
        email: email.toLowerCase(),
        firstName: firstName || '',
        lastName: lastName || '',
        audience: audienceId,
        subscribed: true,
        source: 'website',
        subscribedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to the audience',
      data: {
        contact: newContact,
        newSubscription: true,
      },
    });

  } catch (error) {
    console.error('Error subscribing to audience:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again later.' },
      { status: 500 }
    );
  }
}
