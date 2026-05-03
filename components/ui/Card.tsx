import { cn } from "@/lib/utils/cn";

type CardVariant = "default" | "spotlight";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: CardVariant;
}

export function Card({
  children,
  className,
  variant = "default",
  ...props
}: CardProps): React.ReactElement {
  return (
    <div
      {...props}
      className={cn(
        variant === "spotlight"
          ? "relative overflow-hidden rounded-token-md border border-slate-800 bg-navy-900 px-10 py-12 shadow-soft lg:px-16 lg:py-14"
          : "p-6",
        className,
      )}
    >
      {variant === "spotlight" ? (
        <>
          <div
            aria-hidden="true"
            className="bg-accent-cyan/10 pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-none blur-3xl"
          />
          <div className="relative">{children}</div>
        </>
      ) : (
        children
      )}
    </div>
  );
}
