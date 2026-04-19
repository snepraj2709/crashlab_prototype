import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils/cn";
import type { TeamMemberProfile } from "@/types/team";

interface MemberCardProps {
  member: TeamMemberProfile & {
    alumniYear?: number;
    currentInstitution?: string;
  };
}

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}

export function MemberCard({ member }: MemberCardProps): React.ReactElement {
  const roleText =
    !member.isActive && member.currentInstitution
      ? `${member.role} · Now at ${member.currentInstitution}`
      : member.role;

  return (
    <article
      className={cn(
        "py-6",
        !member.isActive && "opacity-70"
      )}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <div className="shrink-0">
            {member.photo?.url ? (
              <div className="relative size-14 overflow-hidden rounded-full border border-border-default">
                <Image
                  alt={member.photo.alt || `${member.name} portrait`}
                  className="object-cover"
                  fill
                  sizes="56px"
                  src={member.photo.url}
                />
              </div>
            ) : (
              <div className="flex size-14 items-center justify-center rounded-full border border-border-default bg-bg-elevated text-sm font-medium text-text-muted">
                {getInitials(member.name)}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            {member.isPrincipalInvestigator && (
              <p className="mb-1 text-[10px] uppercase tracking-wide text-text-tertiary">
                Principal Investigator
              </p>
            )}

            <p className="text-xl font-medium text-text-primary">{member.name}</p>
            <p className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-text-secondary">
              <span>{roleText}</span>
              {!member.isActive ? (
                <>
                  <span className="text-text-tertiary">·</span>
                  <span className="text-text-tertiary">●</span>
                  <span className="text-[11px] text-text-tertiary">
                    {member.alumniYear ? `alumni · ${member.alumniYear}` : "alumni"}
                  </span>
                </>
              ) : null}
            </p>

            {member.credentials.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                {member.credentials.slice(0, 2).map((cred) => (
                  <span
                    className="text-xs text-text-tertiary before:mr-1.5 before:content-['·']"
                    key={cred}
                  >
                    {cred}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <Link
          className="shrink-0 text-sm text-accent-cyan transition hover:opacity-75"
          href={`/people/${member.slug}`}
        >
          View profile →
        </Link>
      </div>

      {member.researchFocus.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {member.researchFocus.slice(0, 3).map((tag) => (
            <span
              className="rounded-full border border-border-default px-3 py-1 text-xs text-text-secondary"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
