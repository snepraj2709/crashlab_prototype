import Link from "next/link";

import type { PublicationEntry } from "@/types/research";

const TYPE_ORDER: PublicationEntry["type"][] = ["benchmark", "paper", "abstract", "talk"];

const TYPE_LABELS: Record<PublicationEntry["type"], string> = {
  benchmark: "Benchmark",
  paper: "Paper",
  abstract: "Abstract",
  talk: "Talk"
};

interface PublicationsStoryProps {
  publications: PublicationEntry[];
}

export function PublicationsStory({ publications }: PublicationsStoryProps): React.ReactElement {
  const sorted = TYPE_ORDER.flatMap((type) =>
    publications.filter((p) => p.type === type)
  );

  return (
    <div>
      <div className="flex items-baseline gap-4">
        <h2 className="font-display text-3xl text-text-primary">Papers &amp; Presentations</h2>
        <span className="rounded-full border border-border px-3 py-0.5 text-xs uppercase tracking-[0.15em] text-text-muted">
          {sorted.length}
        </span>
      </div>

      <div className="mt-8 space-y-0">
        {sorted.map((pub) => (
          <div className="border-b border-border py-6" key={pub.id}>
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs uppercase tracking-[0.18em] text-accent-cyan">
                    {pub.venue}
                  </span>
                  <span className="text-xs text-text-muted">{pub.year}</span>
                </div>
                <h3 className="mt-2 text-xl font-semibold text-text-primary">{pub.title}</h3>
                <p className="mt-1 text-sm text-text-muted">{pub.authors.join(", ")}</p>
                <p className="mt-3 text-text-secondary">{pub.summary}</p>
                <span className="mt-4 inline-block rounded border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-text-tertiary">
                  {TYPE_LABELS[pub.type]}
                </span>
              </div>
              {pub.link ? (
                <Link
                  className="shrink-0 self-start text-sm text-accent-cyan transition hover:opacity-75"
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
    </div>
  );
}
