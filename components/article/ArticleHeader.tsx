import { urlFor } from '@/lib/sanity/image'

type Props = {
  title: string
  excerpt?: string
  image?: any
  publishedAt?: string
  readingTime?: number
}

/* 🧠 FORMAT DATE */
function formatDate(date?: string) {
  if (!date) return null

  return new Date(date).toLocaleDateString('fi-FI', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function ArticleHeader({
  title,
  excerpt,
  image,
  publishedAt,
  readingTime,
}: Props) {
  const date = formatDate(publishedAt)

  return (
    <header className="article-header">
      {/* 🔥 HERO IMAGE */}
      {image && (
        <div className="article-hero">
          <img
            src={urlFor(image).width(1600).quality(85).url()}
            alt={title}
          />
        </div>
      )}

      {/* 🧠 META */}
      <div className="article-meta">
        {date && <span>{date}</span>}
        {readingTime && <span>· {readingTime} min read</span>}
      </div>

      {/* 📰 TITLE */}
      <h1 className="article-title">{title}</h1>

      {/* ✍️ EXCERPT */}
      {excerpt && (
        <p className="article-excerpt">{excerpt}</p>
      )}
    </header>
  )
}