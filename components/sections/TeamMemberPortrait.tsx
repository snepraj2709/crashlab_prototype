import { PersonPhoto } from "@/components/sections/PersonPhoto";
import { cn } from "@/lib/utils/cn";
import type { TeamMemberProfile } from "@/types/team";

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
  sizes = "(min-width: 1280px) 22vw, (min-width: 640px) 40vw, 90vw",
}: TeamMemberPortraitProps): React.ReactElement {
  return (
    <PersonPhoto
      className={cn(
        "relative overflow-hidden rounded-token-md border border-border-default bg-bg-elevated",
        className,
      )}
      fallbackClassName="text-5xl tracking-[0.08em]"
      name={member.name}
      photo={member.photo}
      priority={priority}
      sizes={sizes}
    />
  );
}
