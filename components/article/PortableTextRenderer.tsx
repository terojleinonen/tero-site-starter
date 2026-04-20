'use client'

import {
  PortableText,
  type PortableTextComponents,
} from '@portabletext/react'
import CodeBlock from './CodeBlock'
import { urlFor } from '@/sanity/lib/image'

type Props = {
  value: any
}

function getText(children: any[]): string {
  return (
    children
      ?.map((child) => {
        if (typeof child === 'string') return child
        if (child?.props?.children) {
          return Array.isArray(child.props.children)
            ? child.props.children.join('')
            : child.props.children
        }
        return ''
      })
      .join('') || ''
  )
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
}

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="pt-h1">{children}</h1>,

    h2: ({ children }) => {
      const text = getText(children as any[])
      const id = slugify(text)

      return (
        <h2 id={id} className="pt-h2 group">
          {children}
          <a href={`#${id}`} className="anchor">
            #
          </a>
        </h2>
      )
    },

    h3: ({ children }) => {
      const text = getText(children as any[])
      const id = slugify(text)

      return (
        <h3 id={id} className="pt-h3 group">
          {children}
          <a href={`#${id}`} className="anchor">
            #
          </a>
        </h3>
      )
    },

    normal: ({ children }) => <p className="pt-p">{children}</p>,

    blockquote: ({ children }) => (
      <blockquote className="pt-quote">{children}</blockquote>
    ),
  },

  types: {
    image: ({ value }) => {
      if (!value) return null

      return (
        <img
          src={urlFor(value).width(1200).quality(80).url()}
          alt=""
          className="pt-image"
        />
      )
    },

    code: ({ value }: any) => {
      if (!value?.code) return null

      return (
        <CodeBlock
          code={value.code}
          language={value.language || 'javascript'}
        />
      )
    },
  },

  marks: {
    link: ({ children, value }) => {
      const href = value?.href || ''

      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="pt-link"
        >
          {children}
        </a>
      )
    },

    code: ({ children }) => (
      <code className="inline-code">{children}</code>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="pt-ul">{children}</ul>,
    number: ({ children }) => <ol className="pt-ol">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => <li className="pt-li">{children}</li>,
    number: ({ children }) => <li className="pt-li">{children}</li>,
  },
}

export default function PortableTextRenderer({ value }: Props) {
  if (!value) return null

  return <PortableText value={value} components={components} />
}