import { Button, Card } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

interface CallToActionCardProps {
  heading: string;
  body: string;
  buttonLabel: string;
  buttonHref: string;
  className?: string;
  headingClassName?: string;
  bodyClassName?: string;
}

export function CallToActionCard({
  heading,
  body,
  buttonLabel,
  buttonHref,
  className,
  headingClassName,
  bodyClassName,
}: CallToActionCardProps): React.ReactElement {
  return (
    <Card className={className} variant="spotlight">
      <div className="max-w-5xl">
        <h2
          className={cn(
            "max-w-4xl font-display text-3xl font-semibold leading-[1.04] tracking-tight text-white sm:text-4xl lg:text-5xl",
            headingClassName,
          )}
        >
          {heading}
        </h2>
        <p
          className={cn(
            "mt-6 max-w-4xl font-sans text-lg font-normal leading-8 text-slate-300 sm:text-xl sm:leading-[1.5] lg:text-2xl",
            bodyClassName,
          )}
        >
          {body}
        </p>
      </div>
      <Button
        className="mt-10 font-sans text-lg font-semibold"
        href={buttonHref}
        size="lg"
        variant="secondary"
      >
        {buttonLabel}
      </Button>
    </Card>
  );
}
