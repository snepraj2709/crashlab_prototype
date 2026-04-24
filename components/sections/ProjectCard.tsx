import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils/cn";
import type { ProjectSeed } from "@/types/research";

interface ProjectCardProps {
  project: ProjectSeed;
  showMetadata?: boolean;
  variant?: "default" | "editorial";
}

export function ProjectCard({
  project,
  showMetadata = false,
  variant = "default"
}: ProjectCardProps): React.ReactElement {
  const status =
    project.seekingCollaborators && project.status !== "published"
      ? "seeking-collaborators"
      : project.status;
  const statusMeta = {
    active: {
      badgeClassName: "border-status-success-border bg-status-success-surface text-status-success-text",
      dotClassName: "bg-status-success-text",
      label: "Active",
      pill: true
    },
    published: {
      badgeClassName: "",
      dotClassName: "bg-accent-green",
      label: "Published",
      pill: false
    },
    completed: {
      badgeClassName: "",
      dotClassName: "bg-text-tertiary",
      label: "Completed",
      pill: false
    },
    "seeking-collaborators": {
      badgeClassName: "border-status-warning-border bg-status-warning-surface text-status-warning-text",
      dotClassName: "bg-status-warning-text",
      label: "Seeking Collaborators",
      pill: true
    }
  }[status];
  const hasPaperLink = Boolean(project.paperUrl && project.paperUrl !== "https://arxiv.org/");
  const yearLabel = getYearLabel(project);
  const railMeta = getRailMeta(project, statusMeta.label, hasPaperLink);

  if (variant === "editorial") {
    return (
      <article className="border-b border-border last:border-b-0">
        <Link
          className="ui-focus-ring group block rounded-2xl py-6 pr-4 transition-[background-color,transform] duration-200 hover:bg-bg-elevated active:scale-[0.998] sm:pr-6 lg:py-8"
          href={`/research/${project.slug}`}
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(14rem,0.45fr)] lg:items-start lg:gap-10">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-text-tertiary">
                {statusMeta.pill ? (
                  <span
                    className={cn(
                      "ui-status-badge gap-1.5",
                      statusMeta.badgeClassName
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn("inline-block h-[5px] w-[5px] rounded-full", statusMeta.dotClassName)}
                    />
                    {statusMeta.label}
                  </span>
                ) : (
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
                    {statusMeta.label}
                  </span>
                )}
                {yearLabel ? (
                  <>
                    <span aria-hidden="true" className="text-[11px] font-bold text-text-tertiary">·</span>
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
                      {yearLabel}
                    </span>
                  </>
                ) : null}
              </div>

              <div className="mt-4 space-y-3">
                <h3 className="text-lg font-display font-semibold leading-snug text-navy-900 pr-8 transition-colors group-hover:text-brand-blue md:text-xl">
                  {project.problemStatement}
                </h3>

                {project.summary ? (
                  <p className="max-w-3xl text-[0.9375rem] leading-7 text-text-secondary">
                    {project.summary}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex items-center justify-between gap-5 border-t border-border pt-5 lg:block lg:border-t-0 lg:pt-0 lg:text-right">
              <div>
                <p className="text-base font-semibold leading-tight text-text-primary">
                  {railMeta.primary}
                </p>
                <p className="mt-1 text-[0.8125rem] text-text-tertiary">
                  {railMeta.secondary}
                </p>
              </div>

              {hasPaperLink || status !== "published" ? (
                <span className="inline-flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-12 items-center justify-center rounded-full border transition-all duration-200",
                      hasPaperLink
                        ? "border-text-primary bg-text-primary text-white group-hover:border-accent-cyan group-hover:bg-accent-cyan"
                        : "border-border-default bg-surface-panel text-text-primary group-hover:border-accent-cyan group-hover:bg-accent-cyan group-hover:text-white"
                    )}
                  >
                    <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </span>
              ) : (
                <span className="inline-flex rounded-token-pill border border-border-default bg-bg-elevated px-4 py-1.5 text-sm font-medium text-text-secondary">
                  Coming Soon
                </span>
              )}
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article className="border-b border-border py-5 last:border-b-0">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(14rem,0.8fr)] lg:items-start">
        <div>
          <div className="flex items-center gap-2 text-xs text-text-tertiary">
            {statusMeta.pill ? (
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusMeta.badgeClassName}`}
              >
                <span
                  aria-hidden="true"
                  className={`inline-block h-[5px] w-[5px] rounded-full ${statusMeta.dotClassName}`}
                />
                {statusMeta.label}
              </span>
            ) : (
              <>
                <span
                  aria-hidden="true"
                  className={`inline-block h-[5px] w-[5px] rounded-full ${statusMeta.dotClassName}`}
                />
                <span>{statusMeta.label}</span>
              </>
            )}
          </div>
          <Link
            className="mt-3 block text-lg font-medium text-text-primary transition hover:text-accent-cyan hover:underline"
            href={`/research/${project.slug}`}
          >
            {project.problemStatement}
          </Link>
          <p className="mt-1 line-clamp-2 text-sm leading-7 text-text-secondary">
            {project.summary}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.slice(0, showMetadata ? 4 : 3).map((tag) => (
              <span
                className="rounded-full border border-border-default px-3 py-1 text-xs text-text-secondary"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3 lg:text-right">
          {showMetadata && project.venue ? (
            <p className="text-xs uppercase tracking-[0.18em] text-text-tertiary">
              {project.venue}
            </p>
          ) : null}
          <Link
            className="inline-flex text-sm text-accent-cyan transition hover:opacity-75"
            href={`/research/${project.slug}`}
          >
            View research →
          </Link>
        </div>
      </div>
    </article>
  );
}

function getRailMeta(
  project: ProjectSeed,
  statusLabel: string,
  hasPaperLink: boolean
): { primary: string; secondary: string } {
  if (hasPaperLink) {
    const primary = project.paperUrl?.includes("arxiv.org") ? "arXiv" : "Publication";
    return {
      primary,
      secondary: project.venue ?? "CRASH Lab"
    };
  }

  if (project.venue) {
    return {
      primary: project.venue,
      secondary: "CRASH Lab"
    };
  }

  return {
    primary: statusLabel,
    secondary: "CRASH Lab"
  };
}

function getYearLabel(project: ProjectSeed): string | null {
  if (project.publishedAt) {
    const year = new Date(project.publishedAt).getUTCFullYear();
    return Number.isNaN(year) ? null : `${year}`;
  }

  const venueYear = project.venue?.match(/\b(19|20)\d{2}\b/);
  return venueYear?.[0] ?? null;
}
