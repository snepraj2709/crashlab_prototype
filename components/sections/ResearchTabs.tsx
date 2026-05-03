"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { PublicationsStory } from "@/components/sections/PublicationsStory";
import { cn } from "@/lib/utils/cn";
import type { ProjectSeed, PublicationEntry } from "@/types/research";

type Tab = "publications" | "research";

interface ResearchTabsProps {
  projects: ProjectSeed[];
  publications: PublicationEntry[];
}

const tabs: Array<{ id: Tab; label: string }> = [
  { id: "publications", label: "Publications" },
  { id: "research", label: "Active Research" },
];

const STATUS_LABELS: Record<string, string> = {
  active: "Active",
  published: "Published",
  completed: "Completed",
  "seeking-collaborators": "Seeking Collaborators",
};

const TYPE_LABELS: Record<PublicationEntry["type"], string> = {
  benchmark: "Benchmark",
  paper: "Paper",
  abstract: "Abstract",
  talk: "Talk",
};

const TEASER_MAX = 280;

function splitTeaser(text: string): { short: string; needsMore: boolean } {
  if (text.length <= TEASER_MAX) return { short: text, needsMore: false };
  const slice = text.slice(0, TEASER_MAX);
  const lastSpace = slice.lastIndexOf(" ");
  const end = lastSpace > TEASER_MAX * 0.55 ? lastSpace : TEASER_MAX;
  return { short: `${text.slice(0, end).trimEnd()}…`, needsMore: true };
}

const titleClass =
  "block text-xl font-normal leading-[1.35] text-navy-900 underline decoration-transparent underline-offset-[3px] transition-colors group-hover:text-accent-cyan group-hover:decoration-accent-cyan/50 sm:text-2xl sm:leading-snug";

function ExpandableBody({ body }: { body: string }): React.ReactElement {
  const [expanded, setExpanded] = useState(false);
  const { short, needsMore } = useMemo(() => splitTeaser(body), [body]);

  return (
    <div className="mt-5 text-[0.9375rem] leading-[1.75] text-text-secondary sm:text-base lg:mt-6">
      <p>
        {needsMore && !expanded ? short : body}
        {needsMore ? (
          <>
            {" "}
            <button
              aria-expanded={expanded}
              className="ui-focus-ring inline p-0 text-sm font-semibold text-accent-cyan underline decoration-transparent underline-offset-2 transition hover:text-text-primary hover:decoration-current"
              onClick={() => setExpanded((v) => !v)}
              type="button"
            >
              {expanded ? "less" : "more"}
            </button>
          </>
        ) : null}
      </p>
    </div>
  );
}

function PublicationRow({
  pub,
  showKindTag,
}: {
  pub: PublicationEntry;
  showKindTag?: boolean;
}): React.ReactElement {
  return (
    <article className="border-b border-border py-10 last:border-b-0 lg:py-12">
      {showKindTag ? (
        <span className="mb-3 inline-block border border-border px-1.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
          Publication
        </span>
      ) : null}

      {pub.link ? (
        <Link className="ui-focus-ring group block" href={pub.link} rel="noopener noreferrer" target="_blank">
          <h2 className="font-display font-semibold tracking-tight">
            <span className={titleClass}>{pub.title}</span>
          </h2>
        </Link>
      ) : (
        <h2 className="font-display text-xl font-semibold leading-[1.35] tracking-tight text-navy-900 sm:text-2xl sm:leading-snug">
          {pub.title}
        </h2>
      )}

      <ExpandableBody body={pub.summary} />

      <p className="mt-5 text-sm leading-relaxed text-text-secondary sm:mt-6">
        <span className="text-text-tertiary">by </span>
        {pub.authors.join(", ")}
      </p>

      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-text-tertiary sm:mt-5">
        <span>{pub.venue}</span>
        <span aria-hidden="true">·</span>
        <span>{pub.year}</span>
        <span aria-hidden="true">·</span>
        <span className="border border-border px-1.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
          {TYPE_LABELS[pub.type]}
        </span>
        {pub.tags.length ? (
          <>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="max-w-full sm:inline">
              {pub.tags.map((tag, i) => (
                <span key={tag}>
                  {i > 0 ? ", " : null}
                  <span className="text-text-secondary">{tag.replace(/-/g, " ")}</span>
                </span>
              ))}
            </span>
          </>
        ) : null}
      </p>
    </article>
  );
}

function ProjectRow({
  project,
  showKindTag,
}: {
  project: ProjectSeed;
  showKindTag?: boolean;
}): React.ReactElement {
  const body = project.summary || project.problemStatement;

  return (
    <article className="border-b border-border py-10 last:border-b-0 lg:py-12">
      {showKindTag ? (
        <span className="mb-3 inline-block border border-border px-1.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
          Research
        </span>
      ) : null}

      <Link className="ui-focus-ring group block" href={`/research/${project.slug}`}>
        <h2 className="font-display font-semibold tracking-tight">
          <span className={titleClass}>{project.title}</span>
        </h2>
      </Link>

      <ExpandableBody body={body} />

      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-text-tertiary sm:mt-5">
        <span className="border border-border px-1.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
          {STATUS_LABELS[project.status] ?? project.status}
        </span>
        {project.venue ? (
          <>
            <span aria-hidden="true">·</span>
            <span>{project.venue}</span>
          </>
        ) : null}
        {project.publishedAt ? (
          <>
            <span aria-hidden="true">·</span>
            <span>{new Date(project.publishedAt).getFullYear()}</span>
          </>
        ) : null}
        {project.tags.length ? (
          <>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="max-w-full sm:inline">
              {project.tags.map((tag, i) => (
                <span key={tag}>
                  {i > 0 ? ", " : null}
                  <span className="text-text-secondary">{tag.replace(/-/g, " ")}</span>
                </span>
              ))}
            </span>
          </>
        ) : null}
      </p>
    </article>
  );
}

type SearchResult =
  | { kind: "publication"; item: PublicationEntry }
  | { kind: "project"; item: ProjectSeed };

export function ResearchTabs({ projects, publications }: ResearchTabsProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState<Tab>("publications");
  const [query, setQuery] = useState("");

  const isSearching = query.trim().length > 0;

  const searchResults = useMemo((): SearchResult[] => {
    if (!isSearching) return [];
    const q = query.toLowerCase();

    const matchedPubs: SearchResult[] = publications
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.authors.some((a) => a.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.venue.toLowerCase().includes(q),
      )
      .map((item) => ({ kind: "publication", item }));

    const matchedProjects: SearchResult[] = projects
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.problemStatement.toLowerCase().includes(q) ||
          (p.summary ?? "").toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)),
      )
      .map((item) => ({ kind: "project", item }));

    return [...matchedPubs, ...matchedProjects];
  }, [query, isSearching, publications, projects]);

  return (
    <div>
      {/* Tab bar + search row */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="-mb-px flex items-end justify-between gap-6">
            {/* Tabs — hidden while searching */}
            {!isSearching ? (
              <nav aria-label="Research sections" className="flex gap-8">
                {tabs.map((tab) => (
                  <button
                    className={cn(
                      "border-b-2 pb-3 pt-4 text-sm font-semibold tracking-[0.01em] transition-colors duration-150",
                      activeTab === tab.id
                        ? "border-accent-cyan text-text-primary"
                        : "border-transparent text-text-tertiary hover:text-text-secondary",
                    )}
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    type="button"
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            ) : (
              <p className="pb-3 pt-4 text-sm text-text-tertiary">
                {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
              </p>
            )}

            {/* Search input — always visible */}
            <input
              className="mb-3 w-full max-w-[14rem] border border-border bg-bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-1 focus:ring-accent-cyan"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              type="search"
              value={query}
            />
          </div>
        </div>
      </div>

      {/* Search results */}
      {isSearching && (
        <section className="pt-6 pb-14 lg:pt-8 lg:pb-16">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-14 xl:px-16">
            {searchResults.length ? (
              <div>
                {searchResults.map((result) =>
                  result.kind === "publication" ? (
                    <PublicationRow key={`pub-${result.item.id}`} pub={result.item} showKindTag />
                  ) : (
                    <ProjectRow key={`proj-${result.item.slug}`} project={result.item} showKindTag />
                  ),
                )}
              </div>
            ) : (
              <p className="py-16 text-center text-sm text-text-tertiary">
                No results found. Try a different term.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Publications tab */}
      {!isSearching && activeTab === "publications" && (
        <section className="pt-6 pb-14 lg:pt-8 lg:pb-20">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-14 xl:px-16">
            <PublicationsStory publications={publications} />
          </div>
        </section>
      )}

      {/* Active Research tab */}
      {!isSearching && activeTab === "research" && (
        <section className="pt-6 pb-14 lg:pt-8 lg:pb-16">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-14 xl:px-16">
            <header className="flex flex-col gap-8 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between sm:pb-10">
              <div>
                <h2 className="font-display text-2xl text-text-primary lg:text-3xl">
                  Active Research
                </h2>
                <p className="mt-2 text-sm text-text-tertiary">
                  {projects.length} {projects.length === 1 ? "project" : "projects"}
                </p>
              </div>
            </header>
            <div>
              {projects.map((project) => (
                <ProjectRow key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
