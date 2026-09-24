import Link from 'next/link';

const links = [
  { href: '/blog', label: 'Blogi' },
  { href: '/notes', label: 'Tiedotteet' },
  { href: '/projects', label: 'Projektit' },
  { href: '/about', label: 'About' },
  { href: '/studio', label: 'Studio' }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07111a]/70 backdrop-blur-xl">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl border border-cyan-300/30 bg-cyan-300/10 shadow-[0_0_30px_rgba(114,208,255,0.15)]" />
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-cyan-100/65">Tero Leinonen</div>
            <div className="text-xs text-white/45">Developer · Builder · Interface thinker</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-3 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-cyan-300/30 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
