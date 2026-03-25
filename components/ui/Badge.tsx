import { cn } from "@/lib/utils/cn";
import type { ProjectStatus } from "@/types/research";

interface BadgeProps {
  status: ProjectStatus;
  className?: string;
}

const styles: Record<ProjectStatus, string> = {
  published: "border border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
  active: "border border-cyan-400/30 bg-cyan-400/10 text-cyan-300",
  "seeking-collaborators":
    "border bg-[var(--color-accent-yellow-muted)] text-accent-yellow [border-color:var(--color-accent-yellow-border)]",
  completed: "border border-slate-500/30 bg-slate-500/10 text-slate-300"
};

const labels: Record<ProjectStatus, string> = {
  published: "Published",
  active: "Active",
  "seeking-collaborators": "Seeking Collaborators",
  completed: "Completed"
};

export function Badge({ status, className }: BadgeProps): React.ReactElement {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]",
        styles[status],
        className
      )}
    >
      {labels[status]}
    </span>
  );
}
