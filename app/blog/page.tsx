import Link from 'next/link'
import { getPosts, getFeaturedPost } from '@/lib/sanity/queries'
import { EmptyState } from '@/components/site/empty-state'

type Post = {
  title: string
  slug: string
  excerpt?: string
  publishedAt?: string
}

export default async function BlogPage() {
  const posts: Post[] = await getPosts()
  const featured: Post | null = await getFeaturedPost()

  const secondary = posts.filter(p => p.slug !== featured?.slug).slice(0, 2)
  const rest = posts.filter(p => p.slug !== featured?.slug).slice(2)

  return (
    <div className="magazine">
      {/* 🧠 TITLE */}
      <h1 style={{ fontSize: '42px', fontWeight: 600 }}>
        Writing & Thinking
      </h1>

      {posts.length === 0 && !featured && (
        <div className="mt-10">
          <EmptyState
            title="Ei vielä kirjoituksia"
            text="Blogi täyttyy heti, kun julkaiset ensimmäisen postauksen Sanity Studiossa."
          />
        </div>
      )}

      {/* 🔥 FEATURED */}
      {featured && (
        <section className="featured">
          <Link href={`/blog/${featured.slug}`}>
            <h2 className="cursor-pointer hover:opacity-80 transition">
              {featured.title}
            </h2>
          </Link>

          {featured.excerpt && <p>{featured.excerpt}</p>}
        </section>
      )}

      {/* ⚡ SECONDARY */}
      <section className="secondary">
        {secondary.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="card cursor-pointer">
              <h3>{post.title}</h3>
              {post.excerpt && <p>{post.excerpt}</p>}
            </div>
          </Link>
        ))}
      </section>

      {/* 🧾 LIST */}
      <section className="list">
        {rest.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <div className="list-item cursor-pointer">
              <h4>{post.title}</h4>

              {post.publishedAt && (
                <span>
                  {new Date(post.publishedAt).toLocaleDateString('fi-FI', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
            </div>
          </Link>
        ))}
      </section>
    </div>
  )
}