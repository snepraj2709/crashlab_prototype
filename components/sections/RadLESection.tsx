"use client";

import { ArrowRight, ExternalLink } from "lucide-react";

import { Button, ProofChip, SectionLabel } from "@/components/ui";

const leaderboard = [
  { name: "Expert radiologists", score: 83, group: "human", best: true },
  { name: "Trainee radiologists", score: 45, group: "human" },
  { name: "GPT-5 Thinking", score: 30, group: "ai", highlight: true },
  { name: "Claude Sonnet 4.5", score: 28, group: "ai" },
  { name: "Gemini 2.5 Pro", score: 25, group: "ai" },
  { name: "GPT-4o", score: 19, group: "ai" },
  { name: "Llama 3.2 Vision", score: 14, group: "ai" },
];

const findings = [
  {
    tag: "FINDING 01",
    headline: "53-point accuracy gap",
    body: "Expert radiologists reached 83%. The best frontier AI (GPT-5 Thinking) reached 30%. No current model crosses trainee-level reasoning.",
    value: "−53",
    unit: "pts",
  },
  {
    tag: "FINDING 02",
    headline: "Reasoning, not recall",
    body: "Cases require multi-step clinical inference — differentials, anatomy, patient context. Pattern-matching models fail where radiologists reason.",
    value: "7 / 7",
    unit: "models fail",
  },
  {
    tag: "FINDING 03",
    headline: "Validated by readers",
    body: "12 board-certified radiologists blind-read every case. The benchmark ships with inter-rater agreement and error taxonomies, not just a leaderboard.",
    value: "κ = 0.78",
    unit: "agreement",
  },
];

function getBarColor(row: (typeof leaderboard)[number]) {
  if (row.group === "human") return row.best ? "#0F172A" : "#456882";
  if (row.highlight) return "#EA580C";
  return "#94A3B8";
}

export function RadLESection(): React.ReactElement {
  return (
    <section
      id="radle"
      className="border-y border-border-subtle bg-surface-panel py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14 grid gap-14 lg:grid-cols-2 lg:items-end">
          <div>
            <SectionLabel number="03" text="THE RADLE BENCHMARK" />
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[1.0] tracking-[-0.035em] text-text-primary lg:text-6xl">
              Radiology&apos;s
              <br />
              Last Exam.
            </h2>
          </div>
          <div>
            <p className="text-[17px] leading-relaxed text-text-default max-w-[520px]">
              A reasoning-heavy benchmark built by practicing radiologists to
              measure frontier multimodal AI on the cases expertise was built
              for — rare findings, ambiguous anatomy, multi-step clinical
              inference.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <ProofChip label="RSNA 2025 · Cutting Edge" variant="filled" />
              <ProofChip label="arXiv:2509.25559" />
              <ProofChip label="50 expert cases" />
              <ProofChip label="12 board-certified readers" />
            </div>
          </div>
        </div>

        {/* Leaderboard + stat column */}
        <div className="mb-12 grid gap-6 lg:grid-cols-[1.55fr_1fr]">
          {/* Leaderboard panel */}
          <div className="rounded-token-md border border-border-default bg-bg-primary p-9 shadow-soft">
            <div className="mb-6 flex items-baseline justify-between">
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-tertiary">
                  Results · RadLE v1
                </div>
                <div className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-text-primary">
                  Accuracy on 50 reasoning cases
                </div>
              </div>
              <div className="hidden items-center gap-4 font-mono text-[11px] uppercase tracking-[0.1em] text-text-muted sm:flex">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block size-2.5 rounded-sm bg-text-primary" />
                  Humans
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block size-2.5 rounded-sm bg-text-tertiary" />
                  AI
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {leaderboard.map((r) => (
                <div key={r.name}>
                  <div className="mb-1.5 flex items-baseline justify-between text-[13.5px] text-text-primary">
                    <span className="flex items-baseline gap-2.5">
                      <span>{r.name}</span>
                      {r.best && (
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-cyan">
                          Ceiling
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-sm font-medium shrink-0">
                      {r.score}%
                    </span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-border-default">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${r.score}%`,
                        background: getBarColor(r),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Headline result */}
            <div className="mt-7 flex items-center justify-between gap-5 rounded-token-sm border border-accent-orange/25 bg-accent-orange/[0.06] px-5 py-4">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-800">
                  Headline result
                </div>
                <div className="mt-1 text-[15px] leading-snug text-text-primary">
                  Best AI trails expert radiologists by more than half the
                  benchmark.
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="font-mono text-[38px] font-medium leading-none tracking-tight text-accent-orange">
                  −53 pts
                </div>
              </div>
            </div>
          </div>

          {/* Stat column */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-1 flex-col justify-between rounded-token-md border border-border-default bg-surface-panel p-7" style={{ minHeight: 180 }}>
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-tertiary">
                  What it measures
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-text-default">
                  Reasoning on cases where the answer is not in a template:
                  rare findings, ambiguous anatomy, multi-system interaction.
                </p>
              </div>
            </div>
            <div
              className="flex flex-1 flex-col justify-between rounded-token-md border border-transparent p-7"
              style={{ background: "#0F172A", minHeight: 180 }}
            >
              <div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/55">
                  What it means
                </div>
                <p className="mt-3 text-[15px] leading-relaxed text-[#E8EDF5]">
                  Frontier AI is far from expert-level in the cases that matter
                  clinically. Confidently deployed models still miss what a
                  first-year radiologist would catch.
                </p>
              </div>
            </div>
            <Button variant="primary" size="lg" href="#radle">
              <span>Explore the RadLE Benchmark</span>
              <ArrowRight className="size-4" />
            </Button>
            <Button variant="secondary" size="md" href="https://arxiv.org/abs/2509.25559">
              <ExternalLink className="size-3.5" /> Read the paper (arXiv)
            </Button>
          </div>
        </div>

        {/* Three findings */}
        <div className="grid gap-5 md:grid-cols-3">
          {findings.map((f) => (
            <article
              key={f.tag}
              className="flex min-h-[220px] flex-col gap-4 rounded-token-md border border-border-default bg-surface-panel p-7 shadow-soft"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-accent-cyan">
                  {f.tag}
                </span>
                <span className="font-mono text-2xl font-medium tracking-tight text-text-primary">
                  {f.value}
                </span>
              </div>
              <h3 className="font-display text-[22px] font-semibold leading-tight tracking-tight text-text-primary">
                {f.headline}
              </h3>
              <p className="flex-1 text-[14.5px] leading-relaxed text-text-secondary">
                {f.body}
              </p>
              <div className="border-t border-border-subtle pt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-text-tertiary">
                {f.unit}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
