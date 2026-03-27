import Image from "next/image";
import Link from "next/link";

import { Button, Card, SectionLabel } from "@/components/ui";
import type { SitePost } from "@/lib/content/site";
import { formatDate } from "@/lib/utils/formatDate";

interface BlogPreviewProps {
  posts: SitePost[];
}

const CATEGORY_COVERS: Record<string, string> = {
  "benchmark-update": "/og/benchmark-update.svg",
  "research-paper": "/og/research-paper.svg",
  "lab-news": "/og/lab-news.svg",
  "industry-insight": "/og/research-paper.svg",
  policy: "/og/lab-news.svg",
};

function getCoverSrc(post: SitePost): string {
  const explicitCover = post.coverImage?.url;

  if (explicitCover && explicitCover !== "/og/default.svg") {
    return explicitCover;
  }

  return (
    (post.category ? CATEGORY_COVERS[post.category] : undefined) ||
    "/og/default.svg"
  );
}

export function BlogPreview({ posts }: BlogPreviewProps): React.ReactElement {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel number="06" text="News" />
            <h2 className="mt-6 font-display text-4xl text-text-primary lg:text-5xl">
              Research updates. Benchmark changes. What we&apos;re learning in
              the field.
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)]">
              Written by the researchers and clinicians at CRASH Lab — for
              anyone making decisions about healthcare AI.
            </p>
          </div>
          <div>
            <Button href="/news" variant="secondary">
              All News
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <Link href={`/news/${post.slug}`} key={post._id}>
              <Card className="h-full transition hover:border-accent-cyan">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-border">
                  <Image
                    alt={`Cover image for ${post.title}`}
                    className="object-cover"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    src={getCoverSrc(post)}
                  />
                </div>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <span className="border-accent-cyan/30 bg-accent-cyan/10 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent-cyan">
                    {post.category?.replace(/-/g, " ") || "Update"}
                  </span>
                  <span className="text-sm text-text-tertiary">
                    {formatDate(post.publishedAt)}
                  </span>
                </div>
                <h3 className="mt-4 line-clamp-2 text-2xl font-semibold text-text-primary">
                  {post.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-text-secondary">
                  {post.excerpt}
                </p>
                <p className="mt-5 text-sm text-text-tertiary">
                  {post.author?.name || "CRASH Lab"}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
