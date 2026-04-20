import { extractPlainText } from './utils'

export function buildGlobalContext(posts: any[]) {
  return posts
    .slice(0, 5) // 🔥 limit
    .map((post) => {
      const text = extractPlainText(post.body).slice(0, 2000)

      return `
TITLE: ${post.title}
SLUG: ${post.slug}

${text}
      `
    })
    .join('\n\n---\n\n')
}