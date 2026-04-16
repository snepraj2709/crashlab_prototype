import type { PortableTextBlock } from "@/types/content";

export interface HeadingEntry {
  id: string;
  level: 2 | 3;
  text: string;
}

export function extractHeadings(blocks: PortableTextBlock[] | undefined): HeadingEntry[] {
  if (!blocks) {
    return [];
  }

  return blocks.flatMap((block) => {
    if (block.style !== "h2" && block.style !== "h3") {
      return [];
    }

    const text = block.children.map((child) => child.text).join("").trim();

    if (!text) {
      return [];
    }

    return [
      {
        id: text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        level: block.style === "h2" ? 2 : 3,
        text
      }
    ];
  });
}

export function calculateReadingTime(blocks: PortableTextBlock[] | undefined): number {
  if (!blocks?.length) {
    return 1;
  }

  const wordCount = blocks
    .flatMap((block) => block.children)
    .map((child) => child.text)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / 180));
}
