import Link from "next/link";

import { cn } from "@/lib/utils/cn";
import type { TeamDirectoryBadgeTone, TeamDirectoryGroup, TeamDirectoryMember } from "@/types/team";

interface LabMembersListProps {
  groups: TeamDirectoryGroup[];
  linkedSlugs?: string[];
  members: TeamDirectoryMember[];
  title?: string;
  intro?: string;
  variant?: "page" | "project";
}

const badgeToneStyles: Record<TeamDirectoryBadgeTone, string> = {
  amber: "border-orange-200 bg-orange-50 text-orange-700",
  blue: "border-sky-200 bg-sky-50 text-sky-700",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  rose: "border-rose-200 bg-rose-50 text-rose-700",
  slate: "border-slate-200 bg-slate-50 text-slate-700"
};

export function LabMembersList({
  groups,
  linkedSlugs = [],
  members,
  title,
  intro,
  variant = "page"
}: LabMembersListProps): React.ReactElement | null {
  const linkedSlugSet = new Set(linkedSlugs);
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
                const canLink = member.profileSlug && linkedSlugSet.has(member.profileSlug);

                return (
                  <div
                    className="flex flex-col gap-3 border-b border-border/50 py-5 md:flex-row md:items-center md:justify-between"
                    key={member.id}
                  >
                    <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
                      {canLink ? (
                        <Link
                          className="text-2xl font-medium text-text-primary transition hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                          href={`/people/${member.profileSlug}`}
                        >
                          {member.name}
                        </Link>
                      ) : (
                        <span className="text-2xl font-medium text-text-primary">{member.name}</span>
                      )}
                      <p className="text-xl italic text-text-tertiary">
                        {member.tenure} · {member.affiliation}
                      </p>
                    </div>

                    {member.highlights?.length ? (
                      <div className="flex flex-wrap gap-2">
                        {member.highlights.map((highlight) => (
                          <span
                            className={cn(
                              "inline-flex items-center rounded-md border px-3 py-1 text-sm font-semibold uppercase tracking-[0.08em]",
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
