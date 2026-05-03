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

  const titleNode = (
    <h2 className="font-display text-xl font-semibold leading-snug tracking-tight text-text-primary sm:text-2xl">
      {pub.title}
    </h2>
  );

  return (
    <article className="border-b border-border py-8 last:border-b-0 lg:py-10">
      {pub.link ? (
        <Link
          className="ui-focus-ring group block transition-opacity hover:opacity-75"
          href={pub.link}
          rel="noopener noreferrer"
          target="_blank"
        >
          {titleNode}
        </Link>
      ) : (
        titleNode
      )}

      <div className="mt-3 text-[0.9375rem] leading-[1.7] text-text-secondary">
        <p>
          {needsMore && !expanded ? short : pub.summary}
          {needsMore ? (
            <>
              {" "}
              <button
                aria-expanded={expanded}
                className="ui-focus-ring inline p-0 text-sm text-text-tertiary underline underline-offset-2 transition hover:text-text-primary"
                onClick={() => setExpanded((v) => !v)}
                type="button"
              >
                {expanded ? "less" : "more"}
              </button>
            </>
          ) : null}
        </p>
      </div>

      <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-text-tertiary">
        <span>
          <span className="text-text-tertiary">by </span>
          <span className="text-text-secondary">{pub.authors.join(", ")}</span>
        </span>
        <span aria-hidden="true">·</span>
        <span>{pub.venue}</span>
        <span aria-hidden="true">·</span>
        <span>{pub.year}</span>
        <span aria-hidden="true">·</span>
        <span className="text-xs font-medium uppercase tracking-wide">{TYPE_LABELS[pub.type]}</span>
        {pub.tags.length ? (
          <>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span className="hidden text-text-secondary sm:inline">
              {pub.tags.map((tag) => tag.replace(/-/g, " ")).join(", ")}
            </span>
          </>
        ) : null}
      </p>
    </article>
  );
}
