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

function buildTabs(pubCount: number, projectCount: number): Array<{ id: Tab; label: string }> {
  return [
    { id: "publications", label: `Publications (${pubCount})` },
    { id: "research", label: `Active Research (${projectCount})` },
  ];
}

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
  const titleNode = (
    <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-text-primary sm:text-2xl">
      {showKindTag ? <span className="mr-2 text-xs font-medium uppercase tracking-wide text-text-tertiary">Publication · </span> : null}
      {pub.title}
    </h2>
  );

  return (
    <article className="border-b border-border py-8 last:border-b-0 lg:py-10">
      {pub.link ? (
        <Link className="ui-focus-ring group block transition-opacity hover:opacity-75" href={pub.link} rel="noopener noreferrer" target="_blank">
          {titleNode}
        </Link>
      ) : titleNode}

      <ExpandableBody body={pub.summary} />

      <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-tertiary">
        <span>
          <span className="text-text-tertiary">by </span>
          <span className="text-text-secondary">{pub.authors.join(", ")}</span>
        </span>
        <span aria-hidden="true">·</span>
        <span>{pub.venue}</span>
        <span aria-hidden="true">·</span>
        <span>{pub.year}</span>
        <span aria-hidden="true">·</span>
        <span className="text-xs font-medium uppercase tracking-wide">{TYPE_LABELS[pub.type]}</span>
        {pub.tags.length ? (
          <>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden text-text-secondary sm:inline">
              {pub.tags.map((tag) => tag.replace(/-/g, " ")).join(", ")}
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
    <article className="border-b border-border py-8 last:border-b-0 lg:py-10">
      <Link className="ui-focus-ring group block transition-opacity hover:opacity-75" href={`/research/${project.slug}`}>
        <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-text-primary sm:text-2xl">
          {showKindTag ? <span className="mr-2 text-xs font-medium uppercase tracking-wide text-text-tertiary">Research · </span> : null}
          {project.title}
        </h2>
      </Link>

      <ExpandableBody body={body} />

      <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-tertiary">
        <span className="text-xs font-medium uppercase tracking-wide">
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
            <span className="hidden text-text-secondary sm:inline">
              {project.tags.map((tag) => tag.replace(/-/g, " ")).join(", ")}
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
  const [year, setYear] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const tabs = buildTabs(publications.length, projects.length);

  const years = useMemo(() => {
    const unique = Array.from(new Set(publications.map((p) => String(p.year))));
    unique.sort((a, b) => Number(b) - Number(a));
    return ["all", ...unique];
  }, [publications]);

  const isSearching = query.trim().length > 0;
  const showFilters = !isSearching && activeTab === "publications";

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
      {/* Tab bar + filters + search */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-14 xl:px-16">
          {/* Mobile/tablet: tabs row, then controls row stacked below.
              lg+: single flex row with tabs left, controls right. */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">

            {/* Tabs (or search result count) */}
            {!isSearching ? (
              <nav aria-label="Research sections" className="-mb-px flex gap-6 overflow-x-auto sm:gap-8">
                {tabs.map((tab) => (
                  <button
                    className={cn(
                      "whitespace-nowrap border-b-2 pb-3 pt-4 text-sm font-semibold tracking-[0.01em] transition-colors duration-150",
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

            {/* Controls: filters + search
                Mobile: full-width row below tabs with top border separator
                lg+: right-aligned in the same row as tabs */}
            <div className="flex flex-wrap items-center gap-2 border-t border-border py-3 lg:border-t-0 lg:pb-3 lg:pt-4">
              {showFilters ? (
                <>
                  <select
                    aria-label="Filter by year"
                    className="border border-border bg-bg-surface pl-3 pr-7 py-1.5 text-xs text-text-secondary focus:outline-none focus:ring-1 focus:ring-accent-cyan"
                    onChange={(e) => setYear(e.target.value)}
                    value={year}
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>{y === "all" ? "All years" : y}</option>
                    ))}
                  </select>
                  <select
                    aria-label="Filter by type"
                    className="border border-border bg-bg-surface pl-3 pr-7 py-1.5 text-xs text-text-secondary focus:outline-none focus:ring-1 focus:ring-accent-cyan"
                    onChange={(e) => setTypeFilter(e.target.value)}
                    value={typeFilter}
                  >
                    <option value="all">All types</option>
                    <option value="benchmark">Benchmark</option>
                    <option value="paper">Paper</option>
                    <option value="abstract">Abstract</option>
                    <option value="talk">Talk</option>
                  </select>
                </>
              ) : null}
              <input
                className="min-w-0 flex-1 border border-border bg-bg-surface px-3 py-1.5 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-1 focus:ring-accent-cyan lg:w-[14rem] lg:flex-none"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                type="search"
                value={query}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search results */}
      {isSearching && (
        <section className="pb-14 pt-6 lg:pb-16 lg:pt-8">
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
        <section className="pb-14 pt-6 lg:pb-20 lg:pt-8">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-14 xl:px-16">
            <PublicationsStory publications={publications} typeFilter={typeFilter} year={year} />
          </div>
        </section>
      )}

      {/* Active Research tab */}
      {!isSearching && activeTab === "research" && (
        <section className="pb-14 pt-6 lg:pb-16 lg:pt-8">
          <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-14 xl:px-16">
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
