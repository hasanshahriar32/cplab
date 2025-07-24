import type { GlobalConfig } from "payload"

export const Settings: GlobalConfig = {
  slug: "settings",
  fields: [
    {
      name: "siteName",
      type: "text",
      required: true,
      defaultValue: "Motion Records",
    },
    {
      name: "siteDescription",
      type: "textarea",
      required: true,
      defaultValue: "Elevate your brand with cutting-edge marketing solutions",
    },
    {
      name: "contactInfo",
      type: "group",
      fields: [
        {
          name: "email",
          type: "email",
          required: true,
        },
        {
          name: "phone",
          type: "text",
        },
        {
          name: "address",
          type: "textarea",
        },
      ],
    },
    {
      name: "socialMedia",
      type: "group",
      fields: [
        {
          name: "twitter",
          type: "text",
        },
        {
          name: "linkedin",
          type: "text",
        },
        {
          name: "instagram",
          type: "text",
        },
        {
          name: "facebook",
          type: "text",
        },
      ],
    },
    {
      name: "seo",
      type: "group",
      fields: [
        {
          name: "metaTitle",
          type: "text",
        },
        {
          name: "metaDescription",
          type: "textarea",
        },
        {
          name: "ogImage",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
  ],
}
