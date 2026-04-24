import Link from "next/link";

import { PersonPhoto } from "@/components/sections/PersonPhoto";
import { TeamSocialLinks } from "@/components/sections/TeamSocialLinks";
import { cn } from "@/lib/utils/cn";
import type { TeamMemberProfile } from "@/types/team";

interface MemberCardProps {
  member: TeamMemberProfile & {
    alumniYear?: number;
    currentInstitution?: string;
  };
}

function isHonorificOnly(value?: string): boolean {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return ["mr", "mr.", "ms", "ms.", "mrs", "mrs.", "dr", "dr."].includes(normalized);
}

export function MemberCard({ member }: MemberCardProps): React.ReactElement {
  const roleText = !isHonorificOnly(member.title) && member.title ? member.title : member.role;
  const roleLabel = member.isPrincipalInvestigator ? "Principal Investigator" : roleText;

  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-2xl border border-border-default bg-surface-panel text-center",
        !member.isActive && "opacity-75"
      )}
    >
      {/* Photo — zoom on hover, clipped by overflow-hidden inside PersonPhoto */}
      <Link
        className="ui-focus-ring block rounded-t-2xl"
        href={`/people/${member.slug}`}
      >
        <PersonPhoto
          className="aspect-square w-full rounded-t-2xl"
          imageClassName="transition-transform duration-300 ease-out group-hover:scale-105"
          name={member.name}
          photo={member.photo}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col items-center px-6 pb-6 pt-5">
        {/* Name */}
        <p className="font-display text-xl font-semibold tracking-tight text-text-primary">
          <Link
            className="ui-focus-ring rounded-token-xs transition hover:text-border-focus"
            href={`/people/${member.slug}`}
          >
            {member.name}
          </Link>
        </p>

        {/* Role */}
        <p
          className={cn(
            "mt-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-secondary",
          )}
        >
          {roleLabel}
        </p>

        {/* Divider */}
        <div className="mt-4 w-full border-t border-border-subtle" />

        {/* Expertise chips */}
        {member.researchFocus.length > 0 && (
          <div className="mt-4 w-full">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-text-secondary">
              Expertise
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-1.5">
              {member.researchFocus.slice(0, 3).map((tag) => (
                <span
                  className="rounded-token-pill border border-border px-3 py-0.5 text-xs text-text-secondary"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Credential / institution chips */}
        {member.credentials.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-1.5">
            {member.credentials.slice(0, 3).map((cred) => (
              <span
                className="rounded-token-pill border border-border-subtle bg-bg-elevated px-3 py-0.5 text-xs text-text-muted"
                key={cred}
              >
                {cred}
              </span>
            ))}
          </div>
        )}

        {/* Social links */}
        <div className="mt-auto w-full pt-5">
          <TeamSocialLinks
            className="justify-center"
            name={member.name}
            socialLinks={member.socialLinks}
            variant="compact"
          />
        </div>
      </div>
    </article>
  );
}
