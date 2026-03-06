import { cn } from "@/lib/utils/cn";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps): React.ReactElement {
  return <div className={cn("animate-pulse rounded-3xl bg-white/5", className)} />;
}
