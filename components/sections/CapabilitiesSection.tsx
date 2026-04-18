import { ArrowRight } from "lucide-react";

import { SectionLabel } from "@/components/ui";

const caps = [
  {
    num: "01",
    title: "Benchmarks",
    body: "RadLE and its successors — reasoning-heavy tests that hold frontier AI accountable on real clinical cases.",
    meta: "RadLE v1 · RadLE-X (in progress)",
  },
  {
    num: "02",
    title: "Foundation models",
    body: "Pretrained on multi-institutional Indian imaging corpora with clinician-in-the-loop curation.",
    meta: "Radiograph FM · In progress",
  },
  {
    num: "03",
    title: "Clinical validation",
    body: "Failure-mode studies for deployed AI on Indian patient cohorts — the edge cases global benchmarks miss.",
    meta: "IndicXray Evaluator · Active",
  },
  {
    num: "04",
    title: "Infrastructure & policy",
    body: "Consented, audited data access for healthcare AI research in Indian hospital systems.",
    meta: "India Clinical Data Trust · Policy brief",
  },
];

export function CapabilitiesSection(): React.ReactElement {
  return (
    <section
      id="research"
      className="border-t border-border-subtle bg-surface-panel py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-10">
          <div>
            <SectionLabel number="05" text="WHAT WE DO" />
            <h2 className="mt-5 max-w-2xl font-display text-4xl font-semibold leading-[1.02] tracking-tight text-text-primary lg:text-5xl">
              Four pillars. One clock.
            </h2>
          </div>
          <a
            href="/research"
            className="inline-flex items-center gap-2 text-sm font-medium text-accent-cyan hover:underline"
          >
            See the full research agenda <ArrowRight className="size-3.5" />
          </a>
        </div>

        {/* 4-column grid */}
        <div className="overflow-hidden rounded-token-md border border-border-default bg-surface-panel">
          <div className="grid divide-x divide-border-subtle md:grid-cols-2 xl:grid-cols-4">
            {caps.map((c) => (
              <div
                key={c.num}
                className="flex min-h-[280px] flex-col gap-4 p-8"
              >
                <div className="font-mono text-xs font-semibold tracking-[0.18em] text-accent-cyan">
                  {c.num}
                </div>
                <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-text-primary">
                  {c.title}
                </h3>
                <p className="flex-1 text-[14.5px] leading-relaxed text-text-secondary">
                  {c.body}
                </p>
                <div className="border-t border-border-subtle pt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary">
                  {c.meta}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
