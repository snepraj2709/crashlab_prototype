import { cn } from "@/lib/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps): React.ReactElement {
  return (
    <div
      {...props}
      className={cn(
        "rounded-[28px] border border-border bg-bg-surface p-6 shadow-[0_30px_80px_rgba(0,0,0,0.18)]",
        className
      )}
    >
      {children}
    </div>
  );
}
