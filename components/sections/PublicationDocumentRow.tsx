"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import type { PublicationEntry } from "@/types/research";

const TEASER_MAX = 280;

const TYPE_LABELS: Record<PublicationEntry["type"], string> = {
  benchmark: "Benchmark",
  paper: "Paper",
  abstract: "Abstract",
  talk: "Talk",
};

function splitTeaser(summary: string): { short: string; needsMore: boolean } {
  if (summary.length <= TEASER_MAX) {
    return { short: summary, needsMore: false };
  }
  const slice = summary.slice(0, TEASER_MAX);
  const lastSpace = slice.lastIndexOf(" ");
  const end = lastSpace > TEASER_MAX * 0.55 ? lastSpace : TEASER_MAX;
  return { short: `${summary.slice(0, end).trimEnd()}…`, needsMore: true };
}

export function PublicationDocumentRow({
  publication: pub,
}: {
  publication: PublicationEntry;
}): React.ReactElement {
  const [expanded, setExpanded] = useState(false);
  const { short, needsMore } = useMemo(() => splitTeaser(pub.summary), [pub.summary]);

  const titleClass =
    "block text-xl font-normal leading-[1.35] text-navy-900 underline decoration-transparent underline-offset-[3px] transition-colors group-hover:text-accent-cyan group-hover:decoration-accent-cyan/50 sm:text-2xl sm:leading-snug";

  return (
    <article className="border-b border-border py-10 last:border-b-0 lg:py-12">
      {pub.link ? (
        <Link
          className="ui-focus-ring group block"
          href={pub.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          <h2 className="font-display font-semibold tracking-tight">
            <span className={titleClass}>{pub.title}</span>
          </h2>
        </Link>
      ) : (
        <h2 className="font-display text-xl font-semibold leading-[1.35] tracking-tight text-navy-900 sm:text-2xl sm:leading-snug">
          {pub.title}
        </h2>
      )}

      <div className="mt-5 text-[0.9375rem] leading-[1.75] text-text-secondary sm:text-base lg:mt-6">
        <p>
          {needsMore && !expanded ? short : pub.summary}
          {needsMore ? (
            <>
              {" "}
              <button
                aria-expanded={expanded}
                className="ui-focus-ring inline p-0 text-sm font-semibold text-accent-cyan underline decoration-transparent underline-offset-2 transition hover:text-text-primary hover:decoration-current"
                onClick={() => {
                  setExpanded((v) => !v);
                }}
                type="button"
              >
                {expanded ? "less" : "more"}
              </button>
            </>
          ) : null}
        </p>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-text-secondary sm:mt-6">
        <span className="text-text-tertiary">by </span>
        {pub.authors.join(", ")}
      </p>

      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm text-text-tertiary sm:mt-5">
        <span>{pub.venue}</span>
        <span aria-hidden="true">
          ·
        </span>
        <span>{pub.year}</span>
        <span aria-hidden="true">
          ·
        </span>
        <span className="border border-border px-1.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-text-tertiary">
          {TYPE_LABELS[pub.type]}
        </span>
        {pub.tags.length ? (
          <>
            <span aria-hidden="true" className="hidden sm:inline">
              ·
            </span>
            <span className="max-w-full sm:inline">
              {pub.tags.map((tag, i) => (
                <span key={tag}>
                  {i > 0 ? ", " : null}
                  <span className="text-text-secondary">
                    {tag.replace(/-/g, " ")}
                  </span>
                </span>
              ))}
            </span>
          </>
        ) : null}
      </p>
    </article>
  );
}
