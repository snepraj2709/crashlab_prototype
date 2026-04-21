import Link from "next/link";
import type { Metadata } from "next";

import { PillarsSection, TimelineSection } from "@/components/sections";
import { MetricTile } from "@/components/ui";
import { aboutContent } from "@/lib/content/about";

export const metadata: Metadata = {
  title: "About — CRASH Lab",
  description:
    "Learn how CRASH Lab came to exist, its mission to build responsible AI for Indian healthcare, and what it has accomplished since founding in April 2025."
};

const impactMetrics = [
  { value: "15+", label: "Papers accepted at top conferences" },
  { value: "6", label: "RSNA 2025 accepted abstracts" },
  { value: "#1", label: "Indian lab by AI abstracts at RSNA 2025" },
  { value: "3", label: "International collaborations" }
];

export default function AboutPage(): React.ReactElement {
  const { hero, origin, mission, vision, cta } = aboutContent;

  return (
    <div className="pt-32">
      {/* Hero */}
      <section className="py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-accent-cyan">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl text-text-primary lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-secondary">{hero.subheadline}</p>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
            <div>
              <h2 className="mt-6 font-display text-4xl text-text-primary lg:text-5xl">
                {origin.heading}
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-9 text-text-secondary">
              {origin.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-token-md border border-border bg-bg-surface p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Mission</p>
              <p className="mt-6 text-lg leading-8 text-text-secondary">{mission.body}</p>
            </div>
            <div className="rounded-token-md border border-border bg-bg-surface p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Vision</p>
              <p className="mt-6 text-lg leading-8 text-text-secondary">{vision.body}</p>
            </div>
          </div>
        </div>
      </section>

      <PillarsSection
        id="research-pillars"
        variant="interactive"
      />

      {/* Impact Numbers */}
      <section className="py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mt-6 font-display text-4xl text-text-primary">
              What the lab has built since founding.
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4 xl:gap-8">
              {impactMetrics.map((metric) => (
                <MetricTile key={metric.label} label={metric.label} value={metric.value} />
              ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <TimelineSection />

      {/* CTA */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-token-md border border-slate-800 bg-navy-900 px-10 py-12 shadow-soft lg:px-16 lg:py-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-accent-cyan/10 blur-3xl"
            />
            <div className="relative max-w-5xl">
              <h2 className="max-w-4xl font-display text-3xl font-semibold leading-[1.04] tracking-tight text-white sm:text-4xl lg:text-5xl">
                {cta.heading}
              </h2>
              <p className="mt-6 max-w-4xl font-sans text-lg font-normal leading-8 text-slate-300 sm:text-xl sm:leading-[1.5] lg:text-2xl">
                {cta.body}
              </p>
            </div>
            <Link
              className="ui-focus-ring relative mt-10 inline-flex items-center rounded-token-pill border border-brand-blue bg-brand-blue px-7 py-3 font-sans text-lg font-semibold text-white transition-all hover:brightness-110"
              href={cta.buttonHref}
            >
              {cta.buttonLabel} <span aria-hidden="true" className="ml-3 text-md leading-none">→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
