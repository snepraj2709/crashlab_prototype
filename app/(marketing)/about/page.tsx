import type { Metadata } from "next";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Database, FileText, Globe, Presentation } from "lucide-react";

import {
  CallToActionCard,
  JourneyOutlookSection,
  PillarsSection,
} from "@/components/sections";
import { aboutContent } from "@/lib/content/about";

export const metadata: Metadata = {
  title: "About — CRASH Lab",
  description:
    "Learn how CRASH Lab came to exist, its mission to build responsible AI for Indian healthcare, and what it has accomplished since founding in April 2025."
};

const aboutIconMap = {
  papers: FileText,
  presentation: Presentation,
  globe: Globe,
  data: Database
} satisfies Record<string, LucideIcon>;

export default function AboutPage(): React.ReactElement {
  const {
    hero,
    origin,
    mission,
    vision,
    impactMetrics,
    journey,
    futureOutlook,
    cta
  } = aboutContent;
  const missionVisionItems = [{ ...vision }, { ...mission }];
  const subheadlineParts = hero.subheadline.split(hero.mainWebsiteLabel);

  return (
    <div>
      {/* Hero */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <p className="mt-6 text-xs uppercase tracking-[0.22em] text-accent-cyan">
            {hero.eyebrow}
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl font-display text-5xl text-text-primary lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-text-secondary">
            {subheadlineParts[0]}
            <Link
              className="underline decoration-border-focus underline-offset-4 transition-colors hover:text-text-primary"
              href={hero.mainWebsiteHref}
              rel="noreferrer"
              target="_blank"
            >
              {hero.mainWebsiteLabel}
            </Link>
            {subheadlineParts[1]}
          </p>
        </div>
      </section>
      

      {/* Mission & Vision */}
      <section className="pb-8 pt-2 lg:pb-16 lg:pt-6">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div>
            {missionVisionItems.map((item) => (
              <article
                className="lg:py-15 border-t-2 border-border py-10"
                key={item.heading}
              >
                <div className="grid gap-8 lg:grid-cols-[minmax(17rem,0.31fr)_minmax(0,0.69fr)] lg:items-center lg:gap-24">
                  <div className="text-left">
                    <h2 className="font-display text-4xl font-semibold tracking-tight text-text-primary lg:text-5xl">
                      {item.heading}
                    </h2>
                  </div>
                  <div>
                    <p className="text-lg leading-9 text-text-secondary">
                      {item.body}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      {/* Impact Numbers */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-tight tracking-tight text-text-primary lg:text-5xl">
            What the lab has built since founding.
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 sm:gap-8 lg:mt-16 lg:grid-cols-4 lg:gap-10">
            {impactMetrics.map((metric) => {
              const Icon =
                aboutIconMap[metric.icon as keyof typeof aboutIconMap] ?? Globe;

              return (
                <article className="flex items-start gap-4" key={metric.label}>
                  <div className="flex h-12 w-12 shrink-0 items-start justify-center pt-1">
                    <Icon
                      aria-hidden="true"
                      className="size-8 text-accent-cyan"
                    />
                  </div>
                  <div>
                    <p className="font-display text-3xl font-semibold leading-none tracking-tight text-text-primary sm:text-4xl">
                      {metric.value}
                    </p>
                    <p className="mt-3 max-w-xs text-lg leading-8 text-text-secondary">
                      {metric.label}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-20">
            <div className="text-left">
              <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight text-text-primary lg:mt-0 lg:text-5xl">
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
      
      {/* Journey & Outlook */}
      <JourneyOutlookSection futureOutlook={futureOutlook} journey={journey} />

      {/* Research Pillars */}
      <PillarsSection id="research-pillars" />

      


      {/* CTA */}
      <section className="lg:py-18 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <CallToActionCard
            body={cta.body}
            buttonHref={cta.buttonHref}
            buttonLabel={cta.buttonLabel}
            heading={cta.heading}
          />
        </div>
      </section>
    </div>
  );
}
