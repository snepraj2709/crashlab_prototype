import { cn } from "@/lib/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps): React.ReactElement {
  return (
    <div
      {...props}
      className={cn(
        "rounded-[28px] border border-border bg-bg-surface p-6 shadow-[var(--shadow-card)]",
        className
      )}
    >
      {children}
    </div>
  );
}
