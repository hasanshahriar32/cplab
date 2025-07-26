import React from 'react'
import type { DefaultNodeTypes, SerializedBlockNode } from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as RichTextConverter
} from '@payloadcms/richtext-lexical/react'
import { SerializedHeadingNode } from '@payloadcms/richtext-lexical'
import { SerializedLinkNode } from '@payloadcms/richtext-lexical'

// Custom block types
type YoutubeBlock = {
  videoId: string
  title?: string
  aspectRatio: '16:9' | '4:3' | '1:1'
}

type CalloutBlock = {
  type: 'info' | 'warning' | 'success' | 'error'
  content: any
}

type CustomBlockTypes = 
  | SerializedBlockNode<YoutubeBlock>
  | SerializedBlockNode<CalloutBlock>

type NodeTypes = DefaultNodeTypes | CustomBlockTypes

// Internal link converter
export const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  
  if (!value || typeof value === 'string') {
    return '#'
  }

  const document = value as any
  const slug = document.slug
  
  if (relationTo === 'lab-news') {
    return `/news/${slug}`
  } else if (relationTo === 'blog-posts') {
    return `/blog/${slug}`
  } else {
    return `/${slug}`
  }
}

// Heading converter with anchor IDs
export const headingConverter = {
  heading: ({ node, nodesToJSX }: { node: SerializedHeadingNode; nodesToJSX: any }) => {
    const text = nodesToJSX({ nodes: node.children })
    
    if (node.tag === 'h2') {
      const textContent = text.join('').replace(/<[^>]*>/g, '')
      const id = textContent
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
      
      return <h2 id={id} className="text-2xl font-bold text-white mt-8 mb-4">{text}</h2>
    } else if (node.tag === 'h3') {
      const textContent = text.join('').replace(/<[^>]*>/g, '')
      const id = textContent
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
      
      return <h3 id={id} className="text-xl font-semibold text-white mt-6 mb-3">{text}</h3>
    } else {
      const Tag = node.tag as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      return <Tag className="text-white">{text}</Tag>
    }
  }
}

// YouTube component
const YouTubeEmbed = ({ videoId, title, aspectRatio }: YoutubeBlock) => {
  const aspectRatioClass = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
    '1:1': 'aspect-square'
  }[aspectRatio] || 'aspect-video'

  return (
    <div className="my-8">
      {title && (
        <h4 className="text-lg font-medium text-white mb-4">{title}</h4>
      )}
      <div className={`w-full ${aspectRatioClass} bg-gray-800 rounded-lg overflow-hidden`}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || 'YouTube video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  )
}

// Callout component
const Callout = ({ type, content }: CalloutBlock) => {
  const typeStyles = {
    info: 'bg-blue-500/20 border-blue-500/50 text-blue-100',
    warning: 'bg-yellow-500/20 border-yellow-500/50 text-yellow-100',
    success: 'bg-green-500/20 border-green-500/50 text-green-100',
    error: 'bg-red-500/20 border-red-500/50 text-red-100'
  }

  const icons = {
    info: '💡',
    warning: '⚠️',
    success: '✅',
    error: '❌'
  }

  return (
    <div className={`p-4 rounded-lg border-l-4 my-6 ${typeStyles[type]}`}>
      <div className="flex items-start space-x-3">
        <span className="text-xl">{icons[type]}</span>
        <div className="flex-1">
          <RichTextConverter data={content} converters={jsxConverter} />
        </div>
      </div>
    </div>
  )
}

// Main JSX converter
export const jsxConverter: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  ...headingConverter,
  
  // Custom paragraph styling
  paragraph: ({ node, nodesToJSX }) => {
    return <p className="text-gray-300 leading-relaxed mb-4">{nodesToJSX({ nodes: node.children })}</p>
  },

  // Custom list styling
  list: ({ node, nodesToJSX }) => {
    const Tag = node.tag as 'ul' | 'ol'
    const className = node.tag === 'ul' 
      ? 'list-disc list-inside text-gray-300 space-y-2 mb-4'
      : 'list-decimal list-inside text-gray-300 space-y-2 mb-4'
    
    return <Tag className={className}>{nodesToJSX({ nodes: node.children })}</Tag>
  },

  listitem: ({ node, nodesToJSX }) => {
    return <li className="text-gray-300">{nodesToJSX({ nodes: node.children })}</li>
  },

  // Custom blockquote styling
  quote: ({ node, nodesToJSX }) => {
    return (
      <blockquote className="border-l-4 border-blue-500 pl-6 py-4 my-6 bg-gray-800/50 rounded-r-lg">
        <div className="text-gray-300 italic">
          {nodesToJSX({ nodes: node.children })}
        </div>
      </blockquote>
    )
  },

  // Upload/Media styling
  upload: ({ node }) => {
    const value = node.value as any
    const { alt, caption, url, width, height } = value || {}
    
    return (
      <figure className="my-8">
        <img
          src={url || '/placeholder.jpg'}
          alt={alt || ''}
          width={width}
          height={height}
          className="w-full h-auto rounded-lg border border-gray-700"
        />
        {caption && (
          <figcaption className="text-sm text-gray-400 text-center mt-2">
            {caption}
          </figcaption>
        )}
      </figure>
    )
  },

  // Custom blocks
  blocks: {
    youtube: ({ node }: { node: SerializedBlockNode<YoutubeBlock> }) => 
      <YouTubeEmbed {...node.fields} />,
    
    callout: ({ node }: { node: SerializedBlockNode<CalloutBlock> }) => 
      <Callout {...node.fields} />,
  },
})
