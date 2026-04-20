export type Heading = {
  text: string
  id: string
  level: 'h2' | 'h3'
}

export type Post = {
  _id: string
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
  summary?: string[]
  summarySimple?: string[]
  mainImage?: any
  body?: any[]
}