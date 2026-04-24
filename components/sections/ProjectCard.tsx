import Link from "next/link";
import type { ProjectSeed } from "@/types/research";

interface ProjectCardProps {
  project: ProjectSeed;
  showMetadata?: boolean;
}

export function ProjectCard({
  project,
  showMetadata = false
}: ProjectCardProps): React.ReactElement {
  const status =
    project.seekingCollaborators && project.status !== "published"
      ? "seeking-collaborators"
      : project.status;
  const statusMeta = {
    active: {
      badgeClassName: "bg-status-success-surface text-status-success-text",
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
      badgeClassName: "bg-status-warning-surface text-status-warning-text",
      dotClassName: "bg-status-warning-text",
      label: "Seeking Collaborators",
      pill: true
    }
  }[status];

  return (
    <article className="border-b border-border py-8 last:border-b-0">
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
