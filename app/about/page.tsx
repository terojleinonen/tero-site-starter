import { SectionHeading } from '@/components/site/section-heading';

export const metadata = {
  title: 'About'
};

export default function AboutPage() {
  return (
    <section className="container py-16">
      <SectionHeading
        eyebrow="About"
        title="Tämä sivu on rakennettu näyttämään tekijältään"
        text="Starter ei ole geneerinen portfolio, vaan pohja persoonalliselle julkaisualustalle. Vaihda tämä teksti omaksi manifestiksesi."
      />

      <div className="card max-w-4xl px-6 py-8 md:px-10 md:py-10">
        <div className="prose">
          <p>
            Olen web-kehittäjä ja rakentaja, jota kiinnostavat käyttöliittymät, järjestelmät,
            sisältörakenteet ja tavat tehdä teknologiasta sekä hyödyllistä että visuaalisesti muistettavaa.
          </p>
          <p>
            Tämä starter erottaa kolme eri julkaisutapaa: syvällisen blogin, nopeat tiedotteet ja
            projektikohtaiset case studyt. Se on hyvä pohja, jos haluat että sivustosi ei vain esittele
            sinua, vaan myös näyttää miten ajattelet.
          </p>
        </div>
      </div>
    </section>
  );
}
