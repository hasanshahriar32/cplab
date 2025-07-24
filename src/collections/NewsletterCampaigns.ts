import type { CollectionConfig } from "payload"

export const NewsletterCampaigns: CollectionConfig = {
  slug: "newsletter-campaigns", 
  admin: {
    useAsTitle: "subject",
    defaultColumns: ["subject", "status", "scheduledAt", "sentAt", "recipientCount"],
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: "subject",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "htmlContent",
      type: "textarea",
      admin: {
        description: "Custom HTML content (optional - will override rich text)",
      },
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Scheduled",
          value: "scheduled",
        },
        {
          label: "Sending",
          value: "sending",
        },
        {
          label: "Sent",
          value: "sent",
        },
        {
          label: "Failed",
          value: "failed",
        },
      ],
      defaultValue: "draft",
      required: true,
    },
    {
      name: "targetAudience",
      type: "select",
      hasMany: true,
      options: [
        {
          label: "All Subscribers",
          value: "all",
        },
        {
          label: "Research Interest",
          value: "research",
        },
        {
          label: "News Interest",
          value: "news",
        },
        {
          label: "Publications Interest",
          value: "publications",
        },
        {
          label: "Jobs Interest",
          value: "jobs",
        },
        {
          label: "General Interest",
          value: "general",
        },
      ],
      defaultValue: ["all"],
      required: true,
    },
    {
      name: "scheduledAt",
      type: "date",
      admin: {
        condition: (_, siblingData) => siblingData?.status === "scheduled",
      },
    },
    {
      name: "sentAt",
      type: "date",
      admin: {
        readOnly: true,
        condition: (_, siblingData) => siblingData?.status === "sent",
      },
    },
    {
      name: "recipientCount",
      type: "number",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "successCount",
      type: "number",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "failureCount",
      type: "number",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "campaignId",
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "errors",
      type: "array",
      admin: {
        readOnly: true,
        condition: (_, siblingData) => siblingData?.status === "failed" || siblingData?.failureCount > 0,
      },
      fields: [
        {
          name: "email",
          type: "email",
        },
        {
          name: "error",
          type: "text",
        },
        {
          name: "timestamp",
          type: "date",
        },
      ],
    },
  ],
}
