import Link from "next/link";
import type { ReactNode } from "react";

import type { CalloutData, ContentSection, TableData } from "@/lib/data/blogTypes";

function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    const lines = part.split("\n");
    return lines.map((line, j) => (
      <span key={`${i}-${j}`}>
        {line}
        {j < lines.length - 1 ? <br /> : null}
      </span>
    ));
  });
}

function TextSection({ content }: { content: string }): React.ReactElement {
  return (
    <p className="mt-5 text-base leading-8 text-text-secondary">
      {renderInline(content)}
    </p>
  );
}

function HeadingSection({ content }: { content: string }): React.ReactElement {
  return (
    <h2
      className="mt-10 font-display text-2xl text-text-primary"
      id={slugify(content)}
    >
      {content}
    </h2>
  );
}

function ListSection({ items }: { items: string[] }): React.ReactElement {
  return (
    <ul className="mt-5 space-y-2">
      {items.map((item, i) => (
        <li className="flex gap-2 text-base leading-relaxed text-text-secondary" key={i}>
          <span className="mt-1.5 size-1.5 shrink-0 rounded-none bg-accent-cyan" />
          <span>{renderInline(item)}</span>
        </li>
      ))}
    </ul>
  );
}

function TableSection({ data }: { data: TableData }): React.ReactElement {
  return (
    <div className="mt-6 overflow-x-auto rounded-token-sm border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            {data.headers.map((h) => (
              <th
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-tertiary"
                key={h}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr
              className={`border-b border-border last:border-0 ${
                row.highlight
                  ? "font-medium text-text-primary"
                  : "text-text-secondary"
              }`}
              key={i}
            >
              {row.cells.map((cell, j) => (
                <td className="px-4 py-3" key={j}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CalloutSection({ data }: { data: CalloutData }): React.ReactElement {
  return (
    <div className="mt-8 border-l-2 border-accent-cyan pl-4">
      <p className="font-medium text-text-primary">{data.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{data.description}</p>
      {data.buttonText && data.buttonLink ? (
        <Link
          className="mt-4 inline-block text-sm text-accent-cyan transition hover:opacity-75"
          href={data.buttonLink}
        >
          {data.buttonText}
        </Link>
      ) : null}
    </div>
  );
}

interface BlogContentProps {
  content: ContentSection[];
}

export default function BlogContent({ content }: BlogContentProps): React.ReactElement {
  return (
    <div>
      {content.map((section, i) => {
        switch (section.type) {
          case "heading":
            return <HeadingSection content={section.content as string} key={i} />;
          case "text":
            return <TextSection content={section.content as string} key={i} />;
          case "list":
            return <ListSection items={section.content as string[]} key={i} />;
          case "table":
            return <TableSection data={section.content as TableData} key={i} />;
          case "callout":
            return <CalloutSection data={section.content as CalloutData} key={i} />;
          case "image":
            return null;
          default:
            return null;
        }
      })}
    </div>
  );
}
