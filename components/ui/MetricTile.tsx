import { cn } from "@/lib/utils/cn";

interface MetricTileProps {
  value: string;
  label: string;
  className?: string;
}

export function MetricTile({ value, label, className }: MetricTileProps): React.ReactElement {
  return (
    <div
      className={cn(
        "rounded-token-sm border border-border-default bg-surface-panel p-6 shadow-soft",
        className,
      )}
    >
      <p className="font-mono text-3xl text-text-default md:text-4xl">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-text-muted">{label}</p>
    </div>
  );
}
