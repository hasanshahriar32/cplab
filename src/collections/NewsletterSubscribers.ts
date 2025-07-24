import type { CollectionConfig } from "payload"

export const NewsletterSubscribers: CollectionConfig = {
  slug: "newsletter-subscribers",
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "firstName", "lastName", "status", "subscribedAt"],
  },
  access: {
    read: () => true, // Allow reading for unsubscribe functionality
    create: () => true, // Allow public subscription
    update: ({ req: { user } }) => Boolean(user), // Only admin can update
    delete: ({ req: { user } }) => Boolean(user), // Only admin can delete
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "firstName",
      type: "text",
    },
    {
      name: "lastName",
      type: "text",
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          label: "Active",
          value: "active",
        },
        {
          label: "Unsubscribed",
          value: "unsubscribed",
        },
        {
          label: "Bounced",
          value: "bounced",
        },
      ],
      defaultValue: "active",
      required: true,
    },
    {
      name: "interests",
      type: "select",
      hasMany: true,
      options: [
        {
          label: "Research Updates",
          value: "research",
        },
        {
          label: "News & Events",
          value: "news",
        },
        {
          label: "Publications",
          value: "publications",
        },
        {
          label: "Job Opportunities",
          value: "jobs",
        },
        {
          label: "General Updates",
          value: "general",
        },
      ],
      defaultValue: ["general"],
    },
    {
      name: "source",
      type: "select",
      options: [
        {
          label: "Website",
          value: "website",
        },
        {
          label: "Social Media",
          value: "social",
        },
        {
          label: "Event",
          value: "event",
        },
        {
          label: "Referral",
          value: "referral",
        },
        {
          label: "Other",
          value: "other",
        },
      ],
      defaultValue: "website",
    },
    {
      name: "subscribedAt",
      type: "date",
      defaultValue: () => new Date(),
      admin: {
        readOnly: true,
      },
    },
    {
      name: "unsubscribedAt",
      type: "date",
      admin: {
        condition: (_, siblingData) => siblingData?.status === "unsubscribed",
      },
    },
    {
      name: "unsubscribeToken",
      type: "text",
      admin: {
        hidden: true,
      },
      index: true,
    },
  ],
  hooks: {
    beforeChange: [
      ({ operation, data }) => {
        if (operation === "create") {
          // Generate unsubscribe token
          data.unsubscribeToken = Math.random().toString(36).substring(2, 15) + 
                                  Math.random().toString(36).substring(2, 15);
        }
        
        if (data.status === "unsubscribed" && operation === "update") {
          data.unsubscribedAt = new Date();
        }
        
        return data;
      },
    ],
  },
}
