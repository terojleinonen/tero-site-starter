import { ContentCard } from '@/components/site/content-card';
import { EmptyState } from '@/components/site/empty-state';
import { SectionHeading } from '@/components/site/section-heading';
import { safeFetch } from '@/lib/sanity/client';
import { notesIndexQuery } from '@/lib/sanity/queries';
import type { Note } from '@/lib/sanity/types';

// Refetch from Sanity at most once a minute
export const revalidate = 60;

export const metadata = {
  title: 'Tiedotteet'
};

export default async function NotesPage() {
  const notes = (await safeFetch<Note[]>(notesIndexQuery)) ?? [];

  return (
    <section className="container py-16">
      <SectionHeading
        eyebrow="Updates"
        title="Tiedotteet ja nopeat julkaisut"
        text="Tähän osioon sopivat ilmoitukset, julkaisutiedotteet, statuspäivitykset ja lyhyet havainnot."
      />

      {notes.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {notes.map((note) => (
            <ContentCard
              key={note._id}
              href={`/notes/${note.slug.current}`}
              title={note.title}
              excerpt={note.excerpt}
              meta={note.publishedAt ? new Date(note.publishedAt).toLocaleDateString('fi-FI') : undefined}
              tag={note.kind || 'Tiedote'}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Ei vielä tiedotteita"
          text="Tämä syöte alkaa täyttyä heti, kun lisäät Sanity Studioon ensimmäiset lyhyet julkaisut."
        />
      )}
    </section>
  );
}
