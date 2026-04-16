import { cn } from "@/lib/utils/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ children, className, ...props }: CardProps): React.ReactElement {
  return (
    <div
      {...props}
      className={cn(
        "ui-panel p-6",
        className
      )}
    >
      {children}
    </div>
  );
}
