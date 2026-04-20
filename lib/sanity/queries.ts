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