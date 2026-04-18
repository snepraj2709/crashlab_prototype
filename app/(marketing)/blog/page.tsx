import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { EmptyState, SectionLabel } from "@/components/ui";
import { getBlogPosts, getNewsPosts } from "@/lib/content/site";
import { formatDate } from "@/lib/utils/formatDate";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog — CRASH Lab",
  description:
    "Long-form writing from CRASH Lab on clinical AI, benchmarking, healthcare systems, and responsible deployment."
};

export default async function BlogPage(): Promise<React.ReactElement> {
  const posts = await getBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <div className="pt-32">
      <section className="py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel number="01" text="Blog" />
          <h1 className="mt-6 font-display text-5xl text-text-primary lg:text-6xl">
            Thinking out loud.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-secondary">
            Long-form writing on clinical AI, benchmarking methodology, healthcare systems, and
            what responsible deployment actually looks like.
          </p>

          {featured ? (
            <Link className="mt-12 block" href={`/blog/${featured.slug}`}>
              <div className="grid gap-8 rounded-token-md border border-border bg-bg-surface p-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <span className="border-accent-cyan/30 bg-accent-cyan/10 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent-cyan">
                    Featured
                  </span>
                  <h2 className="mt-6 font-display text-4xl text-text-primary">{featured.title}</h2>
                  <p className="mt-4 max-w-3xl text-text-secondary">{featured.excerpt}</p>
                  <p className="mt-6 text-sm text-text-tertiary">
                    {featured.author?.name || "CRASH Lab"} · {formatDate(featured.publishedAt)}
                  </p>
                </div>
                <div className="relative aspect-[16/10] overflow-hidden rounded-token-sm border border-border">
                  <Image
                    alt={`Cover for ${featured.title}`}
                    className="object-cover"
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    src={featured.coverImage?.url || "/og/default.svg"}
                  />
                </div>
              </div>
            </Link>
          ) : (
            <div className="mt-12">
              <EmptyState
                body="Blog posts with postType='blog' will appear here. Add them in Sanity Studio."
                title="No blog posts yet."
              />
            </div>
          )}

          {rest.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {rest.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post._id}>
                  <div className="h-full rounded-token-md border border-border bg-bg-surface p-6 transition hover:border-accent-cyan">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-token-sm border border-border">
                      <Image
                        alt={`Cover for ${post.title}`}
                        className="object-cover"
                        fill
                        sizes="(max-width: 1280px) 50vw, 33vw"
                        src={post.coverImage?.url || "/og/default.svg"}
                      />
                    </div>
                    <h3 className="mt-5 line-clamp-2 text-2xl font-semibold text-text-primary">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-text-secondary">{post.excerpt}</p>
                    <p className="mt-5 text-sm text-text-tertiary">
                      {post.author?.name || "CRASH Lab"} · {formatDate(post.publishedAt)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
