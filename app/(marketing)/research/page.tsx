import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { PersonPhoto } from "@/components/sections/PersonPhoto";
import { ResearchTabs } from "@/components/sections/ResearchTabs";
import { Card } from "@/components/ui";
import { getProjects, getPersonBySlug, getSeedPublications } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Research & Publications — CRASH Lab",
  description:
    "Active research projects, benchmarks, and accepted papers from CRASH Lab — the fastest-ramping clinical AI lab in India.",
};

export const revalidate = 300;

const impactMetrics = [
  { value: "15+", label: "Papers accepted at top conferences" },
  { value: "6", label: "RSNA 2025 accepted abstracts" },
  { value: "#1", label: "Indian lab by AI abstracts at RSNA 2025" },
];

export default async function ResearchPage(): Promise<React.ReactElement> {
  const [projects, lead, publications] = await Promise.all([
    getProjects(),
    getPersonBySlug("suvrankar-datta"),
    Promise.resolve(getSeedPublications()),
  ]);

  const leadCredentials = lead?.credentials.slice(0, 3) ?? [];

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-bg-surface py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-14 xl:px-16">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-text-tertiary">
            CRASH Lab · Ashoka University
          </p>
          <h1 className="mt-5 font-display text-4xl tracking-tight text-text-primary lg:mt-6 lg:text-5xl">
            Research &amp; Publications
          </h1>
          <p className="mt-6 max-w-5xl text-base leading-[1.75] text-text-secondary lg:text-lg lg:leading-relaxed">
            Active research projects, benchmarks, and accepted papers — with evaluation grounded in
            clinical reality, not presentation-friendly metrics alone.
          </p>

          <dl className="mt-14 grid grid-cols-1 gap-10 border-t border-border pt-14 sm:grid-cols-3 sm:gap-12 lg:gap-16">
            {impactMetrics.map((metric) => (
              <div key={metric.label}>
                <dt className="text-sm leading-snug text-text-tertiary">{metric.label}</dt>
                <dd className="mt-2 font-display text-2xl font-semibold tabular-nums text-text-primary">
                  {metric.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 lg:mt-14">
            <Link
              className="ui-focus-ring group inline-flex items-center gap-1.5 text-sm font-semibold text-accent-cyan transition-all duration-200 hover:gap-2 hover:text-text-primary"
              href="/about#journey-outlook"
            >
              <span className="underline decoration-transparent underline-offset-4 transition-all duration-200 group-hover:decoration-current">
                Learn more about the lab&apos;s journey.
              </span>
              <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tabbed content: Publications (default) + Active Research */}
      <ResearchTabs projects={projects} publications={publications} />

      {/* Bottom cards */}
      <section className="border-t border-border py-14 lg:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:px-10 lg:grid-cols-2 lg:gap-10 lg:px-14 xl:px-16">
          <Card
            className="flex flex-col justify-between rounded-none lg:min-h-[22rem]"
            variant="spotlight"
          >
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Upcoming</p>
              <h2 className="mt-4 max-w-xl font-display text-2xl font-semibold leading-[1.08] tracking-tight text-white sm:text-3xl">
                Scale Data Commons to 50+ hospitals by 2027
              </h2>
            </div>
            <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-slate-300">
              The next phase expands beyond benchmarks into the infrastructure that makes clinical AI
              research faster, more accountable, and more representative across India.
            </p>
          </Card>
          <Card
            className="flex flex-col justify-between rounded-none lg:min-h-[22rem]"
            variant="spotlight"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Lead PI</p>
              <PersonPhoto
                className="mt-6 aspect-[1/1] w-full max-w-[12rem] bg-slate-100"
                fallbackClassName="bg-slate-100 text-4xl tracking-[0.08em] text-navy-900"
                imageClassName="object-cover"
                name={lead?.name ?? "Dr. Suvrankar Datta"}
                photo={lead?.photo}
                priority
                sizes="(min-width: 1024px) 12rem, 10rem"
              />
              <h2 className="mt-4 max-w-xl font-display text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl">
                {lead?.name ?? "Dr. Suvrankar Datta"}
              </h2>
              {leadCredentials.length ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {leadCredentials.map((credential) => (
                    <span
                      className="inline-flex items-center border border-white/20 bg-white px-3 py-1.5 text-xs font-semibold text-navy-900 sm:text-sm"
                      key={credential}
                    >
                      {credential}
                    </span>
                  ))}
                </div>
              ) : null}
              <Link
                className="ui-focus-ring group mt-6 inline-flex items-center gap-2 text-sm text-slate-300 transition-colors duration-200 hover:text-white"
                href="/people"
              >
                <span>Meet the team behind CRASH Lab.</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-sm font-medium text-slate-400">Supported by Koita Foundation</p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
                  The lab is funded by Koita Foundation, Google grant, and other institutional
                  partner and philanthropic capital.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
