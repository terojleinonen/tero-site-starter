import { notFound } from 'next/navigation'
import { getPost } from '@/lib/sanity/queries'
import { extractHeadings, extractPlainText } from '@/lib/content/utils'
import PortableTextRenderer from '@/components/article/PortableTextRenderer'
import TableOfContents from '@/components/article/TableOfContents'
import AISummaryToggle from '@/components/article/AISummaryToggle'
import AskArticleChat from '@/components/chat/AskArticleChat'
import ArticleHeader from '@/components/article/ArticleHeader'

// Refetch from Sanity at most once a minute
export const revalidate = 60

type PageProps = {
  params: Promise<{ slug: string }>
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  const headings = extractHeadings(post.body || [])
  const plainText = extractPlainText(post.body || [])

  return (
    <>
      <article className="article">
        <ArticleHeader
          title={post.title}
          excerpt={post.excerpt}
          image={post.mainImage}
          publishedAt={post.publishedAt}
        readingTime={Math.ceil(plainText.split(' ').length / 200)}
      />

        <AISummaryToggle
          summary={post.summary}
          summarySimple={post.summarySimple}
        />

        <section className="content">
          <PortableTextRenderer value={post.body} />
        </section>

        <AskArticleChat
          content={plainText}
          slug={slug}
        />
      </article>

      <TableOfContents headings={headings} />
    </>
  )
}