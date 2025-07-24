import type { GlobalConfig } from "payload"

export const Navigation: GlobalConfig = {
  slug: "navigation",
  fields: [
    {
      name: "mainNavigation",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "href",
          type: "text",
          required: true,
        },
        {
          name: "newTab",
          type: "checkbox",
          defaultValue: false,
        },
      ],
    },
    {
      name: "footerNavigation",
      type: "array",
      fields: [
        {
          name: "section",
          type: "text",
          required: true,
        },
        {
          name: "links",
          type: "array",
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
            },
            {
              name: "href",
              type: "text",
              required: true,
            },
            {
              name: "newTab",
              type: "checkbox",
              defaultValue: false,
            },
          ],
        },
      ],
    },
  ],
}
