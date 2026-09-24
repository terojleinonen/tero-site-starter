import { sanityClient } from './client'

export async function getPosts() {
  return sanityClient.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      featured,
      summary,
      summarySimple,
      mainImage
    }
  `)
}

export async function getFeaturedPost() {
  return sanityClient.fetch(`
    *[_type == "post" && featured == true][0]{
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      summary,
      summarySimple,
      mainImage
    }
  `)
}

export async function getPost(slug: string) {
  return sanityClient.fetch(
    `
    *[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      excerpt,
      body,
      mainImage,
      summary,
      summarySimple,
      publishedAt
    }
    `,
    { slug }
  )
}

export async function getAllPostContents() {
  return sanityClient.fetch(`
    *[_type == "post"]{
      title,
      "slug": slug.current,
      body
    }
  `)
}

export const notesIndexQuery = `
  *[_type == "note" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    kind,
    publishedAt
  }
`

export const noteBySlugQuery = `
  *[_type == "note" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    kind,
    publishedAt,
    body
  }
`

export const noteSlugsQuery = `
  *[_type == "note" && defined(slug.current)]{ "slug": slug.current }
`

export const projectsIndexQuery = `
  *[_type == "project" && defined(slug.current)] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featured,
    stack,
    publishedAt
  }
`

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    featured,
    stack,
    links,
    publishedAt,
    body
  }
`

export const projectSlugsQuery = `
  *[_type == "project" && defined(slug.current)]{ "slug": slug.current }
`
