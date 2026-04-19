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
        "space-y-2",
        className,
      )}
    >
      <p className="font-mono text-3xl text-text-primary md:text-4xl">
        {value}
      </p>
      <p className="text-sm leading-6 text-text-secondary">{label}</p>
    </div>
  );
}
