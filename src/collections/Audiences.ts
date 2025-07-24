import type { CollectionConfig } from "payload"

export const Audiences: CollectionConfig = {
  slug: "audiences",
  admin: {
    useAsTitle: "name",
    description: "Manage email audiences for marketing campaigns",
  },
  access: {
    // Only admins can manage audiences
    create: ({ req: { user } }) => user?.role === 'admin',
    read: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  hooks: {
    afterChange: [
      async ({ operation, doc, req }) => {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        try {
          if (operation === 'create') {
            // Create audience in Resend
            const response = await resend.audiences.create({ name: doc.name })
            
            // Update the document with the Resend audience ID
            await req.payload.update({
              collection: 'audiences',
              id: doc.id,
              data: {
                resendAudienceId: response.data?.id,
              },
            })
          }
        } catch (error) {
          console.error('Error syncing audience with Resend:', error)
        }
      },
    ],
    afterDelete: [
      async ({ doc }) => {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        try {
          if (doc.resendAudienceId) {
            // Delete audience from Resend
            await resend.audiences.remove(doc.resendAudienceId)
          }
        } catch (error) {
          console.error('Error deleting audience from Resend:', error)
        }
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: "Name of the email audience (e.g., 'Newsletter Subscribers', 'Research Updates')",
      },
    },
    {
      name: "description",
      type: "textarea",
      admin: {
        description: "Description of what this audience is for",
      },
    },
    {
      name: "resendAudienceId",
      type: "text",
      admin: {
        readOnly: true,
        description: "Resend audience ID (auto-generated)",
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Whether this audience is active for new subscriptions",
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
