import Link from "next/link";

import { RadleDashboard } from "@/components/sections/RadleDashboard";
import { ProofChip } from "@/components/ui";

export function RadLESection(): React.ReactElement {
  return (
    <section className="border-t border-border py-12 lg:py-18" id="radle">
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

        <div className="mt-16">
          <RadleDashboard />

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
            <Link
              className="inline-flex text-sm text-accent-cyan transition hover:opacity-75"
              href="/research/radle-benchmark"
            >
              Explore the benchmark
            </Link>
            <a
              className="inline-flex text-sm text-accent-cyan transition hover:opacity-75"
              href="https://arxiv.org/abs/2509.25559"
              rel="noreferrer"
              target="_blank"
            >
              Read the paper
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
