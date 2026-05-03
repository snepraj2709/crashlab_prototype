import { Globe, GraduationCap } from "lucide-react";
import Link from "next/link";

import { PersonPhoto } from "@/components/sections/PersonPhoto";
import { XIcon } from "@/components/ui/XIcon";
import { cn } from "@/lib/utils/cn";
import type { SocialLinks, TeamMemberProfile } from "@/types/team";

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>): React.ReactElement {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const socialDefs: {
  key: keyof SocialLinks;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}[] = [
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInIcon },
  { key: "twitter", label: "X", Icon: XIcon },
  { key: "googleScholar", label: "Google Scholar", Icon: GraduationCap },
  { key: "personalWebsite", label: "Personal Website", Icon: Globe },
];

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

  const socialLinks = socialDefs.flatMap(({ key, label, Icon }) => {
    const href = member.socialLinks?.[key];
    return href ? [{ href, label, Icon, key }] : [];
  });

  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-none border border-border-default bg-surface-panel",
        !member.isActive && "opacity-75"
      )}
    >
      {/* Full-card link — sits behind everything, handles clicks on photo and name/role */}
      <Link
        aria-label={`View ${member.name}'s profile`}
        className="absolute inset-0 z-0 cursor-pointer"
        href={`/people/${member.slug}`}
        tabIndex={-1}
      />

      {/* Photo + social overlay */}
      <div className="pointer-events-none relative z-10 aspect-square overflow-hidden">
        <PersonPhoto
          className="h-full w-full"
          imageClassName="transition-transform duration-300 ease-out group-hover:scale-105"
          name={member.name}
          photo={member.photo}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
        />

        {socialLinks.length > 0 && (
          <div className="absolute inset-0 flex items-end justify-center gap-3 bg-gradient-to-t from-black/60 via-black/10 to-transparent pb-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {socialLinks.map(({ href, label, Icon, key }) => (
              <a
                key={key}
                aria-label={`${member.name} on ${label}`}
                className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-white/20 text-white backdrop-blur-sm transition hover:bg-white hover:text-gray-900"
                href={href}
                rel="noreferrer"
                target="_blank"
                title={label}
              >
                <Icon className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Name + role + bio reveal */}
      <div className="pointer-events-none relative z-10 px-4 pb-4 pt-3 text-center">
        <p
          className="font-display text-base font-semibold tracking-tight text-text-primary"
          title={member.name}
        >
          {member.name}
        </p>
        <p
          className="mt-0.5 line-clamp-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-text-secondary"
          title={roleLabel}
        >
          {roleLabel}
        </p>

        {/* Short bio — revealed on hover */}
        {member.shortBio && (
          <p className="mt-0 max-h-0 overflow-hidden text-xs leading-relaxed text-text-muted transition-all duration-300 ease-out group-hover:mt-2 group-hover:max-h-24">
            {member.shortBio}
          </p>
        )}
      </div>

      {/* Focusable card link for keyboard navigation */}
      <Link
        className="ui-focus-ring absolute inset-0 z-10 opacity-0"
        href={`/people/${member.slug}`}
        tabIndex={0}
      >
        {member.name}
      </Link>
    </article>
  );
}
