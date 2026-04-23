import type { Metadata } from "next";
import { FileText, Globe, Microscope } from "lucide-react";

import { PillarsSection, TimelineSection } from "@/components/sections";
import { Button, MetricTile } from "@/components/ui";
import { aboutContent } from "@/lib/content/about";

export const metadata: Metadata = {
  title: "About — CRASH Lab",
  description:
    "Learn how CRASH Lab came to exist, its mission to build responsible AI for Indian healthcare, and what it has accomplished since founding in April 2025."
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
  // { value: "#1", label: "Indian lab by AI abstracts at RSNA 2025" },
  {
    value: "3",
    label: "International collaborations",
    icon: Globe,
  }
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
                <MetricTile
                  icon={metric.icon}
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                />
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
            <Button
              className="mt-10 font-sans text-lg font-semibold"
              href={cta.buttonHref}
              size="lg"
              variant="secondary"
            >
              {cta.buttonLabel}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
