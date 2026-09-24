import { createClient } from 'next-sanity'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: true,
})

// Returns null instead of throwing so pages can render an empty state
// when Sanity is unreachable or not configured.
export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query, params)
  } catch (error) {
    console.error('Sanity fetch failed:', error)
    return null
  }
}
