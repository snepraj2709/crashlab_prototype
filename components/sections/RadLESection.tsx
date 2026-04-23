import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { BrainCircuit, ShieldCheck, TrendingDown } from "lucide-react";

import { ProofChip } from "@/components/ui";

const findings = [
  {
    tag: "Finding 01",
    headline: "32-point expert gap",
    body: "Board-certified radiologists reached 83%. Gemini 3.0 Pro reached 51%, beating trainees at 45% but remaining well below experts.",
    value: "−32 pts",
    icon: TrendingDown,
  },
  {
    tag: "Finding 02",
    headline: "Reasoning, not recall",
    body: "Cases require multi-step inference: differential diagnosis, anatomy, and patient context. Pattern matching fails where radiologists reason.",
    value: "7 / 7",
    icon: BrainCircuit,
  },
  {
    tag: "Finding 03",
    headline: "Validated by readers",
    body: "Twelve board-certified radiologists blind-read every case. The benchmark ships with agreement data and error taxonomies.",
    value: "κ = 0.78",
    icon: ShieldCheck,
  },
] satisfies Array<{
  tag: string;
  headline: string;
  body: string;
  value: string;
  icon: LucideIcon;
}>;

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
            <div className="border-b border-border pb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary">
                  Results · RadLE v1
                </p>
                <h3 className="mt-2 text-2xl font-medium text-text-primary">
                  Accuracy on 50 reasoning cases
                </h3>
              </div>
            </div>

            <figure className="mt-6 overflow-hidden rounded-token-sm border border-border-default bg-surface-panel shadow-soft">
              <Image
                alt="RadLE benchmark comparison chart showing board-certified radiologists at 0.83, Gemini 3.0 Pro at 0.51, radiology trainees at 0.45, GPT-5 Thinking at 0.30, Gemini 2.5 Pro at 0.29, OpenAI o3 at 0.23, Grok 4 at 0.12, and Claude Opus 4.1 at 0.01 diagnostic accuracy."
                className="h-auto w-full"
                height={1256}
                priority={false}
                sizes="(min-width: 1024px) 58vw, 100vw"
                src="/radle-image.png"
                width={2238}
              />
            </figure>
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
                <div className="flex items-center gap-2">
                  <finding.icon
                    aria-hidden="true"
                    className="size-4 shrink-0 text-accent-cyan"
                  />
                  <p className="text-xs uppercase tracking-[0.18em] text-accent-cyan">{finding.tag}</p>
                </div>
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
