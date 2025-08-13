import type { CollectionConfig, AccessArgs } from "payload"

const canUpdateProfile = ({ req: { user }, id }: AccessArgs) => {
  // Allow if admin/professor
  if (user?.role === 'admin') return true
  
  // Allow if user is updating their own profile
  if (user?.id && id && user.id.toString() === id.toString()) return true
  
  return false
}

const canAccessProfile = ({ req: { user } }: AccessArgs) => {
  // Admin can access all profiles
  if (user?.role === 'admin') return true
  
  // Users can access profiles that are public
  return {
    isPublic: {
      equals: true
    }
  }
}

const canCreateProfile = ({ req: { user } }: AccessArgs) => {
  // Only logged-in users can create profiles
  return !!user
}

export const Profiles: CollectionConfig = {
  slug: "profiles",
  admin: {
    useAsTitle: "displayName",
    defaultColumns: ['displayName', 'user', 'position', 'isPublic', 'updatedAt'],
  },
  access: {
    create: canCreateProfile,
    read: canAccessProfile,
    update: canUpdateProfile,
    delete: canUpdateProfile,
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      unique: true,
      admin: {
        description: "Link this profile to a user account",
      },
    },
    {
      name: "displayName",
      type: "text",
      required: true,
      admin: {
        description: "The name to display on the profile",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "URL-friendly version of the name (e.g., john-smith)",
      },
      hooks: {
        beforeChange: [
          ({ value, data }) => {
            if (!value && data?.displayName) {
              return data.displayName
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-+|-+$/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: "profileImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Professional profile photo",
      },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Cover image for the profile header",
      },
    },
    {
      name: "position",
      type: "text",
      required: true,
      admin: {
        description: "Current position or title (e.g., PhD Student, Research Assistant)",
      },
    },
    {
      name: "department",
      type: "text",
      admin: {
        description: "Department or division",
      },
    },
    {
      name: "bio",
      type: "textarea",
      admin: {
        description: "Brief professional biography",
      },
    },
    {
      name: "researchInterests",
      type: "array",
      label: "Research Interests",
      fields: [
        {
          name: "interest",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "textarea",
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
          required: true,
        },
        {
          name: "institution",
          type: "text",
          required: true,
        },
        {
          name: "fieldOfStudy",
          type: "text",
        },
        {
          name: "startYear",
          type: "number",
        },
        {
          name: "endYear",
          type: "number",
        },
        {
          name: "gpa",
          type: "number",
        },
        {
          name: "description",
          type: "textarea",
        },
        {
          name: "isCurrentlyEnrolled",
          type: "checkbox",
          defaultValue: false,
        },
      ],
    },
    {
      name: "workExperience",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "company",
          type: "text",
          required: true,
        },
        {
          name: "location",
          type: "text",
        },
        {
          name: "startDate",
          type: "date",
        },
        {
          name: "endDate",
          type: "date",
        },
        {
          name: "isCurrentPosition",
          type: "checkbox",
          defaultValue: false,
        },
        {
          name: "description",
          type: "textarea",
        },
      ],
    },
    {
      name: "achievements",
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
        },
        {
          name: "date",
          type: "date",
        },
        {
          name: "category",
          type: "select",
          options: [
            { label: "Award", value: "award" },
            { label: "Publication", value: "publication" },
            { label: "Presentation", value: "presentation" },
            { label: "Grant", value: "grant" },
            { label: "Certification", value: "certification" },
            { label: "Other", value: "other" },
          ],
        },
        {
          name: "link",
          type: "text",
          admin: {
            description: "Link to more information about this achievement",
          },
        },
      ],
    },
    {
      name: "skills",
      type: "array",
      fields: [
        {
          name: "skill",
          type: "text",
          required: true,
        },
        {
          name: "level",
          type: "select",
          options: [
            { label: "Beginner", value: "beginner" },
            { label: "Intermediate", value: "intermediate" },
            { label: "Advanced", value: "advanced" },
            { label: "Expert", value: "expert" },
          ],
          defaultValue: "intermediate",
        },
        {
          name: "category",
          type: "select",
          options: [
            { label: "Programming", value: "programming" },
            { label: "Research", value: "research" },
            { label: "Technical", value: "technical" },
            { label: "Soft Skills", value: "soft" },
            { label: "Other", value: "other" },
          ],
        },
      ],
    },
    {
      name: "socialLinks",
      type: "group",
      fields: [
        {
          name: "email",
          type: "email",
        },
        {
          name: "linkedIn",
          type: "text",
          admin: {
            description: "LinkedIn profile URL",
          },
        },
        {
          name: "github",
          type: "text",
          admin: {
            description: "GitHub profile URL",
          },
        },
        {
          name: "twitter",
          type: "text",
          admin: {
            description: "Twitter/X profile URL",
          },
        },
        {
          name: "orcid",
          type: "text",
          admin: {
            description: "ORCID identifier",
          },
        },
        {
          name: "googleScholar",
          type: "text",
          admin: {
            description: "Google Scholar profile URL",
          },
        },
        {
          name: "researchGate",
          type: "text",
          admin: {
            description: "ResearchGate profile URL",
          },
        },
        {
          name: "website",
          type: "text",
          admin: {
            description: "Personal or professional website",
          },
        },
      ],
    },
    {
      name: "publications",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "authors",
          type: "text",
          required: true,
          admin: {
            description: "List of authors (e.g., John Doe, Jane Smith)",
          },
        },
        {
          name: "journal",
          type: "text",
        },
        {
          name: "conference",
          type: "text",
        },
        {
          name: "year",
          type: "number",
        },
        {
          name: "doi",
          type: "text",
          admin: {
            description: "Digital Object Identifier",
          },
        },
        {
          name: "link",
          type: "text",
          admin: {
            description: "Link to the publication",
          },
        },
        {
          name: "type",
          type: "select",
          options: [
            { label: "Journal Article", value: "journal" },
            { label: "Conference Paper", value: "conference" },
            { label: "Book Chapter", value: "chapter" },
            { label: "Book", value: "book" },
            { label: "Thesis", value: "thesis" },
            { label: "Other", value: "other" },
          ],
          defaultValue: "journal",
        },
        {
          name: "abstract",
          type: "textarea",
        },
      ],
    },
    {
      name: "projects",
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
          name: "status",
          type: "select",
          options: [
            { label: "In Progress", value: "in-progress" },
            { label: "Completed", value: "completed" },
            { label: "On Hold", value: "on-hold" },
          ],
          defaultValue: "in-progress",
        },
        {
          name: "startDate",
          type: "date",
        },
        {
          name: "endDate",
          type: "date",
        },
        {
          name: "technologies",
          type: "array",
          fields: [
            {
              name: "technology",
              type: "text",
            },
          ],
        },
        {
          name: "link",
          type: "text",
          admin: {
            description: "Link to project (GitHub, website, etc.)",
          },
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "certificates",
      type: "relationship",
      relationTo: "certificates",
      hasMany: true,
      admin: {
        description: "Certificates earned by this user",
      },
    },
    {
      name: "newsArticles",
      type: "relationship",
      relationTo: "lab-news",
      hasMany: true,
      admin: {
        description: "News articles authored by this user",
      },
    },
    {
      name: "researchWorks",
      type: "relationship",
      relationTo: "research-works",
      hasMany: true,
      admin: {
        description: "Research works authored by this user",
      },
    },
    {
      name: "stats",
      type: "group",
      fields: [
        {
          name: "totalProjects",
          type: "number",
          defaultValue: 0,
          admin: {
            readOnly: true,
            description: "Auto-calculated based on projects",
          },
        },
        {
          name: "totalPublications",
          type: "number",
          defaultValue: 0,
          admin: {
            readOnly: true,
            description: "Auto-calculated based on publications",
          },
        },
        {
          name: "totalCertificates",
          type: "number",
          defaultValue: 0,
          admin: {
            readOnly: true,
            description: "Auto-calculated based on certificates",
          },
        },
        {
          name: "yearsOfExperience",
          type: "number",
          defaultValue: 0,
        },
      ],
    },
    {
      name: "contactInfo",
      type: "group",
      fields: [
        {
          name: "phone",
          type: "text",
        },
        {
          name: "office",
          type: "text",
          admin: {
            description: "Office location or room number",
          },
        },
        {
          name: "officeHours",
          type: "text",
          admin: {
            description: "Available office hours",
          },
        },
        {
          name: "timeZone",
          type: "text",
          defaultValue: "UTC",
        },
      ],
    },
    {
      name: "preferences",
      type: "group",
      fields: [
        {
          name: "showEmail",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description: "Show email address on public profile",
          },
        },
        {
          name: "showPhone",
          type: "checkbox",
          defaultValue: false,
          admin: {
            description: "Show phone number on public profile",
          },
        },
        {
          name: "allowContact",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description: "Allow visitors to contact through the website",
          },
        },
        {
          name: "showProjects",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description: "Show projects section on profile",
          },
        },
        {
          name: "showPublications",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description: "Show publications section on profile",
          },
        },
      ],
    },
    {
      name: "isPublic",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Make this profile visible to the public",
      },
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Feature this profile on the homepage",
        condition: (_, siblingData, { user }) => user?.role === 'admin',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        // Auto-calculate stats
        const stats = {
          totalProjects: doc.projects?.length || 0,
          totalPublications: doc.publications?.length || 0,
          totalCertificates: doc.certificates?.length || 0,
          yearsOfExperience: doc.stats?.yearsOfExperience || 0,
        }
        
        // Update the document with calculated stats
        if (operation === 'create' || operation === 'update') {
          await req.payload.update({
            collection: 'profiles',
            id: doc.id,
            data: {
              stats,
            },
          })
        }
      },
    ],
  },
}
