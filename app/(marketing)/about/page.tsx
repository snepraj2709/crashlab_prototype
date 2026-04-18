import Link from "next/link";
import type { Metadata } from "next";

import { TimelineSection } from "@/components/sections";
import { MetricTile, SectionLabel } from "@/components/ui";
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
  { value: "Apr 2025", label: "Lab founded" },
  { value: "4", label: "Research pillars" },
  { value: "3", label: "International collaborations" }
];

export default function AboutPage(): React.ReactElement {
  const { hero, origin, mission, vision, pillars, cta } = aboutContent;

  return (
    <div className="pt-32">
      {/* Hero */}
      <section className="py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel number="01" text="About" />
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
              <SectionLabel number="02" text="Our Story" />
              <h2 className="mt-6 font-display text-4xl text-text-primary lg:text-5xl">
                {origin.heading}
              </h2>
            </div>
            <div className="space-y-6 pt-2 text-lg leading-9 text-text-secondary lg:pt-20">
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
          <SectionLabel number="03" text="Mission & Vision" />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-token-md border border-border bg-bg-surface p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Mission</p>
              <h2 className="mt-4 font-display text-3xl text-text-primary">{mission.heading}</h2>
              <p className="mt-6 text-lg leading-8 text-text-secondary">{mission.body}</p>
            </div>
            <div className="rounded-token-md border border-border bg-bg-surface p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Vision</p>
              <h2 className="mt-4 font-display text-3xl text-text-primary">{vision.heading}</h2>
              <p className="mt-6 text-lg leading-8 text-text-secondary">{vision.body}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Pillars */}
      <section className="py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel number="04" text="Research Pillars" />
          <h2 className="mt-6 font-display text-4xl text-text-primary">
            Four pillars. One thesis.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {pillars.map((pillar) => (
              <div
                className="rounded-token-md border border-border bg-bg-surface p-6"
                key={pillar.label}
              >
                <p className="font-display text-2xl text-text-primary">{pillar.label}</p>
                <p className="mt-4 text-text-secondary">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel number="05" text="Impact" />
          <h2 className="mt-6 font-display text-4xl text-text-primary">
            What the lab has built since founding.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
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
          <div className="rounded-token-md border border-border bg-bg-surface p-10 lg:p-16">
            <h2 className="font-display text-4xl text-text-primary lg:text-5xl">{cta.heading}</h2>
            <p className="mt-6 max-w-2xl text-lg text-text-secondary">{cta.body}</p>
            <Link
              className="ui-focus-ring mt-10 inline-flex items-center rounded-token-pill border border-border-focus bg-status-info-surface px-6 py-3 text-base font-semibold text-border-focus transition-all hover:bg-border-focus hover:text-white"
              href={cta.buttonHref}
            >
              {cta.buttonLabel} →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
