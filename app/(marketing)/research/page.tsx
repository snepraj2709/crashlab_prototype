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

        </div>
      </section>

      {/* Tabbed content: Publications (default) + Active Research */}
      <ResearchTabs projects={projects} publications={publications} />

      {/* Bottom card */}
      <section className="border-t border-border py-14 lg:py-20">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-14 xl:px-16">
          <Card
            className="rounded-none"
            variant="spotlight"
          >
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              {/* Left: vision */}
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="font-display text-2xl font-semibold leading-snug tracking-tight text-white sm:text-3xl">
                    2026 and Beyond
                    <br />
                    National Research Collaborations
                  </h2>
                  <p className="mt-6 text-base leading-relaxed text-slate-300">
                    We began securing support from leading national bodies, including ANRF, DST, and
                    the IndiaAI Mission, to advance responsible healthcare AI research.
                  </p>
                </div>
                <Link
                  className="ui-focus-ring group mt-8 inline-flex items-center gap-2 text-sm text-slate-300 transition-colors duration-200 hover:text-white"
                  href="/about"
                >
                  <span>Click here to learn about CRASH Lab&apos;s Journey</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </div>

              {/* Right: Lead PI */}
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Lead PI</p>
                <PersonPhoto
                  className="mt-6 aspect-[1/1] w-full max-w-[10rem] bg-slate-100"
                  fallbackClassName="bg-slate-100 text-4xl tracking-[0.08em] text-navy-900"
                  imageClassName="object-cover"
                  name={lead?.name ?? "Dr. Suvrankar Datta"}
                  photo={lead?.photo}
                  priority
                  sizes="(min-width: 1024px) 10rem, 8rem"
                />
                <h3 className="mt-4 font-display text-xl font-semibold leading-tight tracking-tight text-white sm:text-2xl">
                  {lead?.name ?? "Dr. Suvrankar Datta"}
                </h3>
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
              </div>
            </div>
          </Card>

          {/* Funding — outside the dark card */}
          <div className="mt-8 border-t border-border pt-8">
            <p className="text-sm font-semibold text-accent-cyan">Supported by Koita Foundation</p>
            <p className="mt-2 max-w-2xl text-sm font-semibold leading-relaxed text-accent-cyan">
              Funding for the lab is provided by the Koita Foundation and Google, alongside
              contributions from institutional partners and private philanthropy
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
