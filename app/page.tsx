import GlobalChat from '@/components/chat/GlobalChat'

export default function Home() {
  return (
    <div>
      <section className="hero">
        <h1>
          Engineering ideas<br />
          into systems
        </h1>

        <p>
          Rakennan käyttöliittymiä, kokeiluja ja tuotteita, joissa yhdistyy
          teknologia, design ja ajattelu.
        </p>
      </section>

      <section className="grid">
        <div className="card">
          <h3>Blog</h3>
          <p>Syvällisiä kirjoituksia kehityksestä ja AI:sta</p>
        </div>

        <div className="card">
          <h3>Notes</h3>
          <p>Lyhyitä oivalluksia ja havaintoja</p>
        </div>
      </section>
      <GlobalChat />
    </div>
  )
}