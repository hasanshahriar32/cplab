import type { CollectionConfig } from "payload"

export const LabNews: CollectionConfig = {
  slug: "lab-news",
  admin: {
    useAsTitle: "title",
  },
  access: {
    create: ({ req: { user } }) => {
      return user?.role === "admin"
    },
    update: ({ req: { user } }) => {
      return user?.role === "admin"
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "excerpt",
      type: "textarea",
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "category",
      type: "select",
      options: [
        {
          label: "Lab Update",
          value: "lab-update",
        },
        {
          label: "Research Achievement",
          value: "research-achievement",
        },
        {
          label: "Publication",
          value: "publication",
        },
        {
          label: "Event",
          value: "event",
        },
        {
          label: "Award",
          value: "award",
        },
        {
          label: "Collaboration",
          value: "collaboration",
        },
      ],
      required: true,
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      filterOptions: {
        role: {
          equals: "admin",
        },
      },
      required: true,
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
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
    },
    {
      name: "isPublished",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === "create" && !data.slug) {
          data.slug = data.title
            ?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
        }
        return data
      },
    ],
  },
}
