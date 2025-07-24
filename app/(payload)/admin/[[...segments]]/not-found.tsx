/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
import type { Metadata } from "next"

import config from "@/payload-config"
import { NotFoundPage, generatePageMetadata } from "@payloadcms/next/views"

import { importMap } from "../importMap.js"

export const generateMetadata = (): Promise<Metadata> =>
  generatePageMetadata({
	config: Promise.resolve(config),
	params: Promise.resolve({ segments: [] }),
	searchParams: Promise.resolve({})
  })

const NotFound = () =>
  NotFoundPage({
	config,
	importMap,
	params: Promise.resolve({ segments: [] }),
	searchParams: Promise.resolve({}),
  })

export default NotFound
