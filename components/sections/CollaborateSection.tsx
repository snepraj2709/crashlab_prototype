import type { LucideIcon } from "lucide-react";
import { Building2, Microscope, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

const rows = [
  {
    who: "For Industry",
    title: "Clinical validation for models that need to survive contact with practice.",
    body: "Validate your model on RadLE, commission India-specific evaluation studies, or work with the lab on deployment-grade evidence.",
    cta: "Commission a study",
    href: "/collaborate",
    icon: Building2,
  },
  {
    who: "For Researchers",
    title: "Benchmarks, cohorts, and clinical collaborators for serious research.",
    body: "Join RadLE-X, propose a new cohort, or work with a lab that treats benchmark design as publishable infrastructure.",
    cta: "Propose a study",
    href: "/join",
    icon: Microscope,
    featured: true,
  },
  {
    who: "For Investors",
    title: "Back the infrastructure the field will need before deployment scales.",
    body: "Support benchmark systems, data commons, and evaluation standards that make healthcare AI more accountable.",
    cta: "Talk to the lab",
    href: "/contact",
    icon: TrendingUp,
  },
] satisfies Array<{
  who: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  icon: LucideIcon;
  featured?: boolean;
}>;

export function CollaborateSection(): React.ReactElement {
  return (
    <section className="py-12 lg:pt-18 lg:pb-24" id="collaborate">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <h2 className="max-w-4xl font-display text-4xl text-text-primary lg:text-5xl">
              Hold healthcare AI to the hard test.
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-base leading-8 text-text-secondary lg:justify-self-end">
              CRASH Lab works with researchers, healthcare companies, and aligned funders that
              need clinically credible evaluation rather than presentation-ready claims.
            </p>
          </div>
        </div>

        <div className="my-16 grid gap-10 lg:grid-cols-3 lg:gap-12">
          {rows.map((row) => (
            <div
              className={cn(
                "flex h-full flex-col",
                row.featured ? "rounded-2xl bg-navy-900 p-6 text-white" : "pt-6",
              )}
              key={row.who}
            >
              <div className="flex items-center gap-3">
                <div
                  aria-hidden="true"
                  className={cn(
                    "inline-flex size-10 items-center justify-center rounded-full",
                    row.featured
                      ? "bg-white/10 text-white/70"
                      : "bg-accent-cyan-muted text-accent-cyan",
                  )}
                >
                  <row.icon className="size-[18px]" />
                </div>
                <p
                  className={cn(
                    "text-xs uppercase tracking-[0.2em]",
                    row.featured ? "text-white/60" : "text-accent-cyan",
                  )}
                >
                  {row.who}
                </p>
              </div>
              <h3
                className={cn(
                  "mt-5 text-2xl font-medium leading-tight",
                  row.featured ? "text-white" : "text-text-primary",
                )}
              >
                {row.title}
              </h3>
              <p
                className={cn(
                  "mt-4 text-sm leading-8",
                  row.featured ? "text-white/70" : "text-text-secondary",
                )}
              >
                {row.body}
              </p>
              <Button
                className={cn(
                  "mt-6",
                  row.featured &&
                    "border-white bg-white text-navy-900 hover:border-white hover:bg-white hover:text-navy-900 hover:shadow-[0_0_0_3px_#0c1527,0_0_0_6px_rgba(255,255,255,0.9)] active:bg-white/80 active:shadow-[0_0_0_2px_#0c1527,0_0_0_4px_rgba(255,255,255,0.72)]",
                )}
                href={row.href}
                variant={row.featured ? "outline" : "secondary"}
              >
                {row.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
