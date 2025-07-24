import type { CollectionConfig } from "payload"

export const Certificates: CollectionConfig = {
  slug: "certificates",
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
    delete: ({ req: { user } }) => {
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
      name: "recipient",
      type: "relationship",
      relationTo: "users",
      filterOptions: {
        role: {
          equals: "student",
        },
      },
      required: true,
    },
    {
      name: "certificateType",
      type: "select",
      options: [
        {
          label: "Research Completion",
          value: "research-completion",
        },
        {
          label: "Project Excellence",
          value: "project-excellence",
        },
        {
          label: "Paper Publication",
          value: "paper-publication",
        },
        {
          label: "Conference Presentation",
          value: "conference-presentation",
        },
        {
          label: "Outstanding Achievement",
          value: "outstanding-achievement",
        },
        {
          label: "Collaboration Excellence",
          value: "collaboration-excellence",
        },
      ],
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "issuedBy",
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
      name: "issuedDate",
      type: "date",
      required: true,
    },
    {
      name: "validUntil",
      type: "date",
    },
    {
      name: "certificateId",
      type: "text",
      unique: true,
      admin: {
        description: "Unique certificate ID for verification",
      },
    },
    {
      name: "relatedWork",
      type: "relationship",
      relationTo: "research-works",
      admin: {
        description: "Related research work if applicable",
      },
    },
    {
      name: "skills",
      type: "array",
      fields: [
        {
          name: "skill",
          type: "text",
        },
      ],
    },
    {
      name: "grade",
      type: "select",
      options: [
        {
          label: "Excellent",
          value: "excellent",
        },
        {
          label: "Very Good",
          value: "very-good",
        },
        {
          label: "Good",
          value: "good",
        },
        {
          label: "Satisfactory",
          value: "satisfactory",
        },
      ],
    },
    {
      name: "digitalSignature",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "template",
      type: "select",
      options: [
        {
          label: "Default Template",
          value: "default",
        },
        {
          label: "Research Template",
          value: "research",
        },
        {
          label: "Excellence Template",
          value: "excellence",
        },
      ],
      defaultValue: "default",
    },
    {
      name: "isPublic",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Make certificate publicly verifiable",
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        if (operation === "create" && !data.certificateId) {
          // Generate unique certificate ID
          data.certificateId = `CPL-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        }
        return data
      },
    ],
  },
}
