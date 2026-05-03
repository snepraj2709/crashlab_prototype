"use client";

import { useMemo } from "react";

import type { PublicationEntry } from "@/types/research";

import { PublicationDocumentRow } from "@/components/sections/PublicationDocumentRow";

const TYPE_ORDER: PublicationEntry["type"][] = ["benchmark", "paper", "abstract", "talk"];

interface PublicationsStoryProps {
  publications: PublicationEntry[];
  year: string;
  typeFilter: string;
}

export function PublicationsStory({ publications, year, typeFilter }: PublicationsStoryProps): React.ReactElement {
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
      {sorted.map((pub) => (
        <PublicationDocumentRow key={pub.id} publication={pub} />
      ))}
    </div>
  );
}
