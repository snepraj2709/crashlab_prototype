import Link from "next/link";

import { cn } from "@/lib/utils/cn";
import type { TeamDirectoryBadgeTone, TeamDirectoryGroup, TeamDirectoryMember } from "@/types/team";

interface LabMembersListProps {
  groups: TeamDirectoryGroup[];
  members: TeamDirectoryMember[];
  title?: string;
  intro?: string;
  variant?: "page" | "project";
}

const badgeToneStyles: Record<TeamDirectoryBadgeTone, string> = {
  amber: "border-status-warning-border bg-status-warning-surface text-status-warning-text",
  blue: "border-status-info-border bg-status-info-surface text-status-info-text",
  emerald: "border-status-success-border bg-status-success-surface text-status-success-text",
  rose: "border-status-error-border bg-status-error-surface text-status-error-text",
  slate: "border-status-neutral-border bg-status-neutral-surface text-status-neutral-text"
};

export function LabMembersList({
  groups,
  members,
  title,
  intro,
  variant = "page"
}: LabMembersListProps): React.ReactElement | null {
  const visibleGroups = groups
    .map((group) => ({
      ...group,
      members: members.filter((member) => member.groupId === group.id)
    }))
    .filter((group) => group.members.length);

  if (!visibleGroups.length) {
    return null;
  }

  return (
    <section>
      {title ? (
        <div>
          <h2
            className={cn(
              "font-display text-text-primary",
              variant === "page" ? "text-4xl lg:text-5xl" : "text-3xl lg:text-4xl"
            )}
          >
            {title}
          </h2>
          {intro ? (
            <p className="mt-4 max-w-3xl text-lg leading-8 text-text-secondary">{intro}</p>
          ) : null}
        </div>
      ) : null}

      <div className={cn("border-t border-border/80", title ? "mt-10" : "mt-0")}>
        {visibleGroups.map((group) => (
          <div className="pt-8 first:pt-0" key={group.id}>
            <div className="border-b border-border/80 pb-4">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">
                {group.label}
              </p>
            </div>

            <div>
              {group.members.map((member) => {
                return (
                  <div
                    className="flex flex-col gap-3 border-b border-border/50 py-5 md:flex-row md:items-center md:justify-between"
                    key={member.id}
                  >
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                      <Link
                        className="ui-focus-ring text-2xl font-medium text-text-default transition hover:text-border-focus"
                        href={`/people/${member.id}`}
                      >
                        {member.name}
                      </Link>
                      <p className="text-xl italic text-text-muted">
                        {member.tenure} · {member.affiliation}
                      </p>
                    </div>

                    {member.highlights?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {member.highlights.map((highlight) => (
                          <span
                            className={cn(
                              "ui-status-badge rounded-token-sm text-sm tracking-[0.08em]",
                              badgeToneStyles[highlight.tone ?? "slate"]
                            )}
                            key={highlight.label}
                          >
                            {highlight.label}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
