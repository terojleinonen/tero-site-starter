import { notFound } from 'next/navigation';
import { RichText } from '@/components/site/portable-text';
import { safeFetch } from '@/lib/sanity/client';
import { projectBySlugQuery, projectSlugsQuery } from '@/lib/sanity/queries';
import type { Project } from '@/lib/sanity/types';

export async function generateStaticParams() {
  const slugs = (await safeFetch<{ slug: string }[]>(projectSlugsQuery)) ?? [];
  return slugs;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await safeFetch<Project>(projectBySlugQuery, { slug });

  return {
    title: project?.title || 'Projekti'
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await safeFetch<Project>(projectBySlugQuery, { slug });

  if (!project) {
    notFound();
  }

  return (
    <article className="container py-16">
      <div className="card max-w-5xl px-6 py-8 md:px-10 md:py-12">
        <div className="eyebrow">{project.featured ? 'Featured project' : 'Project'}</div>
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white md:text-5xl">{project.title}</h1>
        {project.excerpt ? <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">{project.excerpt}</p> : null}

        {project.stack?.length ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-cyan-100/75"
              >
                {item}
              </span>
            ))}
          </div>
        ) : null}

        {project.links?.length ? (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:border-white/25 hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}

        <div className="prose mt-10">{project.body ? <RichText value={project.body} /> : null}</div>
      </div>
    </article>
  );
}
