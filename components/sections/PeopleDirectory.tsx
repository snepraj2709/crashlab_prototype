"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";
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
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {active.map((profile) => (
          <MemberCard key={profile.id} member={profile} />
        ))}
      </div>

      {alumni.length > 0 ? (
        <div className="mt-12">
          <div className="flex justify-center">
            <Button
              aria-controls="people-directory-alumni"
              aria-expanded={showAlumni}
              onClick={() => setShowAlumni((current) => !current)}
              type="button"
              variant="secondary"
            >
              {showAlumni ? "Hide alumni" : "View Alumni"}
            </Button>
          </div>

          {showAlumni ? (
            <div
              className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
              id="people-directory-alumni"
            >
              {alumni.map((profile) => (
                <MemberCard key={profile.id} member={profile} />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
