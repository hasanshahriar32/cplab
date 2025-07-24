import type React from "react"
/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from "next"

import config from "@payload-config"
import { RootLayout } from "@payloadcms/next/layouts"

import { importMap } from "./admin/importMap.js"

import "./custom.scss"

type Args = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: "Motion Records Admin",
  description: "Admin panel for Motion Records",
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap}>
    {children}
  </RootLayout>
)

export default Layout
