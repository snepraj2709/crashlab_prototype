import { ArrowRight, ArrowUpRight } from "lucide-react";

import { MetricTile, SectionLabel } from "@/components/ui";

const metrics = [
  { value: "15+", label: "Papers at top venues" },
  { value: "6", label: "RSNA 2025 accepted abstracts" },
  { value: "#1", label: "Indian lab by AI abstracts at RSNA 2025" },
  { value: "< 8mo", label: "Zero to 15 papers — founded April 2025" },
];

const publications = [
  {
    tag: "PAPER · 2025",
    title: "RadLE: A reasoning benchmark for radiology",
    venue: "arXiv · RSNA 2025 Cutting Edge",
    href: "https://arxiv.org/abs/2509.25559",
    status: "published" as const,
  },
  {
    tag: "PAPER · 2025",
    title: "Failure modes of multimodal AI on Indian chest radiographs",
    venue: "RSNA 2025 · accepted abstract",
    href: "#",
    status: "published" as const,
  },
  {
    tag: "PAPER · 2024",
    title: "Clinical truth cards: grounding model claims in radiologist judgment",
    venue: "MICCAI workshop",
    href: "#",
    status: "published" as const,
  },
  {
    tag: "PREPRINT · 2025",
    title: "Inter-rater disagreement as the ceiling on AI reasoning",
    venue: "Under review",
    href: "#",
    status: "active" as const,
  },
];

export function ProofSection(): React.ReactElement {
  return (
    <section
      id="publications"
      className="bg-bg-primary py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:items-end">
          <div>
            <SectionLabel number="04" text="PROOF OF WORK" />
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-text-primary lg:text-5xl">
              Numbers, not narrative.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-text-secondary lg:text-[16px] max-w-[520px]">
            Four research pillars: data, benchmarks, design, models. The work
            ships at top venues on a clock short enough to matter.
          </p>
        </div>

        {/* Metric tiles */}
        <div className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((m) => (
            <MetricTile key={m.label} value={m.value} label={m.label} />
          ))}
        </div>

        {/* Publications table */}
        <div className="overflow-hidden rounded-token-md border border-border-default bg-surface-panel">
          <div className="flex items-center justify-between border-b border-border-subtle px-7 py-[18px]">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-tertiary">
              Selected publications
            </div>
            <a
              href="/publications"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-accent-cyan hover:underline"
            >
              View all 15 <ArrowRight className="size-3.5" />
            </a>
          </div>
          {publications.map((p, i) => (
            <a
              key={p.title}
              href={p.href}
              target={p.href.startsWith("http") ? "_blank" : undefined}
              rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group grid items-center gap-5 border-b border-border-subtle px-7 py-[22px] text-inherit no-underline transition-colors last:border-0 hover:bg-bg-elevated"
              style={{
                gridTemplateColumns: "160px 1fr 220px 40px",
              }}
            >
              <span className="font-mono text-[11px] tracking-[0.14em] text-text-tertiary">
                {p.tag}
              </span>
              <span className="text-base font-medium leading-snug text-text-primary">
                {p.title}
              </span>
              <span className="text-[13px] text-text-muted">{p.venue}</span>
              <span className="flex justify-end text-text-tertiary">
                <ArrowUpRight className="size-3.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
