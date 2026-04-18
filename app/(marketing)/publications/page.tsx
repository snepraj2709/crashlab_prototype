import type { Metadata } from "next";

import { PublicationsStory, TimelineSection } from "@/components/sections";
import { MetricTile, ProofChip, SectionLabel } from "@/components/ui";
import { getPersonBySlug, getSeedPublications } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Publications — CRASH Lab",
  description:
    "Research output, benchmarks, and accepted papers from CRASH Lab — the fastest-ramping clinical AI lab in India."
};

const impactMetrics = [
  { value: "15+", label: "Papers accepted at top conferences" },
  { value: "6", label: "RSNA 2025 accepted abstracts" },
  { value: "#1", label: "Indian lab by AI abstracts at RSNA 2025" },
  { value: "Apr 2025", label: "Lab founded — fastest ramp in Indian health AI" },
  { value: "4", label: "Research pillars: Data, Benchmarks, Design, Models" },
  { value: "3", label: "International institutional collaborations" }
];

export default async function PublicationsPage(): Promise<React.ReactElement> {
  const [lead, publications] = await Promise.all([
    getPersonBySlug("suvrankar-datta"),
    Promise.resolve(getSeedPublications())
  ]);

  return (
    <div className="pt-32">
      {/* Hero */}
      <section className="py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel number="01" text="Publications" />
          <h1 className="mt-6 max-w-4xl font-display text-5xl text-text-primary lg:text-6xl">
            Publications.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-secondary">
            CRASH Lab has been moving at a pace unusual in academia. 
            It is designed around the thesis: healthcare AI should be evaluated under clinical reality, not
            presentation-friendly benchmarks.
          </p>
        </div>
      </section>

      {/* Publications grouped by type */}
      <section className="py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <PublicationsStory publications={publications} />
        </div>
      </section>

      {/* PI credibility + funding */}
      <section className="py-8 lg:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div className="rounded-token-md border border-border bg-bg-surface p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Upcoming</p>
            <h2 className="mt-4 font-display text-4xl text-text-primary">
              Scale Data Commons to 50+ hospitals by 2027
            </h2>
            <p className="mt-6 text-text-secondary">
              The next phase expands beyond benchmarks into the infrastructure that makes clinical
              AI research faster, more accountable, and more representative across India.
            </p>
          </div>
          <div className="rounded-token-md border border-border bg-bg-surface p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Lead PI</p>
            <h2 className="mt-4 font-display text-4xl text-text-primary">{lead?.name}</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {lead?.credentials.slice(0, 5).map((credential) => (
                <ProofChip key={credential} label={credential} size="sm" />
              ))}
            </div>
            <p className="mt-6 text-text-secondary">{lead?.shortBio}</p>
            <div className="mt-8 rounded-token-sm border border-border bg-bg-surface p-6">
              <p className="text-sm uppercase tracking-[0.16em] text-text-tertiary">Funding</p>
              <p className="mt-3 text-xl text-text-primary">Supported by Koita Foundation</p>
              <p className="mt-3 text-text-secondary">
                The lab is building a portfolio for future grants, institutional partnerships, and
                aligned philanthropic capital.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
