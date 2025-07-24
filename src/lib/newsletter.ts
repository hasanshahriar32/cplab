import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface NewsletterSubscriber {
  email: string;
  firstName?: string;
  lastName?: string;
  interests?: string[];
}

interface BroadcastEmailOptions {
  subject: string;
  htmlContent?: string;
  textContent?: string;
  subscribers: NewsletterSubscriber[];
  fromName?: string;
  fromEmail?: string;
}

export class NewsletterService {
  static async sendBroadcast({
    subject,
    htmlContent,
    textContent,
    subscribers,
    fromName = process.env.SMTP_FROM_NAME || 'Cyber Physical Lab',
    fromEmail = process.env.SMTP_FROM_EMAIL || 'noreply@hkd.paradox-bd.com'
  }: BroadcastEmailOptions) {
    const results = {
      success: 0,
      failed: 0,
      errors: [] as Array<{ email: string; error: string; timestamp: Date }>
    };

    // Send emails in batches to avoid rate limits
    const batchSize = 100;
    const batches = [];
    
    for (let i = 0; i < subscribers.length; i += batchSize) {
      batches.push(subscribers.slice(i, i + batchSize));
    }

    for (const batch of batches) {
      const emailPromises = batch.map(async (subscriber) => {
        try {
          // Personalize the content
          let personalizedHtml = htmlContent || '';
          let personalizedText = textContent || '';
          
          const name = subscriber.firstName || 'Subscriber';
          personalizedHtml = personalizedHtml.replace(/{{firstName}}/g, name);
          personalizedText = personalizedText.replace(/{{firstName}}/g, name);
          
          const unsubscribeUrl = `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/unsubscribe?token=${subscriber.email}`;
          personalizedHtml += `
            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; font-size: 12px; color: #666;">
              <p>You received this email because you subscribed to Cyber Physical Lab updates.</p>
              <p><a href="${unsubscribeUrl}" style="color: #666;">Unsubscribe</a> | <a href="${process.env.PAYLOAD_PUBLIC_SERVER_URL}" style="color: #666;">Visit our website</a></p>
            </div>
          `;

          await resend.emails.send({
            from: `${fromName} <${fromEmail}>`,
            to: [subscriber.email],
            subject,
            html: personalizedHtml,
            text: personalizedText,
          });

          results.success++;
        } catch (error) {
          results.failed++;
          results.errors.push({
            email: subscriber.email,
            error: error instanceof Error ? error.message : 'Unknown error',
            timestamp: new Date(),
          });
        }
      });

      // Wait for current batch to complete before proceeding
      await Promise.allSettled(emailPromises);
      
      // Add a small delay between batches to be respectful to the API
      if (batches.indexOf(batch) < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    return results;
  }

  static async addSubscriber({
    email,
    firstName,
    lastName,
    interests = ['general'],
    source = 'website'
  }: {
    email: string;
    firstName?: string;
    lastName?: string;
    interests?: string[];
    source?: string;
  }) {
    try {
      // This would typically integrate with your Payload CMS API
      const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/newsletter-subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          interests,
          source,
          status: 'active',
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add subscriber: ${response.statusText}`);
      }

      const subscriber = await response.json();
      
      // Send welcome email
      await this.sendWelcomeEmail(subscriber.doc);
      
      return { success: true, subscriber: subscriber.doc };
    } catch (error) {
      console.error('Error adding subscriber:', error);
      throw error;
    }
  }

  static async sendWelcomeEmail(subscriber: NewsletterSubscriber) {
    try {
      const welcomeHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #007cba; color: white; padding: 20px; text-align: center;">
            <h1>Welcome to Cyber Physical Lab!</h1>
          </div>
          <div style="padding: 30px;">
            <h2>Thank you for subscribing, ${subscriber.firstName || 'there'}!</h2>
            <p>We're excited to have you join our community. You'll receive updates about:</p>
            <ul>
              <li>Latest research findings and publications</li>
              <li>Lab news and events</li>
              <li>Job opportunities and collaborations</li>
              <li>Industry insights and trends</li>
            </ul>
            <p>You can update your preferences or unsubscribe at any time.</p>
            <p>Best regards,<br>The Cyber Physical Lab Team</p>
          </div>
          <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 2px solid #007cba;">
            <p><small>© ${new Date().getFullYear()} Cyber Physical Lab. All rights reserved.</small></p>
          </div>
        </div>
      `;

      await resend.emails.send({
        from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: [subscriber.email],
        subject: 'Welcome to Cyber Physical Lab Newsletter!',
        html: welcomeHtml,
      });

      return { success: true };
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return { success: false, error };
    }
  }

  static createNewsletterTemplate(content: string, title?: string) {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <div style="background-color: #007cba; color: white; padding: 20px; text-align: center;">
          <h1>${title || 'Cyber Physical Lab Newsletter'}</h1>
        </div>
        <div style="padding: 30px; line-height: 1.6;">
          ${content}
        </div>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 2px solid #007cba;">
          <p><small>© ${new Date().getFullYear()} Cyber Physical Lab. All rights reserved.</small></p>
        </div>
      </div>
    `;
  }
}

export default NewsletterService;
