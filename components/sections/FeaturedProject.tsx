import Image from "next/image";

import { Button } from "@/components/ui";
import type { ProjectSeed } from "@/types/research";

interface FeaturedProjectProps {
  project: ProjectSeed;
}

export function FeaturedProject({
  project,
}: FeaturedProjectProps): React.ReactElement {
  const resolvedPaperUrl =
    project.paperUrl && project.paperUrl !== "https://arxiv.org/"
      ? project.paperUrl
      : project.slug === "radle-benchmark"
        ? "https://arxiv.org/abs/2509.25559"
        : undefined;
  const paperStatus =
    project.paperStatus ??
    (resolvedPaperUrl?.startsWith("https://arxiv.org/abs/")
      ? "preprint"
      : undefined);

  return (
    <section className="py-8 lg:py-16">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div>
          <h2 className="mt-6 font-display text-4xl text-text-primary lg:text-5xl">
            Radiology&apos;s Last Exam (RadLE)
          </h2>
          <p className="mt-6 text-xl text-text-secondary">
            The benchmark that tested frontier AI against real radiologists —
            and found a 53-point gap.
          </p>
          <div className="mt-8 space-y-5 text-base leading-8 text-text-secondary">
            <p>
              RadLE was created to measure what most healthcare AI benchmarks do
              not: whether frontier multimodal systems can perform in the same
              reasoning environment as trained radiologists.
            </p>
            <p>
              Its key result reset expectations. Expert radiologists scored 83%,
              the best AI scored 57%, trainees scored 45%, and GPT-5 Thinking
              scored 30%.
            </p>
            <p>
              That matters because it marks the first time AI has clearly beaten
              trainees while still remaining too far from experts to justify
              careless clinical deployment.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            {resolvedPaperUrl ? (
              <Button
                href={resolvedPaperUrl}
                rel="noreferrer"
                target="_blank"
                variant="secondary"
              >
                Read the Paper
                {paperStatus === "preprint" ? (
                  <span className="ml-2 rounded-token-pill border border-border-default bg-bg-elevated px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-text-muted">
                    arXiv
                  </span>
                ) : null}
              </Button>
            ) : (
              <Button aria-disabled="true" disabled variant="outline">
                Pre-print Coming Soon
              </Button>
            )}
            <Button href="/research/radle-benchmark" variant="secondary">
              Explore the Benchmark
            </Button>
          </div>
          <p className="mt-6 text-sm uppercase tracking-[0.16em] text-text-tertiary">
            Dr. Suvrankar Datta et al. | RSNA 2025 Cutting Edge Oral
            Presentation | Ashoka University
          </p>
        </div>
        <div className="overflow-hidden rounded-token-sm">
          <Image
            alt="RadLE benchmark comparison visualization"
            className="h-auto w-full object-cover"
            height={1358}
            priority
            src="/radle-image.png"
            width={2000}
          />
        </div>
      </div>
    </section>
  );
}
