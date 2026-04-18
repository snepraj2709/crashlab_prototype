import Link from "next/link";

import type { PublicationEntry } from "@/types/research";

const TYPE_ORDER: PublicationEntry["type"][] = ["benchmark", "paper", "abstract", "talk"];

const TYPE_LABELS: Record<PublicationEntry["type"], string> = {
  benchmark: "Benchmarks",
  paper: "Research Papers",
  abstract: "Conference Abstracts",
  talk: "Talks & Presentations"
};

const TYPE_DESCRIPTIONS: Record<PublicationEntry["type"], string> = {
  benchmark: "Evaluation frameworks and datasets built to clinical standards — the infrastructure other researchers can build on.",
  paper: "Peer-reviewed and preprint research advancing clinical AI evaluation methodology.",
  abstract: "Accepted abstracts at leading radiology and AI conferences, representing the lab's breadth of clinical engagement.",
  talk: "Invited talks and presentations bringing CRASH Lab's work to clinical and research audiences worldwide."
};

interface PublicationsStoryProps {
  publications: PublicationEntry[];
}

export function PublicationsStory({ publications }: PublicationsStoryProps): React.ReactElement {
  const grouped = TYPE_ORDER.reduce<Record<string, PublicationEntry[]>>((acc, type) => {
    acc[type] = publications.filter((p) => p.type === type);
    return acc;
  }, {});

  return (
    <div className="space-y-20">
      {TYPE_ORDER.map((type) => {
        const entries = grouped[type];
        if (!entries.length) return null;

        return (
          <section key={type}>
            <div className="flex items-baseline gap-4">
              <h2 className="font-display text-3xl text-text-primary">{TYPE_LABELS[type]}</h2>
              <span className="rounded-full border border-border px-3 py-0.5 text-xs uppercase tracking-[0.15em] text-text-muted">
                {entries.length}
              </span>
            </div>
            <p className="mt-2 max-w-2xl text-text-secondary">{TYPE_DESCRIPTIONS[type]}</p>

            <div className="mt-8 space-y-4">
              {entries.map((pub) => (
                <div
                  className="rounded-token-md border border-border bg-bg-surface p-6 transition hover:border-accent-cyan"
                  key={pub.id}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs uppercase tracking-[0.18em] text-accent-cyan">
                          {pub.venue}
                        </span>
                        <span className="text-xs text-text-muted">{pub.year}</span>
                      </div>
                      <h3 className="mt-2 text-xl font-semibold text-text-primary">{pub.title}</h3>
                      <p className="mt-1 text-sm text-text-muted">
                        {pub.authors.join(", ")}
                      </p>
                      <p className="mt-3 text-text-secondary">{pub.summary}</p>
                    </div>
                    {pub.link ? (
                      <Link
                        className="shrink-0 self-start rounded-full border border-border px-4 py-2 text-sm text-text-primary transition hover:border-accent-cyan hover:text-accent-cyan"
                        href={pub.link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        Read →
                      </Link>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
