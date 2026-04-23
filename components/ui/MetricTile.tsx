import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils/cn";

interface MetricTileProps {
  value: string;
  label: string;
  className?: string;
  icon?: LucideIcon;
}

export function MetricTile({
  value,
  label,
  className,
  icon: Icon,
}: MetricTileProps): React.ReactElement {
  return (
    <div className={cn("space-y-3", className)}>
      <p className="font-mono text-3xl text-text-primary md:text-4xl">
        {value}
      </p>
      {Icon ? (
        <div className="flex items-start gap-3">
          <Icon
            aria-hidden="true"
            className="mt-1 size-7 shrink-0 text-accent-cyan"
          />
          <p className="text-sm leading-6 text-text-secondary">{label}</p>
        </div>
      ) : (
        <p className="text-sm leading-6 text-text-secondary">{label}</p>
      )}
    </div>
  );
}
