"use client";

import { useMemo, useState } from "react";

import type { PublicationEntry } from "@/types/research";

import { PublicationDocumentRow } from "@/components/sections/PublicationDocumentRow";

const TYPE_ORDER: PublicationEntry["type"][] = ["benchmark", "paper", "abstract", "talk"];

interface PublicationsStoryProps {
  publications: PublicationEntry[];
}

export function PublicationsStory({ publications }: PublicationsStoryProps): React.ReactElement {
  const [year, setYear] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const years = useMemo(() => {
    const unique = Array.from(new Set(publications.map((p) => String(p.year))));
    unique.sort((a, b) => Number(b) - Number(a));
    return ["all", ...unique];
  }, [publications]);

  const sorted = useMemo(() => {
    const ordered = TYPE_ORDER.flatMap((type) => publications.filter((p) => p.type === type));
    return ordered.filter(
      (p) =>
        (year === "all" || String(p.year) === year) &&
        (typeFilter === "all" || p.type === typeFilter),
    );
  }, [publications, year, typeFilter]);

  return (
    <div>
      <header className="flex flex-col gap-8 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between sm:pb-10">
        <div>
          <h2 className="font-display text-2xl text-text-primary lg:text-3xl">Documents</h2>
          <p className="mt-2 text-sm text-text-tertiary">
            {sorted.length} {sorted.length === 1 ? "publication" : "publications"}
          </p>
        </div>
        <div className="flex flex-wrap gap-5 sm:gap-6">
          <label className="flex min-w-[10rem] flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
            Year
            <select
              className="min-w-[10rem] border border-border bg-bg-surface px-4 py-2.5 text-sm font-normal normal-case tracking-normal text-text-primary"
              onChange={(event) => {
                setYear(event.target.value);
              }}
              value={year}
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {y === "all" ? "All years" : y}
                </option>
              ))}
            </select>
          </label>
          <label className="flex min-w-[10rem] flex-col gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-text-tertiary">
            Type
            <select
              className="min-w-[10rem] border border-border bg-bg-surface px-4 py-2.5 text-sm font-normal normal-case tracking-normal text-text-primary"
              onChange={(event) => {
                setTypeFilter(event.target.value);
              }}
              value={typeFilter}
            >
              <option value="all">All types</option>
              <option value="benchmark">Benchmark</option>
              <option value="paper">Paper</option>
              <option value="abstract">Abstract</option>
              <option value="talk">Talk</option>
            </select>
          </label>
        </div>
      </header>

      <div>
        {sorted.map((pub) => (
          <PublicationDocumentRow key={pub.id} publication={pub} />
        ))}
      </div>
    </div>
  );
}
