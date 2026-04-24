import { cn } from "@/lib/utils/cn";

interface PrincipalInvestigatorBadgeProps {
  className?: string;
}

export function PrincipalInvestigatorBadge({
  className
}: PrincipalInvestigatorBadgeProps): React.ReactElement {
  return (
    <span
      className={cn(
        "rounded-full border border-accent-cyan/20 bg-accent-cyan-muted px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-text-primary",
        className
      )}
    >
      Principal Investigator
    </span>
  );
}
