import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { lexicalEditor } from "@payloadcms/richtext-lexical"
import { buildConfig } from "payload"
import sharp from "sharp"
import path from "path"

import { Users } from "./collections/Users"
import { Services } from "./collections/Services"
import { Testimonials } from "./collections/Testimonials"
import { CaseStudies } from "./collections/CaseStudies"
import { BlogPosts } from "./collections/BlogPosts"
import { Media } from "./collections/Media"
import { Settings } from "./globals/Settings"
import { Navigation } from "./globals/Navigation"

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(process.cwd()),
    },
    components: {
      // The `BeforeLogin` component renders a message that you see while logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeLogin` statement on line 15.
      beforeLogin: ["@/components/BeforeLogin"],
      // The `BeforeDashboard` component renders the 'welcome' block that you see after logging into your admin panel.
      // Feel free to delete this at any time. Simply remove the line below and the import `BeforeDashboard` statement on line 15.
      beforeDashboard: ["@/components/BeforeDashboard"],
    },
  },
  collections: [Users, Services, Testimonials, CaseStudies, BlogPosts, Media],
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
  plugins: [
    // storage-adapter-placeholder
  ],
})
