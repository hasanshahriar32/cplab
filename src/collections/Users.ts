import type { CollectionConfig } from "payload"

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: {
    forgotPassword: {
      generateEmailHTML: (args) => {
        const { token, user } = args || {};
        // You can customize this HTML template
        return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>Hello ${user?.firstName || 'User'},</p>
          <p>You requested a password reset for your Cyber Lab account. Click the link below to reset your password:</p>
          <p>
            <a href="${process.env.PAYLOAD_PUBLIC_SERVER_URL}/reset-password?token=${token}" 
               style="background-color: #007cba; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              Reset Password
            </a>
          </p>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <p>This link will expire in 1 hour.</p>
          <p>Best regards,<br>Cyber Lab Team</p>
        </div>
        `;
      },
      generateEmailSubject: () => 'Reset your Cyber Lab password',
    },
    verify: {
      generateEmailHTML: (args) => {
        const { token, user } = args || {};
        return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Email Verification</h2>
          <p>Hello ${user?.firstName || 'User'},</p>
          <p>Thank you for registering with Cyber Lab. Please verify your email address by clicking the link below:</p>
          <p>
            <a href="${process.env.PAYLOAD_PUBLIC_SERVER_URL}/admin/verify?token=${token}" 
               style="background-color: #28a745; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
              Verify Email
            </a>
          </p>
          <p>If you didn't create this account, please ignore this email.</p>
          <p>Best regards,<br>Cyber Lab Team</p>
        </div>
        `;
      },
      generateEmailSubject: () => 'Verify your Cyber Lab account',
    },
  },
  fields: [
    {
      name: "firstName",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      options: [
        {
          label: "Admin (Professor)",
          value: "admin",
        },
        {
          label: "Student",
          value: "student",
        },
      ],
      defaultValue: "student",
      required: true,
    },
    {
      name: "profileImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "bio",
      type: "textarea",
    },
    {
      name: "researchAreas",
      type: "array",
      fields: [
        {
          name: "area",
          type: "text",
        },
      ],
    },
    {
      name: "education",
      type: "array",
      fields: [
        {
          name: "degree",
          type: "text",
        },
        {
          name: "institution",
          type: "text",
        },
        {
          name: "year",
          type: "number",
        },
      ],
    },
    {
      name: "position",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData?.role === "admin",
      },
    },
    {
      name: "studentId",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData?.role === "student",
      },
    },
    {
      name: "supervisor",
      type: "relationship",
      relationTo: "users",
      filterOptions: {
        role: {
          equals: "admin",
        },
      },
      admin: {
        condition: (_, siblingData) => siblingData?.role === "student",
      },
    },
    {
      name: "contactEmail",
      type: "email",
    },
    {
      name: "linkedIn",
      type: "text",
    },
    {
      name: "orcid",
      type: "text",
    },
    {
      name: "googleScholar",
      type: "text",
    },
    {
      name: "isPublicProfile",
      type: "checkbox",
      defaultValue: true,
    },
  ],
}
