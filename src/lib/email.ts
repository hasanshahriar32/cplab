import nodemailer from 'nodemailer';

// Create transporter using environment variables
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

interface EmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
  from?: string;
}

export const sendEmail = async (options: EmailOptions) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: options.from || `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// Email templates
export const emailTemplates = {
  contactForm: (data: { name: string; email: string; message: string }) => ({
    subject: `New Contact Form Submission from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Contact Form Submission</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 3px; margin-top: 10px;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p><small>This email was sent from the Cyber Lab contact form.</small></p>
      </div>
    `,
  }),
  
  inquiryForm: (data: { 
    name: string; 
    email: string; 
    company?: string; 
    service: string; 
    message: string; 
  }) => ({
    subject: `New Service Inquiry from ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>New Service Inquiry</h2>
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
          <p><strong>Service Interested:</strong> ${data.service}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 3px; margin-top: 10px;">
            ${data.message.replace(/\n/g, '<br>')}
          </div>
        </div>
        <p><small>This email was sent from the Cyber Lab service inquiry form.</small></p>
      </div>
    `,
  }),
  
  newsletter: (data: { name: string; content: string }) => ({
    subject: `Cyber Lab Newsletter - ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto;">
        <div style="background-color: #007cba; color: white; padding: 20px; text-align: center;">
          <h1>Cyber Lab Newsletter</h1>
        </div>
        <div style="padding: 30px;">
          ${data.content}
        </div>
        <div style="background-color: #f8f9fa; padding: 20px; text-align: center; border-top: 2px solid #007cba;">
          <p><small>You received this email because you subscribed to Cyber Lab updates.</small></p>
          <p><small>© ${new Date().getFullYear()} Cyber Lab. All rights reserved.</small></p>
        </div>
      </div>
    `,
  }),
};
