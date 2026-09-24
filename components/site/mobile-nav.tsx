'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type NavLink = { href: string; label: string };

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close when navigating to another page
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? 'Sulje valikko' : 'Avaa valikko'}
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/80 transition hover:border-cyan-300/30 hover:text-white"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
          {open ? (
            <path d="M4 4l10 10M14 4L4 14" />
          ) : (
            <path d="M2.5 5h13M2.5 9h13M2.5 13h13" />
          )}
        </svg>
      </button>

      {open ? (
        <nav
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-b border-white/10 bg-[#07111a] shadow-[0_24px_48px_rgba(0,0,0,0.5)]"
        >
          <ul className="container flex flex-col gap-1 py-4">
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? 'page' : undefined}
                    className={`block rounded-2xl px-4 py-3 text-base transition ${
                      active
                        ? 'bg-cyan-300/10 text-white'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      ) : null}
    </div>
  );
}
