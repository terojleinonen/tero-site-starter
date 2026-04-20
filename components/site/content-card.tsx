import Link from 'next/link';

type Props = {
  href: string;
  title: string;
  excerpt?: string;
  meta?: string;
  tag?: string;
};

export function ContentCard({ href, title, excerpt, meta, tag }: Props) {
  return (
    <Link href={href} className="card group flex h-full flex-col p-6 transition hover:-translate-y-1">
      {tag ? (
        <div className="mb-4 w-fit rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.24em] text-cyan-100/70">
          {tag}
        </div>
      ) : null}
      <h3 className="text-2xl font-semibold text-white transition group-hover:text-cyan-100">{title}</h3>
      {excerpt ? <p className="mt-4 flex-1 leading-7 text-white/65">{excerpt}</p> : null}
      {meta ? <div className="mt-6 text-sm uppercase tracking-[0.22em] text-white/40">{meta}</div> : null}
    </Link>
  );
}
