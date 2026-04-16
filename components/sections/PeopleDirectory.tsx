"use client";

import Link from "next/link";
import { useState } from "react";

import { TeamMemberPortrait } from "@/components/sections/TeamMemberPortrait";
import { TeamSocialLinks } from "@/components/sections/TeamSocialLinks";
import { Card, PrincipalInvestigatorBadge } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import type { TeamMemberProfile } from "@/types/team";

interface PeopleDirectoryProps {
  profiles: TeamMemberProfile[];
}

export function PeopleDirectory({
  profiles
}: PeopleDirectoryProps): React.ReactElement | null {
  const defaultSelectedId =
    profiles.find((profile) => profile.isPrincipalInvestigator)?.id ?? profiles[0]?.id;
  const [selectedId, setSelectedId] = useState(defaultSelectedId);
  const selectedProfile = profiles.find((profile) => profile.id === selectedId) ?? profiles[0];

  if (!selectedProfile) {
    return null;
  }

  return (
    <div className="mt-12 grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_22rem] xl:items-start">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {profiles.map((profile) => {
          const isSelected = profile.id === selectedProfile.id;

          return (
            <button
              aria-pressed={isSelected}
              className="ui-focus-ring group rounded-token-md text-left"
              key={profile.id}
              onClick={() => setSelectedId(profile.id)}
              type="button"
            >
              <TeamMemberPortrait
                className={cn(
                  "aspect-[4/5] w-full transition duration-300 group-hover:-translate-y-1 group-hover:shadow-glow",
                  isSelected ? "border-border-focus shadow-glow ring-2 ring-border-focus/30" : ""
                )}
                member={profile}
              />
              <div className="mt-3">
                <p className="text-lg font-semibold text-text-default">{profile.name}</p>
                <p className="mt-1 text-sm text-text-muted">{profile.role}</p>
              </div>
            </button>
          );
        })}
      </div>

      <Card className="order-first h-fit p-5 sm:p-6 xl:sticky xl:top-28 xl:order-none">
        <TeamMemberPortrait
          className="aspect-[4/5] w-full"
          member={selectedProfile}
          priority
          sizes="(min-width: 1280px) 22rem, 90vw"
        />

        <div className="mt-6 flex flex-wrap gap-2">
          {selectedProfile.isPrincipalInvestigator ? (
            <PrincipalInvestigatorBadge />
          ) : null}
        </div>

        <h2 className="mt-5 font-display text-3xl text-text-default">{selectedProfile.name}</h2>
        <p className="mt-2 text-base text-text-muted">{selectedProfile.role}</p>
        {selectedProfile.affiliation ? (
          <p className="mt-1 text-sm text-text-tertiary">{selectedProfile.affiliation}</p>
        ) : null}

        <p className="mt-5 text-sm leading-7 text-text-muted">{selectedProfile.shortBio}</p>

        {selectedProfile.researchFocus.length ? (
          <div className="mt-5 flex flex-wrap gap-2">
            {selectedProfile.researchFocus.slice(0, 3).map((focus) => (
              <span className="ui-chip" key={focus}>
                {focus}
              </span>
            ))}
          </div>
        ) : null}

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <TeamSocialLinks name={selectedProfile.name} socialLinks={selectedProfile.socialLinks} />
          <Link
            className="ui-focus-ring inline-flex items-center rounded-token-pill border border-surface-strong bg-surface-strong px-4 py-2 text-sm font-semibold text-text-on-strong transition hover:border-border-focus hover:bg-surface-shell"
            href={`/people/${selectedProfile.slug}`}
          >
            View profile
          </Link>
        </div>
      </Card>
    </div>
  );
}
