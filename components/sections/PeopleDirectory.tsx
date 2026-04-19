"use client";

import { useState } from "react";

import { MemberCard } from "@/components/sections/MemberCard";
import type { TeamMemberProfile } from "@/types/team";

interface PeopleDirectoryProps {
  profiles: TeamMemberProfile[];
}

export function PeopleDirectory({ profiles }: PeopleDirectoryProps): React.ReactElement {
  const [showAlumni, setShowAlumni] = useState(false);

  const active = profiles.filter((p) => p.isActive);
  const alumni = profiles.filter((p) => !p.isActive);

  return (
    <div className="mt-12">
      <div className="divide-y divide-border">
        {active.map((profile) => (
          <MemberCard key={profile.id} member={profile} />
        ))}
      </div>

      {alumni.length > 0 ? (
        <div className="mt-8">
          {!showAlumni ? (
            <button
              className="text-sm text-text-tertiary transition hover:text-text-secondary"
              onClick={() => setShowAlumni(true)}
              type="button"
            >
              Show {alumni.length} past member{alumni.length !== 1 ? "s" : ""} →
            </button>
          ) : (
            <div>
              <div className="flex items-center justify-between">
                <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary">
                  Past Members
                </p>
                <button
                  className="text-xs text-text-tertiary transition hover:text-text-secondary"
                  onClick={() => setShowAlumni(false)}
                  type="button"
                >
                  Hide ↑
                </button>
              </div>
              <div className="mt-4 divide-y divide-border">
                {alumni.map((profile) => (
                  <MemberCard key={profile.id} member={profile} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
