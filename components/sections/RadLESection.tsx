import Link from "next/link";

import { ProofChip } from "@/components/ui";

const leaderboard: Array<{ name: string; score: number; group: "human" | "ai" }> = [
  { name: "Expert radiologists", score: 83, group: "human" },
  { name: "Trainee radiologists", score: 45, group: "human" },
  { name: "GPT-5 Thinking", score: 30, group: "ai" },
  { name: "Claude Sonnet 4.5", score: 28, group: "ai" },
  { name: "Gemini 2.5 Pro", score: 25, group: "ai" },
  { name: "GPT-4o", score: 19, group: "ai" },
  { name: "Llama 3.2 Vision", score: 14, group: "ai" },
];

const findings = [
  {
    tag: "Finding 01",
    headline: "53-point accuracy gap",
    body: "Expert radiologists reached 83%. The best frontier AI reached 30%. No current model crosses trainee-level reasoning.",
    value: "−53 pts",
  },
  {
    tag: "Finding 02",
    headline: "Reasoning, not recall",
    body: "Cases require multi-step inference: differential diagnosis, anatomy, and patient context. Pattern matching fails where radiologists reason.",
    value: "7 / 7",
  },
  {
    tag: "Finding 03",
    headline: "Validated by readers",
    body: "Twelve board-certified radiologists blind-read every case. The benchmark ships with agreement data and error taxonomies.",
    value: "κ = 0.78",
  },
];

function getBarColor(group: "human" | "ai"): string {
  return group === "human" ? "var(--color-text-primary)" : "var(--color-accent-cyan)";
}

export function RadLESection(): React.ReactElement {
  return (
    <section className="border-t border-border py-16 lg:py-24" id="radle">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <h2 className="font-display text-4xl text-text-primary lg:text-5xl">
              Radiology&apos;s Last Exam.
            </h2>
          </div>
          <div className="space-y-4">
            <p className="max-w-2xl text-base leading-8 text-text-secondary">
              A reasoning-heavy benchmark built with practicing radiologists to measure frontier
              multimodal AI on rare findings, ambiguous anatomy, and multi-step clinical inference.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <ProofChip label="RSNA 2025 · Cutting Edge" variant="outline" />
              <ProofChip label="arXiv:2509.25559" variant="outline" />
              <ProofChip label="50 expert cases" variant="outline" />
              <ProofChip label="12 board-certified readers" variant="outline" />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary">
                  Results · RadLE v1
                </p>
                <h3 className="mt-2 text-2xl font-medium text-text-primary">
                  Accuracy on 50 reasoning cases
                </h3>
              </div>
              <div className="flex items-center gap-4 text-xs uppercase tracking-[0.14em] text-text-tertiary">
                <span>Human</span>
                <span>AI</span>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {leaderboard.map((row) => (
                <div key={row.name}>
                  <div className="mb-2 flex items-baseline justify-between gap-4">
                    <span className="text-sm text-text-primary">{row.name}</span>
                    <span className="font-mono text-sm text-text-primary">{row.score}%</span>
                  </div>
                  <div aria-hidden="true" className="h-2 w-full bg-border">
                    <div
                      className="h-2"
                      style={{ backgroundColor: getBarColor(row.group), width: `${row.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div className="border-t border-border pt-5">
              <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary">
                What it measures
              </p>
              <p className="mt-3 text-sm leading-8 text-text-secondary">
                Reasoning on cases where the answer is not in a template: rare findings, ambiguous
                anatomy, and multi-system interaction.
              </p>
            </div>
            <div className="border-t border-border pt-5">
              <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary">
                What it means
              </p>
              <p className="mt-3 text-sm leading-8 text-text-secondary">
                Frontier AI remains far from expert-level in the cases that matter clinically.
                Confident deployment claims are still outrunning evidence.
              </p>
            </div>
            <div className="border-t border-border pt-5">
              <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary">
                Continue
              </p>
              <div className="mt-3 space-y-3">
                <Link
                  className="inline-flex text-sm text-accent-cyan transition hover:opacity-75"
                  href="/research/radle-benchmark"
                >
                  Explore the benchmark →
                </Link>
                <div>
                  <a
                    className="inline-flex text-sm text-accent-cyan transition hover:opacity-75"
                    href="https://arxiv.org/abs/2509.25559"
                    rel="noreferrer"
                    target="_blank"
                  >
                    Read the paper ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {findings.map((finding) => (
            <article className="border-t border-border pt-6" key={finding.tag}>
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-xs uppercase tracking-[0.18em] text-accent-cyan">{finding.tag}</p>
                <p className="font-mono text-xl text-text-primary">{finding.value}</p>
              </div>
              <h3 className="mt-4 text-2xl font-medium text-text-primary">{finding.headline}</h3>
              <p className="mt-4 text-sm leading-8 text-text-secondary">{finding.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
