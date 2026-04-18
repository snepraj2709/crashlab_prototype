import { MemberCard } from "@/components/sections/MemberCard";
import type { TeamMemberProfile } from "@/types/team";

interface PeopleDirectoryProps {
  profiles: TeamMemberProfile[];
}

export function PeopleDirectory({ profiles }: PeopleDirectoryProps): React.ReactElement {
  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {profiles.map((profile) => (
        <MemberCard key={profile.id} member={profile} />
      ))}
    </div>
  );
}
