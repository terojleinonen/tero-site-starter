import { notFound } from 'next/navigation';
import { RichText } from '@/components/site/portable-text';
import { safeFetch } from '@/lib/sanity/client';
import { noteBySlugQuery, noteSlugsQuery } from '@/lib/sanity/queries';
import type { Note } from '@/lib/sanity/types';

export async function generateStaticParams() {
  const slugs = (await safeFetch<{ slug: string }[]>(noteSlugsQuery)) ?? [];
  return slugs;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = await safeFetch<Note>(noteBySlugQuery, { slug });

  return {
    title: note?.title || 'Tiedote'
  };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = await safeFetch<Note>(noteBySlugQuery, { slug });

  if (!note) {
    notFound();
  }

  return (
    <article className="container py-16">
      <div className="card max-w-4xl px-6 py-8 md:px-10 md:py-12">
        <div className="eyebrow">{note.kind || 'Tiedote'}</div>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">{note.title}</h1>
        {note.excerpt ? <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">{note.excerpt}</p> : null}
        <div className="mt-6 text-sm uppercase tracking-[0.2em] text-white/45">
          {note.publishedAt ? new Date(note.publishedAt).toLocaleDateString('fi-FI') : ''}
        </div>
        <div className="prose mt-10">{note.body ? <RichText value={note.body} /> : null}</div>
      </div>
    </article>
  );
}
