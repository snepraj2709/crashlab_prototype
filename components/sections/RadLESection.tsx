import { RadleDashboard } from "@/components/sections/RadleDashboard";
import { Button, ProofChip } from "@/components/ui";

export function RadLESection(): React.ReactElement {
  return (
    <section className="border-t border-border py-10 sm:py-12 lg:py-18" id="radle">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <h2 className="font-display text-3xl text-text-primary sm:text-4xl lg:text-5xl">
              Radiology&apos;s Last Exam.
            </h2>
            <div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:gap-4">
              <Button
                className="w-full justify-center sm:w-auto"
                href="/research/radle-benchmark"
                variant="primary"
              >
                Explore the benchmark
              </Button>
              <Button
                className="w-full justify-center sm:w-auto"
                href="https://arxiv.org/abs/2509.25559"
                rel="noreferrer"
                target="_blank"
                variant="secondary"
              >
                Read the paper
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <p className="max-w-2xl text-sm leading-7 text-text-secondary sm:text-base sm:leading-8">
              A reasoning-heavy benchmark of 50 expert-level spot diagnoses across CT, MRI, and
              radiography. Frontier multimodal AI tested against board-certified radiologists and
              trainees, with reproducibility measured across three independent runs.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <ProofChip label="50 expert cases" variant="outline" />
              <ProofChip label="12 human readers" variant="outline" />
              <ProofChip label="5 frontier models" variant="outline" />
              <ProofChip label="RSNA 2025 · Cutting Edge" variant="outline" />
            </div>
          </div>
        </div>

        <div className="mt-10 sm:mt-14 lg:mt-16">
          <RadleDashboard />
        </div>
      </div>
    </section>
  );
}
