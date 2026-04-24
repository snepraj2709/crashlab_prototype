import { cn } from "@/lib/utils/cn";
import type { ProjectStatus } from "@/types/research";

interface BadgeProps {
  status: ProjectStatus;
  className?: string;
}

const styles: Record<ProjectStatus, string> = {
  published: "border-status-success-border bg-status-success-surface text-status-success-text",
  active: "border-status-success-border bg-status-success-surface text-status-success-text",
  "seeking-collaborators":
    "border-status-warning-border bg-status-warning-surface text-status-warning-text",
  completed: "border-status-neutral-border bg-status-neutral-surface text-status-neutral-text"
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
        "ui-status-badge",
        styles[status],
        className
      )}
    >
      {labels[status]}
    </span>
  );
}
