import { SectionLabel } from "@/components/ui";

const items = [
  {
    n: "01",
    h: "Benchmark inflation",
    b: "Public radiology benchmarks have saturated. New models report ever-higher scores on tests that no longer reflect clinical reasoning.",
  },
  {
    n: "02",
    h: "Clinical reality gap",
    b: "In practice, frontier multimodal AI still misses the reasoning steps a trained radiologist does automatically on complex cases.",
  },
  {
    n: "03",
    h: "No accountable yardstick",
    b: "Hospitals, funders, and policy-makers need a reasoning-heavy benchmark that separates hype from signal — built with real radiologists.",
  },
];

export function ProblemStrip(): React.ReactElement {
  return (
    <section
      id="problem"
      className="bg-bg-primary py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header row */}
        <div className="mb-12 grid gap-14 lg:grid-cols-[1fr_1.6fr] lg:items-end">
          <div>
            <SectionLabel number="02" text="WHY THIS MATTERS" />
            <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.02] tracking-tight text-text-primary lg:text-5xl">
              The field has outgrown its benchmarks.
            </h2>
          </div>
          <p className="text-base leading-relaxed text-text-secondary lg:text-[16.5px] lg:max-w-[560px]">
            RadLE exists because the tests that currently decide &ldquo;AI is
            ready for the clinic&rdquo; stopped measuring the hard part. These
            are the three gaps it closes.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {items.map((it) => (
            <article
              key={it.n}
              className="flex min-h-[220px] flex-col gap-4 rounded-token-md border border-border-default bg-surface-panel p-7 shadow-soft"
            >
              <div className="font-mono text-xs tracking-[0.16em] text-text-tertiary">
                {it.n}
              </div>
              <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-text-primary">
                {it.h}
              </h3>
              <p className="text-[14.5px] leading-relaxed text-text-secondary">
                {it.b}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
