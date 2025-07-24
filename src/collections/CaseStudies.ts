import type { CollectionConfig } from "payload"

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "client",
      type: "text",
      required: true,
    },
    {
      name: "industry",
      type: "text",
      required: true,
    },
    {
      name: "summary",
      type: "textarea",
      required: true,
    },
    {
      name: "challenge",
      type: "richText",
      required: true,
    },
    {
      name: "solution",
      type: "richText",
      required: true,
    },
    {
      name: "results",
      type: "array",
      fields: [
        {
          name: "metric",
          type: "text",
          required: true,
        },
        {
          name: "value",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "text",
        },
      ],
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "gallery",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
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
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "status",
      type: "select",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      defaultValue: "draft",
    },
  ],
}
