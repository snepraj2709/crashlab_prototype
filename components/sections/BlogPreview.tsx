import Image from "next/image";
import Link from "next/link";

import { Button, Card, SectionLabel } from "@/components/ui";
import type { SitePost } from "@/lib/content/site";
import { formatDate } from "@/lib/utils/formatDate";

interface BlogPreviewProps {
  posts: SitePost[];
}

export function BlogPreview({ posts }: BlogPreviewProps): React.ReactElement {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel number="06" text="From the Lab" />
            <h2 className="mt-6 font-display text-4xl text-white lg:text-5xl">
              Context for the people building, validating, and funding healthcare AI.
            </h2>
          </div>
          <div>
            <Button href="/blog" variant="secondary">
              All Posts
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <Link href={`/blog/${post.slug}`} key={post._id}>
              <Card className="h-full transition hover:border-accent-cyan">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] border border-white/10">
                  <Image
                    alt={post.title}
                    className="object-cover"
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    src="/og/default.svg"
                  />
                </div>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent-cyan">
                    {post.category?.replace(/-/g, " ") || "Update"}
                  </span>
                  <span className="text-sm text-text-tertiary">{formatDate(post.publishedAt)}</span>
                </div>
                <h3 className="mt-4 line-clamp-2 text-2xl font-semibold text-white">{post.title}</h3>
                <p className="mt-3 line-clamp-2 text-text-secondary">{post.excerpt}</p>
                <p className="mt-5 text-sm text-text-tertiary">{post.author?.name || "CRASH Lab"}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
