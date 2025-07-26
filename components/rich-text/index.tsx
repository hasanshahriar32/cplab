'use client'

import React from 'react'
import { RichText as RichTextConverter } from '@payloadcms/richtext-lexical/react'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { jsxConverter } from './converters'


type Props = {
  data: SerializedEditorState
} & React.HTMLAttributes<HTMLDivElement>

export function RichText(props: Props) {
  const { className, data, ...rest } = props

  if (!data) {
    return null
  }

  return (
    <div className={`prose prose-invert max-w-none ${className || ''}`} {...rest}>
      <RichTextConverter
        data={data}
        converters={jsxConverter}
      />
    </div>
  )
}
