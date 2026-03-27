import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { LabMembersList, PortableTextContent, ProjectCard, RadleWidget } from "@/components/sections";
import { Badge, Button } from "@/components/ui";
import {
  getLabMemberGroups,
  getPeople,
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

  const [people, relatedProjects] = await Promise.all([
    getPeople(),
    getRelatedProjects(project.slug, project.tags)
  ]);
  const linkedSlugs = people.map((person) => person.slug);
  const projectMembers = getProjectLabMembers(project.slug);
  const memberGroups = getLabMemberGroups();
  const collaborationHref = project.audience.includes("industry") ? "/collaborate" : "/join";

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
          datePublished: project.publishedAt,
          url: `https://crashlab.in/research/${project.slug}`
        }}
      />

      <div className="pt-32">
        <section className="py-8 lg:py-16">
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
              <span className="rounded-full border border-border px-4 py-2 text-sm text-text-secondary" key={tag}>
                {tag}
              </span>
            ))}
          </div>

          {projectMembers.length ? (
            <div className="mt-14">
              <LabMembersList
                groups={memberGroups}
                intro="People actively contributing to this project right now, across research, clinical review, and systems support."
                linkedSlugs={linkedSlugs}
                members={projectMembers}
                title="Active Team Members"
                variant="project"
              />
            </div>
          ) : null}

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <PortableTextContent blocks={project.body} />
              {project.paperUrl ? (
                <div className="mt-10">
                  <Button href={project.paperUrl} rel="noreferrer" target="_blank">
                    Read the Paper
                  </Button>
                </div>
              ) : null}
            </div>

            <aside className="space-y-8">
              {project.metrics?.length ? <RadleWidget metrics={project.metrics} variant="feature" /> : null}
              <div className="rounded-[28px] border border-border bg-bg-surface p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">
                  Collaboration
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-text-primary">
                  Interested in collaborating on this research?
                </h2>
                <p className="mt-3 text-text-secondary">
                  Reach the lab through the track best suited to this project&apos;s audience and stage.
                </p>
                <div className="mt-6">
                  <Button href={collaborationHref} variant="secondary">
                    Start the conversation
                  </Button>
                </div>
              </div>
            </aside>
          </div>

          {relatedProjects.length ? (
            <div className="mt-20">
              <h2 className="font-display text-4xl text-text-primary">Related projects</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
