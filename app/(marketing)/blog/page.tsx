import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/lib/data/blogPosts";

export const metadata: Metadata = {
  title: "Blog | CRASH Lab",
  description: "Research updates, benchmark findings, and clinical AI insights from CRASH Lab."
};

function InitialsCircle({ initials, size = 36 }: { initials: string; size?: number }): React.ReactElement {
  const cls = size === 28
    ? "flex size-7 items-center justify-center rounded-full border border-border text-xs font-medium text-text-secondary"
    : "flex items-center justify-center rounded-full border border-border text-sm font-medium text-text-secondary";
  return (
    <span className={cls} style={size !== 28 ? { width: size, height: size } : undefined}>
      {initials}
    </span>
  );
}

function CategoryBadge({ category }: { category: string }): React.ReactElement {
  return (
    <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent-cyan">
      {category}
    </span>
  );
}

export default function BlogPage(): React.ReactElement {
  const postsWithContent = blogPosts.filter((p) => p.content.length > 0);
  const papersOnly = blogPosts.filter((p) => p.content.length === 0 && p.link);

  const featuredPost = postsWithContent[0];
  const remainingPosts = postsWithContent.slice(1);

  return (
    <div>
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="mt-6 font-display text-5xl text-text-primary lg:text-6xl">
            Thinking out loud.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-secondary">
            Long-form writing on clinical AI, benchmarking methodology, healthcare systems, and
            what responsible deployment actually looks like.
          </p>

          {/* Featured post */}
          {featuredPost ? (
            <div className="mt-12 border-b border-border pb-12">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                {/* Image side */}
                <div className="relative aspect-video overflow-hidden rounded-token-sm lg:aspect-auto lg:h-auto lg:w-[45%]">
                  {featuredPost.featuredImage ? (
                    <Image
                      alt={featuredPost.imageAlt ?? featuredPost.title}
                      className="object-cover"
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 45vw"
                      src={featuredPost.featuredImage}
                    />
                  ) : (
                    <div className="flex h-full min-h-48 items-center justify-center border border-border">
                      <span className="text-xs uppercase tracking-[0.18em] text-text-tertiary">
                        {featuredPost.category}
                      </span>
                    </div>
                  )}
                  {featuredPost.imageOverlay ? (
                    <div className="absolute bottom-4 left-4">
                      {featuredPost.imageOverlay.badge ? (
                        <span className="rounded-full bg-bg-primary/80 px-2 py-1 text-xs text-text-primary">
                          {featuredPost.imageOverlay.badge}
                        </span>
                      ) : null}
                      {featuredPost.imageOverlay.stat ? (
                        <div className="mt-2 rounded-token-sm bg-bg-primary/80 px-3 py-2">
                          <p className="text-xs text-text-tertiary">{featuredPost.imageOverlay.stat.label}</p>
                          <p className="text-2xl font-semibold text-text-primary">{featuredPost.imageOverlay.stat.value}</p>
                          <p className="text-xs text-text-tertiary">{featuredPost.imageOverlay.stat.sublabel}</p>
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                {/* Content side */}
                <div className="flex flex-col justify-center lg:w-[55%]">
                  <CategoryBadge category={featuredPost.category} />
                  <h2 className="mt-4 font-display text-2xl leading-snug text-text-primary lg:text-3xl">
                    {featuredPost.title}
                  </h2>
                  {featuredPost.tldr ? (
                    <p className="mt-3 line-clamp-3 text-sm text-text-secondary">
                      {featuredPost.tldr}
                    </p>
                  ) : null}

                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <InitialsCircle initials={featuredPost.author.initials} size={36} />
                    <span className="text-sm text-text-primary">{featuredPost.author.name}</span>
                    <span className="text-text-tertiary">·</span>
                    <span className="text-sm text-text-tertiary">{featuredPost.date}</span>
                    <span className="text-text-tertiary">·</span>
                    <span className="text-sm text-text-tertiary">{featuredPost.readTime}</span>
                  </div>

                  <Link
                    className="mt-6 text-sm text-accent-cyan transition hover:opacity-75"
                    href={`/blog/${featuredPost.id}`}
                  >
                    Read post →
                  </Link>
                </div>
              </div>
            </div>
          ) : null}

          {/* Remaining posts grid */}
          {remainingPosts.length > 0 ? (
            <div className="mt-16">
              <div className="mt-6">
                {remainingPosts.map((post) => (
                  <Link
                    className="block border-b border-border py-6 transition hover:opacity-75"
                    href={`/blog/${post.id}`}
                    key={post.id}
                  >
                    <CategoryBadge category={post.category} />
                    <h3 className="mt-2 line-clamp-2 text-xl font-medium leading-snug text-text-primary">
                      {post.title}
                    </h3>
                    {(post.description ?? post.tldr) ? (
                      <p className="mt-2 line-clamp-2 text-sm text-text-secondary">
                        {post.description ?? post.tldr}
                      </p>
                    ) : null}
                    <div className="mt-4 flex items-center gap-2">
                      <InitialsCircle initials={post.author.initials} size={28} />
                      <span className="text-xs text-text-tertiary">
                        {post.author.name} · {post.date} · {post.readTime}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}

          {/* Papers & Abstracts */}
          {papersOnly.length > 0 ? (
            <div className="mt-16">
              <div className="mt-6">
                {papersOnly.map((post) => (
                  <div
                    className="flex items-start justify-between gap-6 border-b border-border py-4"
                    key={post.id}
                  >
                    <div>
                      <CategoryBadge category={post.category} />
                      <p className="mt-1 text-sm font-medium text-text-primary">{post.title}</p>
                      {post.venue ? (
                        <p className="mt-0.5 text-xs text-text-tertiary">{post.venue}</p>
                      ) : null}
                    </div>
                    {post.link ? (
                      <a
                        className="shrink-0 text-xs text-accent-cyan transition hover:opacity-75"
                        href={post.link}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Read paper ↗
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </div>
  );
}
