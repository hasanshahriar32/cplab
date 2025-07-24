import { NextRequest, NextResponse } from 'next/server';
import { NewsletterService } from '../../../../src/lib/newsletter';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { campaignId, subject, content, htmlContent, targetAudience } = body;

    if (!campaignId || !subject || (!content && !htmlContent)) {
      return NextResponse.json(
        { error: 'Campaign ID, subject, and content are required' },
        { status: 400 }
      );
    }

    // Fetch campaign details
    const campaignResponse = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/newsletter-campaigns/${campaignId}`);
    if (!campaignResponse.ok) {
      return NextResponse.json(
        { error: 'Campaign not found' },
        { status: 404 }
      );
    }

    const campaign = await campaignResponse.json();

    // Fetch subscribers based on target audience
    let subscriberQuery = 'where[status][equals]=active';
    
    if (targetAudience && !targetAudience.includes('all')) {
      const interests = targetAudience.map((interest: string) => `where[interests][contains]=${interest}`).join('&');
      subscriberQuery += `&${interests}`;
    }

    const subscribersResponse = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/newsletter-subscribers?${subscriberQuery}`);
    if (!subscribersResponse.ok) {
      throw new Error('Failed to fetch subscribers');
    }

    const { docs: subscribers } = await subscribersResponse.json();

    if (subscribers.length === 0) {
      return NextResponse.json(
        { error: 'No active subscribers found for the target audience' },
        { status: 400 }
      );
    }

    // Update campaign status to sending
    await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/newsletter-campaigns/${campaignId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'sending',
        recipientCount: subscribers.length,
      }),
    });

    // Send broadcast
    const finalHtmlContent = htmlContent || NewsletterService.createNewsletterTemplate(content, subject);
    
    const results = await NewsletterService.sendBroadcast({
      subject,
      htmlContent: finalHtmlContent,
      textContent: content,
      subscribers: subscribers.map((sub: any) => ({
        email: sub.email,
        firstName: sub.firstName,
        lastName: sub.lastName,
        interests: sub.interests,
      })),
    });

    // Update campaign with results
    const finalStatus = results.failed === 0 ? 'sent' : (results.success === 0 ? 'failed' : 'sent');
    
    await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/newsletter-campaigns/${campaignId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: finalStatus,
        sentAt: new Date(),
        successCount: results.success,
        failureCount: results.failed,
        errors: results.errors,
      }),
    });

    return NextResponse.json({
      success: true,
      message: 'Newsletter sent successfully',
      results: {
        totalRecipients: subscribers.length,
        successful: results.success,
        failed: results.failed,
        errors: results.errors,
      },
    });

  } catch (error) {
    console.error('Newsletter broadcast error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send newsletter', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Newsletter broadcast endpoint',
    endpoints: {
      POST: '/api/newsletter/send',
      required: ['campaignId', 'subject', 'content or htmlContent'],
      optional: ['targetAudience'],
      example: {
        campaignId: '12345',
        subject: 'Monthly Research Update',
        content: 'This month we published...',
        htmlContent: '<h1>Monthly Update</h1><p>This month we published...</p>',
        targetAudience: ['research', 'publications']
      }
    }
  });
}
