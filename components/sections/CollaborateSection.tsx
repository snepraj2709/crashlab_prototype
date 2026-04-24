import type { LucideIcon } from "lucide-react";
import { Building2, Microscope, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui";

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
  },
  {
    who: "For Funders",
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
}>;

export function CollaborateSection(): React.ReactElement {
  return (
    <section className="py-12 lg:py-18" id="collaborate">
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

        <div className="mt-16 grid gap-10 lg:grid-cols-3 lg:gap-12">
          {rows.map((row) => (
            <div className="pt-6" key={row.who}>
              <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">{row.who}</p>
              <div
                aria-hidden="true"
                className="mt-5 inline-flex size-12 items-center justify-center rounded-full bg-accent-cyan-muted text-accent-cyan"
              >
                <row.icon className="size-5" />
              </div>
              <h3 className="mt-4 text-2xl font-medium leading-tight text-text-primary">
                {row.title}
              </h3>
              <p className="mt-4 text-sm leading-8 text-text-secondary">{row.body}</p>
              <Button className="mt-6" href={row.href} variant="secondary">
                {row.cta}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
