import { buildConfig } from "payload"
import path from "path"

// This is imported in the root layout on the frontend
// https://payloadcms.com/docs/configuration/overview#importing-the-config-in-client-components

const mockModulePath = path.resolve(process.cwd(), "src/payload.config.ts")

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
  db: {} as any, // This is overridden in src/payload.config.ts
  plugins: [],
})
