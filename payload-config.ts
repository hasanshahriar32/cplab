import { mongooseAdapter } from "@payloadcms/db-mongodb"
import { buildConfig } from "payload"
import path from "path"

// This is imported in the root layout on the frontend
// https://payloadcms.com/docs/configuration/overview#importing-the-config-in-client-components

export default buildConfig({
  admin: {
    importMap: {
      baseDir: path.resolve(process.cwd()),
    },
  },
  collections: [],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(process.cwd(), "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || "",
  }),
  plugins: [],
})
