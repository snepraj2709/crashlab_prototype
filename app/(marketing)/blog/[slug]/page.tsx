import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BlogContent from "@/components/blog/BlogContent";
import { blogPosts } from "@/lib/data/blogPosts";
import type { ContentSection } from "@/lib/data/blogTypes";

function slugify(text: string): string {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

function CategoryBadge({ category }: { category: string }): React.ReactElement {
  return (
    <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent-cyan">
      {category}
    </span>
  );
}

function InitialsCircle({
  initials,
  size = 40,
  title
}: {
  initials: string;
  size?: number;
  title?: string;
}): React.ReactElement {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-full border border-border font-medium text-text-secondary"
      style={{ width: size, height: size, fontSize: size <= 28 ? 11 : 14 }}
      title={title}
    >
      {initials}
    </span>
  );
}

export function generateStaticParams(): Array<{ slug: string }> {
  return blogPosts
    .filter((p) => p.content.length > 0)
    .map((p) => ({ slug: p.id }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = blogPosts.find((p) => p.id === params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | CRASH Lab`,
    description: post.tldr ?? post.description ?? "",
    openGraph: {
      title: post.title,
      description: post.tldr ?? post.description ?? ""
    }
  };
}

export default function BlogPostPage({
  params
}: {
  params: { slug: string };
}): React.ReactElement {
  const post = blogPosts.find((p) => p.id === params.slug);
  if (!post || post.content.length === 0) notFound();

  const readablePosts = blogPosts.filter((p) => p.content.length > 0);
  const currentIndex = readablePosts.findIndex((p) => p.id === params.slug);
  const prevPost = currentIndex > 0 ? readablePosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < readablePosts.length - 1 ? readablePosts[currentIndex + 1] : null;

  const headings = post.content.filter(
    (s): s is ContentSection & { content: string } =>
      s.type === "heading" && typeof s.content === "string"
  );

  const hasMultipleAuthors = post.authors && post.authors.length > 1;

  return (
    <div className="pt-32">
      <article className="py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link
            className="text-sm text-accent-cyan transition hover:opacity-75"
            href="/blog"
          >
            ← Back to Blog
          </Link>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_300px]">
            {/* LEFT — main article */}
            <div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-text-tertiary">
                <CategoryBadge category={post.category} />
                <span>·</span>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>

              <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-text-primary lg:text-5xl">
                {post.title}
              </h1>

              {post.subtitle ? (
                <p className="mt-3 text-xl text-text-secondary">{post.subtitle}</p>
              ) : null}

              {/* Author block */}
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <InitialsCircle initials={post.author.initials} size={40} />
                  <div>
                    <p className="text-sm font-medium text-text-primary">{post.author.name}</p>
                    {post.author.role ? (
                      <p className="text-xs text-text-tertiary">{post.author.role}</p>
                    ) : null}
                  </div>
                </div>
                {hasMultipleAuthors ? (
                  <div className="mt-4">
                    <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Authors</p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {post.authors!.map((author) => (
                        <InitialsCircle
                          initials={author.initials}
                          key={author.name}
                          size={28}
                          title={author.name}
                        />
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* TL;DR */}
              {post.tldr ? (
                <div className="mt-8 border-l-2 border-accent-cyan py-1 pl-4 pr-4">
                  <p className="mb-2 text-xs uppercase tracking-[0.2em] text-accent-cyan">TL;DR</p>
                  <p className="text-sm leading-relaxed text-text-secondary">{post.tldr}</p>
                </div>
              ) : null}

              {/* Featured image */}
              {post.featuredImage ? (
                <div className="relative mt-8 aspect-video w-full overflow-hidden rounded-token-md">
                  <Image
                    alt={post.imageAlt ?? post.title}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 65vw, 100vw"
                    src={post.featuredImage}
                  />
                  {post.imageOverlay ? (
                    <div className="absolute bottom-4 left-4">
                      {post.imageOverlay.badge ? (
                        <span className="rounded-full bg-bg-primary/80 px-2 py-1 text-xs text-text-primary">
                          {post.imageOverlay.badge}
                        </span>
                      ) : null}
                      {post.imageOverlay.stat ? (
                        <div className="mt-2 rounded-token-sm bg-bg-primary/80 px-3 py-2">
                          <p className="text-xs text-text-tertiary">
                            {post.imageOverlay.stat.label}
                          </p>
                          <p className="text-2xl font-semibold text-text-primary">
                            {post.imageOverlay.stat.value}
                          </p>
                          <p className="text-xs text-text-tertiary">
                            {post.imageOverlay.stat.sublabel}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              ) : null}

              {/* Article body */}
              <div className="mt-10">
                <BlogContent content={post.content} />
              </div>

              {/* Prev / Next */}
              {prevPost ?? nextPost ? (
                <div className="mt-16">
                  <p className="mb-6 text-xs uppercase tracking-[0.2em] text-text-tertiary">
                    Continue reading
                  </p>
                  <div className="grid grid-cols-1 gap-8 border-t border-border pt-8 md:grid-cols-2 md:divide-x md:divide-border">
                    {prevPost ? (
                      <Link
                        className="transition hover:opacity-75 md:pr-8"
                        href={`/blog/${prevPost.id}`}
                      >
                        <p className="text-xs text-text-tertiary">← Previous</p>
                        <div className="mt-3">
                          <CategoryBadge category={prevPost.category} />
                        </div>
                        <p className="mt-2 line-clamp-2 text-lg font-medium text-text-primary">
                          {prevPost.title}
                        </p>
                        <p className="mt-2 text-xs text-text-tertiary">{prevPost.date}</p>
                      </Link>
                    ) : (
                      <div />
                    )}
                    {nextPost ? (
                      <Link
                        className="text-left transition hover:opacity-75 md:pl-8 md:text-right"
                        href={`/blog/${nextPost.id}`}
                      >
                        <p className="text-xs text-text-tertiary">Next →</p>
                        <div className="mt-3 flex md:justify-end">
                          <CategoryBadge category={nextPost.category} />
                        </div>
                        <p className="mt-2 line-clamp-2 text-lg font-medium text-text-primary">
                          {nextPost.title}
                        </p>
                        <p className="mt-2 text-xs text-text-tertiary">{nextPost.date}</p>
                      </Link>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>

            {/* RIGHT — sidebar */}
            <aside className="sticky top-8 space-y-8 self-start">
              {/* Table of contents */}
              {headings.length > 0 ? (
                <div className="border-t border-border pt-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">In this post</p>
                  <div className="mt-4 space-y-3">
                    {headings.map((s) => (
                      <a
                        className="block text-sm text-text-secondary transition hover:text-accent-cyan hover:underline"
                        href={`#${slugify(s.content)}`}
                        key={s.content}
                      >
                        {s.content}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Multiple authors list */}
              {hasMultipleAuthors ? (
                <div className="border-t border-border pt-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Authors</p>
                  <div className="mt-4 space-y-3">
                    {post.authors!.map((author) => (
                      <div className="flex items-center gap-2" key={author.name}>
                        <InitialsCircle initials={author.initials} size={32} />
                        <span className="text-sm text-text-secondary">{author.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* CTA */}
              <div className="border-t border-border pt-5">
                <p className="text-sm font-medium text-text-primary">Join CRASH Lab</p>
                <p className="mt-2 text-xs leading-relaxed text-text-secondary">
                  We have open positions for researchers and clinical collaborators.
                </p>
                <Link
                  className="mt-4 inline-block text-sm text-accent-cyan transition hover:opacity-75"
                  href="/join"
                >
                  View open roles →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </div>
  );
}
