import { cn } from "@/lib/utils/cn";

interface ProofChipProps {
  label: string;
  variant?: "filled" | "outline";
  size?: "sm" | "md";
}

export function ProofChip({
  label,
  variant = "outline",
  size = "md"
}: ProofChipProps): React.ReactElement {
  return (
    <span
      aria-label={label}
      className={cn(
        "inline-flex items-center rounded-full border font-medium backdrop-blur-sm",
        size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm",
        variant === "filled"
          ? "border-accent-cyan bg-accent-cyan text-[var(--color-text-inverse)]"
          : "border-border bg-bg-elevated text-text-primary",
      )}
    >
      {label}
    </span>
  );
}
