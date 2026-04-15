import Image from "next/image";

import { cn } from "@/lib/utils/cn";
import type { TeamMemberProfile } from "@/types/team";

const fallbackHeadshot = "/team/person-placeholder.svg";

interface TeamMemberPortraitProps {
  member: Pick<TeamMemberProfile, "name" | "photo">;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export function TeamMemberPortrait({
  member,
  className,
  priority = false,
  sizes = "(min-width: 1280px) 22vw, (min-width: 640px) 40vw, 90vw"
}: TeamMemberPortraitProps): React.ReactElement {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[28px] border border-border bg-bg-elevated",
        className
      )}
    >
      <Image
        alt={member.photo?.alt || `${member.name} portrait`}
        className="object-cover"
        fill
        priority={priority}
        sizes={sizes}
        src={member.photo?.url || fallbackHeadshot}
      />
    </div>
  );
}
