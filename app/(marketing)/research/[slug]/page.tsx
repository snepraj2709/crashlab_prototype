import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { PortableTextContent, ProjectCard } from "@/components/sections";
import { Badge } from "@/components/ui";
import {
  getProjectBySlug,
  getProjectLabMembers,
  getProjects,
  getRelatedProjects
} from "@/lib/content/site";
import { formatDate } from "@/lib/utils/formatDate";

export const revalidate = 3600;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.problemStatement} | CRASH Lab Research`,
    description: project.summary,
    openGraph: {
      title: project.problemStatement,
      description: project.summary,
      images: [project.heroImage?.url || "/og/default.svg"]
    }
  };
}

export default async function ResearchProjectPage({
  params
}: {
  params: { slug: string };
}): Promise<React.ReactElement> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(project.slug, project.tags);
  const projectMembers = getProjectLabMembers(project.slug);
  const collaborationHref = project.audience.includes("industry") ? "/collaborate" : "/join";

  function getInitials(name: string): string {
    return name
      .split(" ")
      .map((part) => part[0] ?? "")
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ScholarlyArticle",
          name: project.title,
          description: project.summary,
          author: { "@type": "Person", name: "Dr. Suvrankar Datta" },
          publisher: { "@type": "Organization", name: "CRASH Lab, Ashoka University" },
          ...(project.publishedAt ? { datePublished: project.publishedAt } : {}),
          url: `https://crashlab.in/research/${project.slug}`
        }}
      />

      <div>
        <section className="py-8 lg:py-12">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Research Project</p>
          <h1 className="mt-6 max-w-5xl font-display text-5xl text-text-primary lg:text-6xl">
            {project.problemStatement}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Badge
              status={
                project.seekingCollaborators && project.status !== "published"
                  ? "seeking-collaborators"
                  : project.status
              }
            />
            {project.venue ? (
              <span className="text-sm uppercase tracking-[0.16em] text-text-tertiary">
                {project.venue}
              </span>
            ) : null}
            {project.publishedAt ? (
              <span className="text-sm text-text-secondary">{formatDate(project.publishedAt)}</span>
            ) : null}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.tags.map((tag) => (
              <span className="rounded-none border border-border px-4 py-2 text-sm text-text-secondary" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          {project.metrics?.length ? (
            <div className="mt-12 border-y border-border py-5">
              <div className="grid gap-6 md:grid-cols-3 md:divide-x md:divide-border">
                {project.metrics.map((metric) => (
                  <div className="md:px-6 md:first:pl-0 md:last:pr-0" key={metric.label}>
                    <p className="font-mono text-3xl text-text-primary">{metric.value}</p>
                    <p className="mt-2 text-sm text-text-secondary">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {projectMembers.length ? (
            <section className="mt-14 border-t border-border pt-8">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Project Team</p>
              <div className="mt-6 space-y-4">
                {projectMembers.map((member) => (
                  <div className="flex items-center gap-4" key={member.id}>
                    <span className="flex size-10 items-center justify-center rounded-none border border-border-default text-xs text-text-secondary">
                      {getInitials(member.name)}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{member.name}</p>
                      <p className="text-xs text-text-tertiary">
                        {member.tenure} · {member.affiliation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <PortableTextContent blocks={project.body} />
              {project.paperUrl ? (
                <div className="mt-10">
                  <a
                    className="text-sm text-accent-cyan transition hover:opacity-75"
                    href={project.paperUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Read the paper ↗
                  </a>
                </div>
              ) : null}
            </div>

            <aside className="space-y-8">
              <div className="border-t border-border pt-5">
                <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Collaboration</p>
                <h2 className="mt-4 text-2xl font-medium text-text-primary">
                  Interested in collaborating on this research?
                </h2>
                <p className="mt-3 text-sm leading-8 text-text-secondary">
                  Reach the lab through the track best suited to this project&apos;s audience and stage.
                </p>
                <div className="mt-5">
                  <Link
                    className="text-sm text-accent-cyan transition hover:opacity-75"
                    href={collaborationHref}
                  >
                    Start the conversation →
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {relatedProjects.length ? (
            <div className="mt-20">
              <h2 className="font-display text-4xl text-text-primary">Related projects</h2>
              <div className="mt-8">
                {relatedProjects.map((relatedProject) => (
                  <ProjectCard key={relatedProject.slug} project={relatedProject} showMetadata />
                ))}
              </div>
            </div>
          ) : null}
          </div>
        </section>
      </div>
    </>
  );
}
