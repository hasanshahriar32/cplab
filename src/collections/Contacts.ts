import type { CollectionConfig } from "payload"

export const Contacts: CollectionConfig = {
  slug: "contacts",
  admin: {
    useAsTitle: "email",
    description: "Manage email contacts and subscriptions",
    defaultColumns: ['email', 'firstName', 'lastName', 'audience', 'subscribed', 'createdAt'],
  },
  access: {
    // Only admins can manage contacts
    create: ({ req: { user } }) => user?.role === 'admin',
    read: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  hooks: {
    afterChange: [
      async ({ operation, doc, previousDoc, req }) => {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        try {
          // Get the audience to find the Resend audience ID
          const audience = await req.payload.findByID({
            collection: 'audiences',
            id: doc.audience,
          })

          if (!audience?.resendAudienceId) {
            console.error('Audience does not have a Resend audience ID')
            return
          }

          if (operation === 'create') {
            // Create contact in Resend
            await resend.contacts.create({
              email: doc.email,
              firstName: doc.firstName || '',
              lastName: doc.lastName || '',
              unsubscribed: !doc.subscribed,
              audienceId: audience.resendAudienceId,
            })
          } else if (operation === 'update') {
            // Update contact in Resend
            await resend.contacts.update({
              email: doc.email,
              audienceId: audience.resendAudienceId,
              firstName: doc.firstName || '',
              lastName: doc.lastName || '',
              unsubscribed: !doc.subscribed,
            })

            // Handle unsubscribedAt timestamp
            if (previousDoc && doc.subscribed !== previousDoc.subscribed) {
              if (!doc.subscribed && previousDoc.subscribed) {
                // User unsubscribed - set unsubscribedAt
                await req.payload.update({
                  collection: 'contacts',
                  id: doc.id,
                  data: {
                    unsubscribedAt: new Date(),
                  },
                })
              } else if (doc.subscribed && !previousDoc.subscribed) {
                // User resubscribed - clear unsubscribedAt
                await req.payload.update({
                  collection: 'contacts',
                  id: doc.id,
                  data: {
                    unsubscribedAt: null,
                  },
                })
              }
            }
          }
        } catch (error) {
          console.error('Error syncing contact with Resend:', error)
        }
      },
    ],
    afterDelete: [
      async ({ doc, req }) => {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        try {
          const audience = await req.payload.findByID({
            collection: 'audiences',
            id: doc.audience,
          })

          if (audience?.resendAudienceId) {
            await resend.contacts.remove({
              email: doc.email,
              audienceId: audience.resendAudienceId,
            })
          }
        } catch (error) {
          console.error('Error removing contact from Resend:', error)
        }
      },
    ],
  },
  fields: [
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      admin: {
        description: "Contact's email address",
      },
    },
    {
      name: "firstName",
      type: "text",
      admin: {
        description: "Contact's first name",
      },
    },
    {
      name: "lastName",
      type: "text",
      admin: {
        description: "Contact's last name",
      },
    },
    {
      name: "audience",
      type: "relationship",
      relationTo: "audiences",
      required: true,
      admin: {
        description: "Which audience this contact belongs to",
      },
    },
    {
      name: "subscribed",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Whether the contact is subscribed to receive emails",
      },
    },
    {
      name: "source",
      type: "select",
      options: [
        {
          label: "Website Subscription",
          value: "website",
        },
        {
          label: "Manual Entry",
          value: "manual",
        },
        {
          label: "Import",
          value: "import",
        },
        {
          label: "API",
          value: "api",
        },
      ],
      defaultValue: "manual",
      admin: {
        description: "How this contact was added",
      },
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
      admin: {
        description: "Tags for organizing contacts",
      },
    },
    {
      name: "notes",
      type: "textarea",
      admin: {
        description: "Internal notes about this contact",
      },
    },
    {
      name: "subscribedAt",
      type: "date",
      admin: {
        readOnly: true,
        position: "sidebar",
        description: "When the contact first subscribed",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (!value && siblingData.subscribed) {
              siblingData.subscribedAt = new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: "unsubscribedAt",
      type: "date",
      admin: {
        readOnly: true,
        position: "sidebar",
        description: "When the contact unsubscribed",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            // This will be set when subscribed changes from true to false
            return value
          },
        ],
      },
    },
    {
      name: "createdAt",
      type: "date",
      admin: {
        readOnly: true,
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (!value) {
              siblingData.createdAt = new Date()
            }
            return value
          },
        ],
      },
    },
  ],
}
