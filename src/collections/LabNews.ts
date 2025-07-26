import type { CollectionConfig } from "payload"
import {
  lexicalEditor,
  BlocksFeature,
  UploadFeature,
  LinkFeature,
  HeadingFeature,
  ParagraphFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  StrikethroughFeature,
  UnorderedListFeature,
  OrderedListFeature,
  ChecklistFeature,
  BlockquoteFeature,
  AlignFeature,
  IndentFeature,
  InlineCodeFeature,
  SuperscriptFeature,
  SubscriptFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  FixedToolbarFeature,
} from "@payloadcms/richtext-lexical"

export const LabNews: CollectionConfig = {
  slug: "lab-news",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "publishedDate", "isPublished", "isFeatured"],
    listSearchableFields: ["title", "excerpt"],
  },
  access: {
    // Only admins can create news
    create: ({ req: { user } }) => {
      return user?.role === "admin"
    },
    // Only admins can read unpublished news, everyone can read published news
    read: ({ req: { user } }) => {
      if (user?.role === "admin") {
        return true // Admins can see all news
      }
      // Non-admins can only see published news
      return {
        isPublished: {
          equals: true,
        },
      }
    },
    // Only admins can update news
    update: ({ req: { user } }) => {
      return user?.role === "admin"
    },
    // Only admins can delete news
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
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // Enhanced upload feature with caption support
          UploadFeature({
            collections: {
              media: {
                fields: [
                  {
                    name: 'caption',
                    type: 'text',
                    label: 'Caption',
                  },
                  {
                    name: 'alt',
                    type: 'text',
                    label: 'Alt Text',
                  },
                ],
              },
            },
          }),
          // Custom blocks for YouTube embeds
          BlocksFeature({
            blocks: [
              {
                slug: 'youtube',
                fields: [
                  {
                    name: 'videoId',
                    type: 'text',
                    required: true,
                    label: 'YouTube Video ID',
                    admin: {
                      description: 'Enter the YouTube video ID (e.g., "dQw4w9WgXcQ" from https://www.youtube.com/watch?v=dQw4w9WgXcQ)',
                    },
                  },
                  {
                    name: 'title',
                    type: 'text',
                    label: 'Video Title (Optional)',
                  },
                  {
                    name: 'aspectRatio',
                    type: 'select',
                    defaultValue: '16:9',
                    options: [
                      { label: '16:9 (Widescreen)', value: '16:9' },
                      { label: '4:3 (Standard)', value: '4:3' },
                      { label: '1:1 (Square)', value: '1:1' },
                    ],
                  },
                ],
              },
              {
                slug: 'callout',
                fields: [
                  {
                    name: 'type',
                    type: 'select',
                    defaultValue: 'info',
                    options: [
                      { label: 'Info', value: 'info' },
                      { label: 'Warning', value: 'warning' },
                      { label: 'Success', value: 'success' },
                      { label: 'Error', value: 'error' },
                    ],
                  },
                  {
                    name: 'content',
                    type: 'richText',
                    required: true,
                    editor: lexicalEditor({
                      features: [
                        BoldFeature(),
                        ItalicFeature(),
                        UnderlineFeature(),
                        LinkFeature(),
                        ParagraphFeature(),
                      ],
                    }),
                  },
                ],
              },
            ],
          }),
          // Fixed toolbar for better editing experience
          FixedToolbarFeature(),
          // Enhanced link feature
          LinkFeature({
            fields: ({ defaultFields }) => [
              ...defaultFields,
              {
                name: 'rel',
                label: 'Rel Attribute',
                type: 'select',
                hasMany: true,
                options: ['noopener', 'noreferrer', 'nofollow'],
                admin: {
                  description: 'The rel attribute defines the relationship between a linked resource and the current document.',
                },
              },
            ],
          }),
        ],
      }),
    },
    {
      name: "excerpt",
      type: "textarea",
      admin: {
        description: "Brief summary for SEO and social media (recommended: 120-160 characters)",
      },
    },
    {
      name: "seoTitle",
      type: "text",
      admin: {
        position: "sidebar",
        description: "Custom SEO title (if different from main title). Max 60 characters.",
      },
      validate: (val: string | null | undefined) => {
        if (val && val.length > 60) {
          return 'SEO title should be 60 characters or less'
        }
        return true
      },
    },
    {
      name: "seoDescription",
      type: "textarea",
      admin: {
        position: "sidebar", 
        description: "Custom meta description for search engines. 120-160 characters recommended.",
      },
      validate: (val: string | null | undefined) => {
        if (val && val.length > 160) {
          return 'SEO description should be 160 characters or less'
        }
        return true
      },
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
