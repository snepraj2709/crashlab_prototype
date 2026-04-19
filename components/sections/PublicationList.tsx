"use client";

import { useMemo, useState } from "react";
import type { PublicationEntry } from "@/types/research";

interface PublicationListProps {
  publications: PublicationEntry[];
}

export function PublicationList({
  publications
}: PublicationListProps): React.ReactElement {
  const [year, setYear] = useState<string>("all");
  const [venue, setVenue] = useState<string>("all");

  const years = useMemo(
    () => ["all", ...Array.from(new Set(publications.map((publication) => String(publication.year))))],
    [publications]
  );
  const venues = useMemo(
    () => ["all", ...Array.from(new Set(publications.map((publication) => publication.venue)))],
    [publications]
  );

  const filtered = useMemo(
    () =>
      publications.filter(
        (publication) =>
          (year === "all" || String(publication.year) === year) &&
          (venue === "all" || publication.venue === venue)
      ),
    [publications, venue, year]
  );

  return (
    <section className="py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mt-8 flex flex-wrap gap-4">
          <select
            className="rounded-full border border-border bg-bg-surface px-4 py-3 text-sm text-text-primary"
            onChange={(event) => setYear(event.target.value)}
            value={year}
          >
            {years.map((entry) => (
              <option key={entry} value={entry}>
                {entry === "all" ? "All years" : entry}
              </option>
            ))}
          </select>
          <select
            className="rounded-full border border-border bg-bg-surface px-4 py-3 text-sm text-text-primary"
            onChange={(event) => setVenue(event.target.value)}
            value={venue}
          >
            {venues.map((entry) => (
              <option key={entry} value={entry}>
                {entry === "all" ? "All venues" : entry}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8">
          {filtered.map((publication) => (
            <div className="grid gap-4 border-b border-border py-6 lg:grid-cols-[180px_1fr_auto]" key={publication.id}>
              <div>
                <p className="font-mono text-sm text-accent-cyan">{publication.year}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.16em] text-text-tertiary">
                  {publication.venue}
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-text-primary">{publication.title}</h3>
                <p className="mt-3 max-w-3xl text-text-secondary">{publication.summary}</p>
              </div>
              <div className="lg:text-right">
                {publication.link ? (
                  <a
                    className="text-sm font-medium text-accent-cyan transition hover:opacity-75"
                    href={publication.link}
                    rel="noreferrer"
                    target="_blank"
                  >
                    Read →
                  </a>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
