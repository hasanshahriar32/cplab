import type { CollectionConfig } from "payload"

export const Services: CollectionConfig = {
  slug: "services",
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
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "icon",
      type: "text",
      required: true,
      admin: {
        description: 'Lucide icon name (e.g., "Zap", "Target", "Users")',
      },
    },
    {
      name: "features",
      type: "array",
      fields: [
        {
          name: "feature",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "pricing",
      type: "group",
      fields: [
        {
          name: "startingPrice",
          type: "number",
          required: true,
        },
        {
          name: "currency",
          type: "text",
          defaultValue: "USD",
        },
        {
          name: "period",
          type: "select",
          options: [
            { label: "Per Month", value: "month" },
            { label: "Per Project", value: "project" },
            { label: "One Time", value: "onetime" },
          ],
          defaultValue: "month",
        },
      ],
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Marketing", value: "marketing" },
        { label: "Design", value: "design" },
        { label: "Development", value: "development" },
        { label: "Strategy", value: "strategy" },
      ],
      required: true,
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
