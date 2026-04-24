import Link from "next/link";
import type { Metadata } from "next";
import {
  CalendarDays,
  Database,
  FileText,
  Globe,
  Microscope,
  Trophy,
} from "lucide-react";

import { PersonPhoto } from "@/components/sections/PersonPhoto";
import { PublicationsStory } from "@/components/sections";
import { Card, MetricTile } from "@/components/ui";
import { getPersonBySlug, getSeedPublications } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Publications — CRASH Lab",
  description:
    "Research output, benchmarks, and accepted papers from CRASH Lab — the fastest-ramping clinical AI lab in India.",
};

const impactMetrics = [
  {
    value: "15+",
    label: "Papers accepted at top conferences",
    icon: FileText,
  },
  {
    value: "6",
    label: "RSNA 2025 accepted abstracts",
    icon: Microscope,
  },
  {
    value: "#1",
    label: "Indian lab by AI abstracts at RSNA 2025",
    icon: Trophy,
  },
  {
    value: "Apr 2025",
    label: "Lab founded — fastest ramp in Indian health AI",
    icon: CalendarDays,
  },
  {
    value: "4",
    label: "Research pillars: Data, Benchmarks, Design, Models",
    icon: Database,
  },
  {
    value: "3",
    label: "International institutional collaborations",
    icon: Globe,
  },
];

export default async function PublicationsPage(): Promise<React.ReactElement> {
  const [lead, publications] = await Promise.all([
    getPersonBySlug("suvrankar-datta"),
    Promise.resolve(getSeedPublications()),
  ]);
  const leadCredentials = lead?.credentials.slice(0, 3) ?? [];

  return (
    <div>
      {/* Hero */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="mt-6 max-w-4xl font-display text-5xl text-text-primary lg:text-6xl">
            Publications
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary">
            CRASH Lab has been moving at a pace unusual in academia. It is
            designed around the thesis: healthcare AI should be evaluated under
            clinical reality, not presentation-friendly benchmarks.
          </p>

          <div className="mt-12 border-y border-border py-5">
            <div className="grid gap-6 md:grid-cols-3 md:divide-x md:divide-border">
              {impactMetrics.slice(0, 3).map((metric) => (
                <MetricTile
                  className="md:px-6 md:first:pl-0 md:last:pr-0"
                  icon={metric.icon}
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Publications grouped by type */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <PublicationsStory publications={publications} />
        </div>
      </section>

      {/* PI credibility + funding */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-2 lg:px-8">
          <Card
            className="flex min-h-[28rem] flex-col justify-between lg:min-h-[34rem]"
            variant="spotlight"
          >
            <div className="max-w-xl">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-300">
                Upcoming
              </p>
              <h2 className="max-w-4xl font-display text-3xl font-semibold leading-[1.04] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Scale Data Commons to 50+ hospitals by 2027
              </h2>
            </div>
            <p className="mt-8 max-w-xl font-sans text-lg leading-8 text-slate-300 sm:text-xl">
              The next phase expands beyond benchmarks into the infrastructure
              that makes clinical AI research faster, more accountable, and more
              representative across India.
            </p>
          </Card>
          <Card
            className="flex min-h-[28rem] flex-col justify-between lg:min-h-[34rem]"
            variant="spotlight"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-slate-300">
                Lead PI
              </p>
              <PersonPhoto
                className="mt-8 aspect-[1/1] w-full max-w-[16rem] rounded-[1.75rem] bg-slate-100"
                fallbackClassName="bg-slate-100 text-5xl tracking-[0.08em] text-navy-900"
                imageClassName="object-cover"
                name={lead?.name ?? "Dr. Suvrankar Datta"}
                photo={lead?.photo}
                priority
                sizes="(min-width: 1024px) 16rem, 14rem"
              />
              <h2 className="max-w-4xl font-display text-2xl font-semibold leading-[1.04] tracking-tight text-white sm:text-4xl lg:text-3xl mt-6">
                {lead?.name ?? "Dr. Suvrankar Datta"}
              </h2>
              {leadCredentials.length ? (
                <div className="mt-6 flex flex-wrap gap-3">
                  {leadCredentials.map((credential) => (
                    <span
                      className="inline-flex items-center rounded-token-pill border border-white/20 bg-white px-4 py-2 text-sm font-semibold text-navy-900 sm:text-base"
                      key={credential}
                    >
                      {credential}
                    </span>
                  ))}
                </div>
              ) : null}
              <Link
              className="ui-focus-ring group mt-10 inline-flex items-center gap-2 text-base font-lg text-slate-300 transition-colors duration-200 hover:text-white"
              href="/people"
            >
              <span>Meet the team behind Crash Lab&apos;s Success.</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
              <div className="mt-8 border-t border-white/10 pt-5">
                <p className="text-sm font-medium text-slate-400">
                  Supported by Koita Foundation
                </p>
                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-400">
                  The lab is funded by Koita Foundation, Google grant, and other
                  institutional partner and philanthropic capital.
                </p>
              </div>
            </div>
            
          </Card>
        </div>
      </section>
    </div>
  );
}
