import type { CollectionConfig } from "payload"

export const ResearchWorks: CollectionConfig = {
  slug: "research-works",
  admin: {
    useAsTitle: "title",
  },
  access: {
    create: ({ req: { user } }) => {
      return user?.role === "admin" || user?.role === "student"
    },
    update: ({ req: { user }, data }) => {
      return user?.role === "admin" || user?.id === data.author
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "type",
      type: "select",
      options: [
        {
          label: "Research Paper",
          value: "paper",
        },
        {
          label: "Journal Article",
          value: "journal",
        },
        {
          label: "Project",
          value: "project",
        },
        {
          label: "Thesis",
          value: "thesis",
        },
        {
          label: "Conference Paper",
          value: "conference",
        },
      ],
      required: true,
    },
    {
      name: "category",
      type: "select",
      options: [
        {
          label: "Development",
          value: "development",
        },
        {
          label: "Machine Learning",
          value: "ml",
        },
        {
          label: "Internet of Things (IoT)",
          value: "iot",
        },
        {
          label: "Cyber Physical Systems",
          value: "cps",
        },
        {
          label: "Computer Vision",
          value: "cv",
        },
        {
          label: "Data Science",
          value: "data-science",
        },
        {
          label: "Robotics",
          value: "robotics",
        },
        {
          label: "Other",
          value: "other",
        },
      ],
      required: true,
    },
    {
      name: "abstract",
      type: "textarea",
      required: true,
    },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "authors",
      type: "array",
      fields: [
        {
          name: "author",
          type: "relationship",
          relationTo: "users",
        },
        {
          name: "externalAuthor",
          type: "text",
          admin: {
            description: "For authors not in the system",
          },
        },
        {
          name: "isMainAuthor",
          type: "checkbox",
          defaultValue: false,
        },
      ],
      minRows: 1,
      required: true,
    },
    {
      name: "publishedDate",
      type: "date",
    },
    {
      name: "journal",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "journal",
      },
    },
    {
      name: "conference",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "conference",
      },
    },
    {
      name: "doi",
      type: "text",
    },
    {
      name: "url",
      type: "text",
    },
    {
      name: "githubUrl",
      type: "text",
      admin: {
        condition: (_, siblingData) => siblingData?.type === "project",
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
    },
    {
      name: "files",
      type: "array",
      fields: [
        {
          name: "file",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "label",
          type: "text",
        },
      ],
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "status",
      type: "select",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Under Review",
          value: "review",
        },
        {
          label: "Published",
          value: "published",
        },
        {
          label: "In Progress",
          value: "progress",
        },
        {
          label: "Completed",
          value: "completed",
        },
      ],
      defaultValue: "draft",
      required: true,
    },
    {
      name: "isPublic",
      type: "checkbox",
      defaultValue: true,
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        if (req.user) {
          // Set the first author as the current user if not set
          if (!data.authors || data.authors.length === 0) {
            data.authors = [
              {
                author: req.user.id,
                isMainAuthor: true,
              },
            ]
          }
        }
        return data
      },
    ],
  },
}
