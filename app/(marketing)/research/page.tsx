import Link from "next/link";
import { SectionErrorBoundary } from "@/components/layout/SectionErrorBoundary";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { EmptyState } from "@/components/ui";
import { getProjects, getTrustSection } from "@/lib/content/site";
import { filterProjects } from "@/lib/utils/filtering";
import type { ProjectStatus } from "@/types/research";

export const revalidate = 300;

const statusTabs: Array<{ label: string; value: "all" | ProjectStatus | "seeking" }> = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Published", value: "published" }
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
    <div className="pt-32">
      <SectionErrorBoundary fallbackTitle="Research page unavailable">
        <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="mt-6 font-display text-5xl text-text-primary lg:text-6xl">
            The problems worth solving.
          </h1>

          <form action="/research" className="mt-10 grid gap-4 lg:grid-cols-[1fr_auto]" method="get">
            <input
              className="ui-field"
              defaultValue={activeQuery}
              name="q"
              placeholder="Search problems, methods, or clinical domains"
            />
            <input name="tags" type="hidden" value={activeTags.join(",")} />
            <input name="status" type="hidden" value={activeStatus} />
            <button
              className="ui-focus-ring inline-flex h-11 items-center justify-center rounded-token-pill border border-border-default px-5 py-3 font-medium text-text-primary transition hover:border-border-focus hover:text-accent-cyan"
              type="submit"
            >
              Search
            </button>
          </form>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {statusTabs.map((tab) => (
              <Link
                className={`text-sm transition ${
                  activeStatus === tab.value
                    ? "text-accent-cyan underline underline-offset-4"
                    : "text-text-tertiary hover:text-accent-cyan hover:underline"
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

          <div className="mt-12">

            {filtered.length ? (
              <div className="mt-4">
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
    </div>
  );
}
