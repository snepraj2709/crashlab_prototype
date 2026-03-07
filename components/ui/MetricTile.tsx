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
        "rounded-[24px] border border-border bg-bg-surface p-6",
        className,
      )}
    >
      <p className="font-mono text-3xl text-text-primary md:text-4xl">
        {value}
      </p>
      <p className="mt-3 text-sm leading-6 text-text-secondary">{label}</p>
    </div>
  );
}
