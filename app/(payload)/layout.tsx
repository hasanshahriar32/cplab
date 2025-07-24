import '@payloadcms/next/css'
import type React from "react"
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from "next"

import config from "@/payload-config"
import { RootLayout, handleServerFunctions } from "@payloadcms/next/layouts"

import { importMap } from "./admin/importMap.js"


// Server function that will be passed to RootLayout
const serverFunction = async (args: any) => {
  "use server"
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

type Args = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Motion Records Admin",
  description: "Admin panel for Motion Records",
}

const Layout = ({ children }: Args) => {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}

export default Layout
