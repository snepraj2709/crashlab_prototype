import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Building2, Microscope, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils/cn";
import { ContactPageForm } from "@/components/sections/ContactPageForm";

type AudienceCard = {
  segment: string;
  headline: string;
  body: string;
  icon: LucideIcon;
  ctaHref: string;
  ctaLabel: string;
  paperHref?: string;
  paperLabel?: string;
  featured?: boolean;
};

const audienceCards: AudienceCard[] = [
  {
    segment: "Evaluation",
    headline: "Many AI benchmarks reuse cases models already saw during training, which inflates performance.",
    body: "We build hard, contamination-resistant evaluations from fresh clinical cases and test AI models against expert clinicians so scores reflect genuine clinical competence.",
    icon: Building2,
    ctaHref: "/collaborate",
    ctaLabel: "Commission an evaluation",
    paperHref: "https://arxiv.org/abs/2509.25559",
    paperLabel: "Radiology's Last Exam (RadLE paper)",
  },
  {
    segment: "Infrastructure",
    headline: "The future of medical AI evaluation lives inside evaluation harnesses.",
    body: "We work with academic and commercial partners to embed evaluations directly into clinical AI pipelines, enabling continuous and reproducible testing as models evolve.",
    icon: Microscope,
    ctaHref: "/collaborate",
    ctaLabel: "Partner on infrastructure",
    featured: true,
  },
  {
    segment: "Community",
    headline: "The clinicians of the next decade will work alongside AI every day.",
    body: "CRASH Lab is cultivating evaluation expertise by collaborating with leading clinicians to identify hard and novel cases, analyse frontier model failures, and build practical AI evaluation judgment.",
    icon: TrendingUp,
    ctaHref: "/collaborate",
    ctaLabel: "Join our expert community",
  },
];

export function CollaborateSection(): React.ReactElement {
  return (
    <section className="border-t border-border py-12 lg:pt-18 lg:pb-24" id="collaborate">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between lg:gap-16 xl:gap-24">
          <h2 className="max-w-xl font-display text-4xl text-text-primary lg:flex-1 lg:text-5xl">
            AI benchmarks have drifted from real-world clinical practice.
          </h2>
          <div className="max-w-xl space-y-5 text-base leading-8 text-text-secondary lg:flex-1 lg:pt-1 lg:text-left">
            <p>
              Real-world clinical cases demand more than current generic benchmarks can offer. At CRASH Lab,
              our focus is building evaluations and benchmarks that probe how frontier AI models actually
              perform in real-world hard cases.
            </p>
            <p>
              We evaluate where these models fail, characterise their failure modes, and use those insights
              to make AI safer and more reliable before it reaches the clinic.
            </p>
            <p>
              While we lead in building evaluations, our work extends from benchmarking methods to responsible
              deployment of AI in real clinical workflows.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {audienceCards.map((card) => {
            const Icon = card.icon;
            const isFeatured = card.featured === true;

            return (
              <div
                className={cn(
                  "flex min-w-0 flex-col border border-border-default p-8 lg:p-9",
                  isFeatured && "relative border-transparent bg-navy-900 shadow-panel",
                )}
                key={card.segment}
              >
                <div className={cn("flex items-start justify-between gap-4", !isFeatured && "min-h-9")}>
                  <div className="flex min-w-0 items-center gap-3">
                    {isFeatured ? (
                      <span
                        aria-hidden="true"
                        className="inline-flex size-9 shrink-0 items-center justify-center border border-white/25 bg-white/5 text-white"
                      >
                        <Icon className="size-[18px]" strokeWidth={2} />
                      </span>
                    ) : (
                      <Icon className="size-[18px] shrink-0 text-accent-cyan" strokeWidth={2} aria-hidden="true" />
                    )}
                    <span
                      className={cn(
                        "text-[11px] font-semibold uppercase tracking-[0.2em]",
                        isFeatured ? "text-sky-200/90" : "text-accent-cyan",
                      )}
                    >
                      {card.segment}
                    </span>
                  </div>
                </div>

                <h3
                  className={cn(
                    "mt-6 text-xl font-semibold leading-snug tracking-tight sm:text-[1.35rem]",
                    isFeatured ? "text-white" : "text-text-primary",
                  )}
                >
                  {card.headline}
                </h3>
                <p
                  className={cn(
                    "mt-4 flex-1 text-sm leading-8",
                    isFeatured ? "text-slate-300" : "text-text-secondary",
                  )}
                >
                  {card.body}
                </p>
                {card.paperHref && card.paperLabel ? (
                  <a
                    href={card.paperHref}
                    rel="noopener noreferrer"
                    target="_blank"
                    className={cn(
                      "mt-3 inline-flex w-fit items-center border-b text-sm leading-6 transition",
                      isFeatured
                        ? "border-sky-200/70 text-sky-100 hover:border-sky-100 hover:text-white"
                        : "border-accent-cyan/50 text-accent-cyan hover:border-accent-cyan hover:text-accent-cyan",
                    )}
                  >
                    {card.paperLabel}
                  </a>
                ) : null}

                <div className="mt-8">
                  {isFeatured ? (
                    <Link
                      href={card.ctaHref}
                      className={cn(
                        "ui-focus-ring inline-flex h-12 w-full items-center justify-center border border-white bg-white px-6 text-sm font-medium text-navy-900 transition duration-200",
                        "hover:bg-slate-100 focus-visible:outline-none",
                      )}
                    >
                      {card.ctaLabel}
                    </Link>
                  ) : (
                    <Link
                      href={card.ctaHref}
                      className={cn(
                        "ui-focus-ring inline-flex h-12 w-full items-center justify-center border border-[#b7bec6] bg-surface-panel px-6 text-sm font-medium text-text-primary transition duration-200",
                        "hover:border-border-focus hover:text-border-focus focus-visible:outline-none",
                      )}
                    >
                      {card.ctaLabel}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-border pt-16 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl text-text-primary lg:text-4xl">Join Our Mission</h2>
              <div className="mt-6 space-y-6 text-base leading-8 text-text-secondary">
                <p>
                  We are building a new ecosystem for responsible healthcare AI. Whether you are developing
                  an AI-driven product or seeking a dedicated, high-resource research environment, CRASH Lab
                  provides the clinical expertise and infrastructure needed to turn innovation into reality.
                </p>
                <p>
                  Please share as much detail as possible in the form below. This helps us direct your inquiry
                  to the right specialist so we can begin exploring how to work together.
                </p>
              </div>
            </div>
            <div className="lg:pl-4">
              <ContactPageForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
