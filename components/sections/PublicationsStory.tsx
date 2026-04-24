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
          <article className="border-b border-border last:border-b-0" key={pub.id}>
            {pub.link ? (
              <Link
                className="ui-focus-ring group block rounded-2xl py-6 pr-4 transition-[background-color,transform] duration-200 hover:bg-bg-elevated active:scale-[0.998] sm:pr-6 lg:py-8"
                href={pub.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(10rem,0.35fr)] lg:items-start lg:gap-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-text-tertiary">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
                        {pub.venue}
                      </span>
                      <span aria-hidden="true" className="text-[11px] font-bold text-text-tertiary">·</span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
                        {pub.year}
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      <h3 className="pr-8 text-lg font-display font-semibold leading-snug text-navy-900 transition-colors group-hover:text-brand-blue md:text-xl">
                        {pub.title}
                      </h3>

                      <p className="text-[0.9375rem] leading-7 text-text-secondary">
                        {pub.authors.join(", ")}
                      </p>

                      <p className="max-w-3xl text-[0.9375rem] leading-7 text-text-secondary">
                        {pub.summary}
                      </p>

                      <span className="inline-block rounded border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-text-tertiary">
                        {TYPE_LABELS[pub.type]}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start justify-between gap-4 border-t border-border pt-4 lg:block lg:border-t-0 lg:pt-0 lg:text-right">
                    <span className="text-sm text-accent-cyan transition-colors duration-200 group-hover:text-brand-blue">
                      Read →
                    </span>
                  </div>
                </div>
              </Link>
            ) : (
              <div className="py-6 lg:py-8">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(10rem,0.35fr)] lg:items-start lg:gap-10">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 text-text-tertiary">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
                        {pub.venue}
                      </span>
                      <span aria-hidden="true" className="text-[11px] font-bold text-text-tertiary">·</span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-text-tertiary">
                        {pub.year}
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      <h3 className="pr-8 text-lg font-display font-semibold leading-snug text-navy-900 md:text-xl">
                        {pub.title}
                      </h3>

                      <p className="text-[0.9375rem] leading-7 text-text-secondary">
                        {pub.authors.join(", ")}
                      </p>

                      <p className="max-w-3xl text-[0.9375rem] leading-7 text-text-secondary">
                        {pub.summary}
                      </p>

                      <span className="inline-block rounded border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-text-tertiary">
                        {TYPE_LABELS[pub.type]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
