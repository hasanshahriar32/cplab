import type { GlobalConfig } from "payload"

export const HomePage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage Content",
  fields: [
    {
      name: "hero",
      type: "group",
      label: "Hero Section",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          defaultValue: "Advancing Cyber Physical Systems",
        },
        {
          name: "subtitle",
          type: "textarea",
          required: true,
          defaultValue: "Pioneering research in the intersection of computational algorithms and physical processes. Our lab develops innovative solutions for IoT, machine learning, and intelligent systems.",
        },
        {
          name: "ctaText",
          type: "text",
          defaultValue: "Explore Research",
        },
        {
          name: "ctaLink",
          type: "text",
          defaultValue: "/research",
        },
        {
          name: "backgroundVideo",
          type: "upload",
          relationTo: "media",
          admin: {
            description: "Upload a background video for the hero section (max 20MB). Supported formats: MP4, WebM, MOV. If no video is uploaded, a default video will be used. Recommended: 1920x1080, 10-30 seconds for smooth looping.",
          },
          filterOptions: {
            mimeType: { contains: 'video' }
          },
        },
      ],
    },
    {
      name: "stats",
      type: "array",
      label: "Statistics",
      minRows: 3,
      maxRows: 4,
      fields: [
        {
          name: "value",
          type: "number",
          required: true,
        },
        {
          name: "suffix",
          type: "text",
          defaultValue: "+",
        },
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
      defaultValue: [
        { value: 50, suffix: "+", label: "Research Publications" },
        { value: 25, suffix: "+", label: "Active Students" },
        { value: 100, suffix: "+", label: "Completed Projects" },
      ],
    },
    {
      name: "researchAreas",
      type: "group",
      label: "Research Areas Section",
      fields: [
        {
          name: "title",
          type: "text",
          defaultValue: "Research Areas",
        },
        {
          name: "description",
          type: "textarea",
          defaultValue: "Our interdisciplinary research spans multiple domains of cyber-physical systems and emerging technologies.",
        },
        {
          name: "areas",
          type: "array",
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
              admin: {
                description: "Emoji or icon character",
              },
            },
            {
              name: "technologies",
              type: "array",
              fields: [
                {
                  name: "tech",
                  type: "text",
                },
              ],
            },
          ],
          defaultValue: [
            {
              title: "Internet of Things (IoT)",
              description: "Smart sensor networks and edge computing for real-time data processing and autonomous decision making.",
              icon: "🌐",
              technologies: [
                { tech: "Edge Computing" },
                { tech: "Sensor Networks" },
                { tech: "MQTT/CoAP" },
              ],
            },
            {
              title: "Machine Learning",
              description: "Advanced AI algorithms for pattern recognition, predictive analytics, and intelligent automation.",
              icon: "🤖",
              technologies: [
                { tech: "Deep Learning" },
                { tech: "Neural Networks" },
                { tech: "Computer Vision" },
              ],
            },
            {
              title: "Cyber-Physical Systems",
              description: "Integration of computational and physical processes for smart manufacturing and autonomous systems.",
              icon: "⚙️",
              technologies: [
                { tech: "Real-time Systems" },
                { tech: "Embedded Systems" },
                { tech: "System Integration" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "featuredSection",
      type: "group",
      label: "Featured Section",
      fields: [
        {
          name: "title",
          type: "text",
          defaultValue: "Latest Research",
        },
        {
          name: "description",
          type: "textarea",
          defaultValue: "Discover our most recent publications and ongoing research projects.",
        },
        {
          name: "ctaText",
          type: "text",
          defaultValue: "View All Publications",
        },
        {
          name: "ctaLink",
          type: "text",
          defaultValue: "/publications",
        },
      ],
    },
    {
      name: "teamSection",
      type: "group",
      label: "Team Section",
      fields: [
        {
          name: "title",
          type: "text",
          defaultValue: "Meet Our Team",
        },
        {
          name: "description",
          type: "textarea",
          defaultValue: "Our diverse team of researchers, professors, and students working together to advance the field.",
        },
        {
          name: "ctaText",
          type: "text",
          defaultValue: "View Team",
        },
        {
          name: "ctaLink",
          type: "text",
          defaultValue: "/team",
        },
      ],
    },
    {
      name: "seoMeta",
      type: "group",
      label: "SEO & Meta",
      fields: [
        {
          name: "metaTitle",
          type: "text",
          defaultValue: "Cyber Physical Lab - Advanced Research & Innovation",
        },
        {
          name: "metaDescription",
          type: "textarea",
          defaultValue: "Leading research laboratory specializing in cyber-physical systems, IoT, machine learning, and intelligent technologies. Join our innovative research community.",
        },
        {
          name: "keywords",
          type: "array",
          fields: [
            {
              name: "keyword",
              type: "text",
            },
          ],
          defaultValue: [
            { keyword: "cyber physical systems" },
            { keyword: "IoT research" },
            { keyword: "machine learning" },
            { keyword: "research lab" },
          ],
        },
      ],
    },
  ],
}
