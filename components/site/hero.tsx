import Link from 'next/link';
import type { SiteSettings } from '@/lib/sanity/types';

export function Hero({ settings }: { settings: SiteSettings | null }) {
  const title = settings?.heroTitle || 'Rakennan ajatuksista toimivia järjestelmiä.';
  const subtitle =
    settings?.heroSubtitle ||
    'Oma kotipesä blogille, tiedotteille, projekteille ja tekniselle ajattelulle. Tämä starter on rakennettu näyttämään selkeältä, elokuvalliselta ja omalta.';

  return (
    <section className="container py-16 md:py-24">
      <div className="card overflow-hidden px-6 py-8 md:px-10 md:py-12">
        <div className="eyebrow">Personal command interface</div>
        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">{subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/blog"
                className="rounded-full border border-cyan-300/35 bg-cyan-300/12 px-5 py-3 text-sm font-medium text-white transition hover:bg-cyan-300/18"
              >
                Avaa blogi
              </Link>
              <Link
                href="/projects"
                className="rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/80 transition hover:border-white/25 hover:text-white"
              >
                Katso projektit
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {[
              ['Blogi', 'Pidemmät ajatukset, rakennusprosessit ja havainnot.'],
              ['Tiedotteet', 'Lyhyet julkaisut, release-notet ja ajankohtaiset huomiot.'],
              ['Projektit', 'Case studyt, stackit ja ulkoiset linkit.']
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-sm uppercase tracking-[0.24em] text-cyan-100/60">{title}</div>
                <p className="mt-3 text-sm leading-7 text-white/65">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
