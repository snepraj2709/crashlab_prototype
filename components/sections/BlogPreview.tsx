import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui";
import { formatDate } from "@/lib/utils/formatDate";
import type { SitePost, SitePostCategory } from "@/types/site";

interface BlogPreviewProps {
  posts: SitePost[];
}

const CATEGORY_COVERS: Record<SitePostCategory, string> = {
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
    <section className="py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="mt-6 font-display text-4xl text-text-primary lg:text-5xl">
              Research updates. Benchmark changes. What we&apos;re learning in
              the field.
            </h2>
            <p className="mt-4 text-text-muted">
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

        <div className="mt-12">
          {posts.slice(0, 3).map((post) => (
            <Link className="block border-b border-border py-6 transition hover:opacity-75" href={`/news/${post.slug}`} key={post._id}>
              <div className="grid gap-6 lg:grid-cols-[12rem_minmax(0,1fr)] lg:items-start">
                <div className="relative aspect-[16/10] overflow-hidden rounded-token-sm">
                  <Image
                    alt={`Cover image for ${post.title}`}
                    className="object-cover"
                    fill
                    sizes="(max-width: 1024px) 100vw, 16rem"
                    src={getCoverSrc(post)}
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="ui-status-badge border-status-info-border bg-status-info-surface text-status-info-text">
                      {post.category?.replace(/-/g, " ") || "Update"}
                    </span>
                    <span className="text-sm text-text-tertiary">
                      {formatDate(post.publishedAt)}
                    </span>
                  </div>
                  <h3 className="mt-4 line-clamp-2 text-2xl font-medium text-text-default">
                    {post.title}
                  </h3>
                  <p className="mt-3 line-clamp-2 text-text-muted">
                    {post.excerpt}
                  </p>
                  <p className="mt-5 text-sm text-text-tertiary">
                    {post.author?.name || "CRASH Lab"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
