import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
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
  globals: [Settings, Navigation],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(process.cwd(), "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  sharp,
  plugins: [],
})
