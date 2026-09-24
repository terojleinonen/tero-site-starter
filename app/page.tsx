import Link from 'next/link'
import GlobalChat from '@/components/chat/GlobalChat'

export default function Home() {
  return (
    <div className="container">
      <section className="hero">
        <div className="eyebrow">Tero Leinonen</div>
        <h1>
          Engineering ideas<br />
          into systems
        </h1>

        <p>
          Rakennan käyttöliittymiä, kokeiluja ja tuotteita, joissa yhdistyy
          teknologia, design ja ajattelu.
        </p>
      </section>

      <section className="home-grid">
        <Link href="/blog" className="card card-link">
          <h3>Blog</h3>
          <p>Syvällisiä kirjoituksia kehityksestä ja AI:sta</p>
        </Link>

        <Link href="/notes" className="card card-link">
          <h3>Notes</h3>
          <p>Lyhyitä oivalluksia ja havaintoja</p>
        </Link>

        <Link href="/projects" className="card card-link">
          <h3>Projects</h3>
          <p>Case studyt, stackit ja ulkoiset linkit</p>
        </Link>
      </section>

      <GlobalChat />
    </div>
  )
}
