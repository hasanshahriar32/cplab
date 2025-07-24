import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { nodemailerAdapter } from "@payloadcms/email-nodemailer"
import { buildConfig } from "payload"
import sharp from "sharp"
import path from "path"

import { Users } from "./src/collections/Users"
import { Services } from "./src/collections/Services"
import { Testimonials } from "./src/collections/Testimonials"
import { CaseStudies } from "./src/collections/CaseStudies"
import { BlogPosts } from "./src/collections/BlogPosts"
import { Media } from "./src/collections/Media"
import { ResearchWorks } from "./src/collections/ResearchWorks"
import { Certificates } from "./src/collections/Certificates"
import { LabNews } from "./src/collections/LabNews"
import { Settings } from "./src/globals/Settings"
import { Navigation } from "./src/globals/Navigation"
import { HomePage } from "./src/globals/HomePage"

// This is imported in the root layout on the frontend
// https://payloadcms.com/docs/configuration/overview#importing-the-config-in-client-components

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(process.cwd()),
    },
  },
  collections: [
    Users, 
    ResearchWorks, 
    Certificates, 
    LabNews, 
    Services, 
    Testimonials, 
    CaseStudies, 
    BlogPosts, 
    Media
  ],
  globals: [Settings, Navigation, HomePage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(process.cwd(), "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_FROM_EMAIL || 'noreply@example.com',
    defaultFromName: process.env.SMTP_FROM_NAME || 'Cyber Lab',
    // Nodemailer transporter configuration
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
})
