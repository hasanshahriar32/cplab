import type { CollectionConfig } from "payload"

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
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
