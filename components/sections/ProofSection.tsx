import { ArrowRight, ArrowUpRight } from "lucide-react";

const metrics = [
  { value: "15+", label: "Papers at top venues" },
  { value: "6", label: "RSNA 2025 accepted abstracts" },
  { value: "#1", label: "Indian lab by AI abstracts at RSNA 2025" },
  { value: "< 8mo", label: "Zero to 15 papers since April 2025" },
];

const publications = [
  {
    tag: "Paper · 2025",
    title: "RadLE: A reasoning benchmark for radiology",
    venue: "arXiv · RSNA 2025 Cutting Edge",
    href: "https://arxiv.org/abs/2509.25559",
  },
  {
    tag: "Paper · 2025",
    title: "Failure modes of multimodal AI on Indian chest radiographs",
    venue: "RSNA 2025 · accepted abstract",
    href: "#",
  },
  {
    tag: "Paper · 2024",
    title: "Clinical truth cards: grounding model claims in radiologist judgment",
    venue: "MICCAI workshop",
    href: "#",
  },
  {
    tag: "Preprint · 2025",
    title: "Inter-rater disagreement as the ceiling on AI reasoning",
    venue: "Under review",
    href: "#",
  },
];

export function ProofSection(): React.ReactElement {
  return (
    <section className="border-t border-border py-16 lg:py-24" id="publications">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:items-end">
          <div>
            <h2 className="mt-6 font-display text-4xl text-text-primary lg:text-5xl">
              Numbers, not narrative.
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-8 text-text-secondary lg:justify-self-end">
            Four research pillars: data, benchmarks, design, models. The work moves on a clock
            short enough to matter and a standard high enough to hold up.
          </p>
        </div>

        <div className="mt-12 border-y border-border">
          <div className="grid gap-6 py-6 md:grid-cols-4 md:divide-x md:divide-border">
            {metrics.map((metric) => (
              <div className="pr-6 md:px-6 md:first:pl-0 md:last:pr-0" key={metric.label}>
                <p className="font-mono text-3xl text-text-primary md:text-4xl">{metric.value}</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">{metric.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
            <p className="text-xs uppercase tracking-[0.2em] text-text-tertiary">
              Selected publications
            </p>
            <a
              className="inline-flex items-center gap-1.5 text-sm text-accent-cyan transition hover:opacity-75"
              href="/publications"
            >
              View all 15 <ArrowRight className="size-3.5" />
            </a>
          </div>

          <div>
            {publications.map((publication) => (
              <a
                className="grid gap-4 border-b border-border py-6 text-inherit no-underline transition hover:opacity-75 md:grid-cols-[10rem_minmax(0,1fr)_14rem_2rem] md:items-center"
                href={publication.href}
                key={publication.title}
                rel={publication.href.startsWith("http") ? "noopener noreferrer" : undefined}
                target={publication.href.startsWith("http") ? "_blank" : undefined}
              >
                <span className="text-xs uppercase tracking-[0.14em] text-text-tertiary">
                  {publication.tag}
                </span>
                <span className="text-base font-medium leading-snug text-text-primary">
                  {publication.title}
                </span>
                <span className="text-sm text-text-secondary md:text-right">{publication.venue}</span>
                <span className="hidden justify-self-end text-text-tertiary md:flex">
                  <ArrowUpRight className="size-3.5" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
