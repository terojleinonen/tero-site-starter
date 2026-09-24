import type { PortableTextBlock } from '@portabletext/react'

type Slug = { current: string }

export type Note = {
  _id: string
  title: string
  slug: Slug
  excerpt?: string
  kind?: string
  publishedAt?: string
  body?: PortableTextBlock[]
}

export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  _id: string
  title: string
  slug: Slug
  excerpt?: string
  featured?: boolean
  stack?: string[]
  links?: ProjectLink[]
  publishedAt?: string
  body?: PortableTextBlock[]
}

export type SiteSettings = {
  heroTitle?: string
  heroSubtitle?: string
}
