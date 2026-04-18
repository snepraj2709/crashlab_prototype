import Link from "next/link";

import { TeamMemberPortrait } from "@/components/sections/TeamMemberPortrait";
import type { TeamMemberProfile } from "@/types/team";

interface PeopleDirectoryProps {
  profiles: TeamMemberProfile[];
}

export function PeopleDirectory({ profiles }: PeopleDirectoryProps): React.ReactElement {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {profiles.map((profile) => (
        <Link
          className="ui-focus-ring group rounded-token-md text-left"
          href={`/people/${profile.slug}`}
          key={profile.id}
        >
          <TeamMemberPortrait
            className="aspect-[4/5] w-full transition duration-300 group-hover:-translate-y-1 group-hover:shadow-glow"
            member={profile}
          />
          <div className="mt-3">
            <p className="text-lg font-semibold text-text-default">{profile.name}</p>
            <p className="mt-1 text-sm text-text-muted">{profile.role}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
