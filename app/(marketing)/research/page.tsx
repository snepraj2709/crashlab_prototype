import Link from "next/link";

import { SectionErrorBoundary } from "@/components/layout/SectionErrorBoundary";
import { TrustSignalsSection } from "@/components/sections/TrustSignalsSection";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { EmptyState, SectionLabel } from "@/components/ui";
import { getProjects, getTrustSection } from "@/lib/content/site";
import { filterProjects } from "@/lib/utils/filtering";
import type { ProjectStatus } from "@/types/research";

export const revalidate = 300;

const statusTabs: Array<{ label: string; value: "all" | ProjectStatus | "seeking" }> = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Published", value: "published" },
  { label: "Seeking Collaborators", value: "seeking" }
];

function buildQuery(params: Record<string, string | undefined>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      searchParams.set(key, value);
    }
  });

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

export default async function ResearchPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}): Promise<React.ReactElement> {
  const projects = await getProjects();
  const activeStatus = typeof searchParams.status === "string" ? searchParams.status : "all";
  const activeQuery = typeof searchParams.q === "string" ? searchParams.q : "";
  const activeTags =
    typeof searchParams.tags === "string"
      ? searchParams.tags.split(",").filter(Boolean)
      : [];

  const filtered = filterProjects(projects, {
    query: activeQuery,
    status: activeStatus as "all" | ProjectStatus | "seeking",
    tags: activeTags
  });
  const tags = Array.from(new Set(projects.flatMap((project) => project.tags))).sort();
  const trustSection = getTrustSection();

  return (
    <SectionErrorBoundary fallbackTitle="Research page unavailable">
      <section className="pt-32 py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel number="01" text="Research" />
          <h1 className="mt-6 font-display text-5xl text-text-primary lg:text-6xl">
            The problems worth solving.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-secondary">
            Navigate by clinical problem, not by paper title.
          </p>

          <form action="/research" className="mt-10 grid gap-4 rounded-[28px] border border-border bg-bg-surface p-6 lg:grid-cols-[1fr_auto]" method="get">
            <input
              className="w-full rounded-2xl border border-border bg-bg-primary px-4 py-3 text-text-primary"
              defaultValue={activeQuery}
              name="q"
              placeholder="Search problems, methods, or clinical domains"
            />
            <input name="tags" type="hidden" value={activeTags.join(",")} />
            <input name="status" type="hidden" value={activeStatus} />
            <button
              className="rounded-full bg-accent-cyan px-5 py-3 font-medium text-[var(--color-text-inverse)]"
              type="submit"
            >
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-3">
            {statusTabs.map((tab) => (
              <Link
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  activeStatus === tab.value
                    ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan"
                    : "border-border text-text-secondary hover:border-accent-cyan hover:text-accent-cyan"
                }`}
                href={`/research${buildQuery({
                  q: activeQuery || undefined,
                  tags: activeTags.join(",") || undefined,
                  status: tab.value === "all" ? undefined : tab.value
                })}`}
                key={tab.value}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            {tags.map((tag) => {
              const nextTags = activeTags.includes(tag)
                ? activeTags.filter((entry) => entry !== tag)
                : [...activeTags, tag];

              return (
                <Link
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    activeTags.includes(tag)
                      ? "border-accent-cyan bg-accent-cyan/10 text-accent-cyan"
                      : "border-border text-text-secondary hover:border-accent-cyan hover:text-accent-cyan"
                  }`}
                  href={`/research${buildQuery({
                    q: activeQuery || undefined,
                    status: activeStatus === "all" ? undefined : activeStatus,
                    tags: nextTags.join(",") || undefined
                  })}`}
                  key={tag}
                >
                  {tag}
                </Link>
              );
            })}
          </div>

          <div className="mt-12">

            {filtered.length ? (
              <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filtered.map((project) => (
                  <ProjectCard key={project.slug} project={project} showMetadata />
                ))}
              </div>
            ) : (
              <EmptyState
                body="Try removing a tag or changing the publication status filter."
                title="No research projects match those filters."
              />
            )}
          </div>
        </div>
      </section>
    </SectionErrorBoundary>
  );
}
