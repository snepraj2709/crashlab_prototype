import { cn } from "@/lib/utils/cn";
import { extractHeadings } from "@/lib/utils/portableText";
import type { PortableTextBlock } from "@/types/research";

interface PortableTextContentProps {
  blocks: PortableTextBlock[] | undefined;
  className?: string;
}

export function PortableTextContent({
  blocks,
  className
}: PortableTextContentProps): React.ReactElement | null {
  if (!blocks?.length) {
    return null;
  }

  const headings = extractHeadings(blocks);
  const headingMap = new Map(headings.map((entry) => [entry.text, entry.id]));

  return (
    <div className={cn("prose prose-invert max-w-none prose-p:text-text-secondary", className)}>
      {blocks.map((block) => {
        const text = block.children.map((child) => child.text).join("");

        if (block.style === "h2") {
          return (
            <h2
              className="mt-12 scroll-mt-32 font-display text-3xl text-white"
              id={headingMap.get(text)}
              key={block._key}
            >
              {text}
            </h2>
          );
        }

        if (block.style === "h3") {
          return (
            <h3
              className="mt-8 scroll-mt-32 text-2xl font-semibold text-white"
              id={headingMap.get(text)}
              key={block._key}
            >
              {text}
            </h3>
          );
        }

        if (block.style === "blockquote") {
          return (
            <blockquote
              className="border-l-2 border-accent-cyan pl-4 text-xl text-white/90"
              key={block._key}
            >
              {text}
            </blockquote>
          );
        }

        return (
          <p className="text-base leading-8 text-text-secondary lg:text-lg" key={block._key}>
            {text}
          </p>
        );
      })}
    </div>
  );
}
