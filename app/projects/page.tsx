import { ContentCard } from '@/components/site/content-card';
import { EmptyState } from '@/components/site/empty-state';
import { SectionHeading } from '@/components/site/section-heading';
import { safeFetch } from '@/lib/sanity/client';
import { projectsIndexQuery } from '@/lib/sanity/queries';
import type { Project } from '@/lib/sanity/types';

// Refetch from Sanity at most once a minute
export const revalidate = 60;

export const metadata = {
  title: 'Projektit'
};

export default async function ProjectsPage() {
  const projects = (await safeFetch<Project[]>(projectsIndexQuery)) ?? [];

  return (
    <section className="container py-16">
      <SectionHeading
        eyebrow="Case studies"
        title="Projektit"
        text="Näytä mitä olet rakentanut, millä stackilla, miksi ratkaisut tehtiin ja mitä opit matkan varrella."
      />

      {projects.length > 0 ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {projects.map((project) => (
            <ContentCard
              key={project._id}
              href={`/projects/${project.slug.current}`}
              title={project.title}
              excerpt={project.excerpt}
              meta={project.stack?.join(' · ')}
              tag={project.featured ? 'Featured' : 'Project'}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="Ei vielä projekteja"
          text="Tässä starterissa projektit on nostettu blogin ja tiedotteiden rinnalle omaksi sisältötyypikseen."
        />
      )}
    </section>
  );
}
