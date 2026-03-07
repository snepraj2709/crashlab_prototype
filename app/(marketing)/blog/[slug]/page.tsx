import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { PortableTextContent } from "@/components/sections";
import { getPostBySlug, getPosts } from "@/lib/content/site";
import { formatDate } from "@/lib/utils/formatDate";
import { calculateReadingTime, extractHeadings } from "@/lib/utils/portableText";

export const revalidate = 60;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {};
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: ["/og/default.svg"]
    }
  };
}

export default async function BlogPostPage({
  params
}: {
  params: { slug: string };
}): Promise<React.ReactElement> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const allPosts = await getPosts();
  const relatedPosts = allPosts
    .filter((entry) => entry.slug !== post.slug)
    .map((entry) => ({
      entry,
      score: entry.tags.filter((tag) => post.tags.includes(tag)).length
    }))
    .sort((left, right) => right.score - left.score)
    .slice(0, 3)
    .map(({ entry }) => entry);

  const readingTime = calculateReadingTime(post.body);
  const headings = extractHeadings(post.body);
  const pageUrl = `https://crashlab.in/blog/${post.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.seoDescription || post.excerpt,
          author: {
            "@type": "Person",
            name: post.author?.name || "CRASH Lab"
          },
          publisher: {
            "@type": "Organization",
            name: "CRASH Lab, Ashoka University"
          },
          datePublished: post.publishedAt,
          url: pageUrl
        }}
      />

      <article className="pt-32 pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">
            {post.category?.replace(/-/g, " ") || "Article"}
          </p>
          <h1 className="mt-6 max-w-5xl font-display text-5xl text-text-primary lg:text-6xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-text-tertiary">
            <span>{post.author?.name || "CRASH Lab"}</span>
            <span>{formatDate(post.publishedAt)}</span>
            <span>{readingTime} min read</span>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_300px]">
            <div>
              <PortableTextContent blocks={post.body} />

              <div className="mt-12 rounded-[28px] border border-border bg-bg-surface p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">About the author</p>
                <h2 className="mt-4 text-2xl font-semibold text-text-primary">
                  {post.author?.name || "CRASH Lab"}
                </h2>
                <p className="mt-4 text-text-secondary">
                  {post.author?.shortBio ||
                    "CRASH Lab is an interdisciplinary research group building responsible healthcare AI from Ashoka University."}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  className="rounded-full border border-border px-5 py-3 text-text-primary transition hover:border-accent-cyan hover:text-accent-cyan"
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  Share on Twitter
                </Link>
                <Link
                  className="rounded-full border border-border px-5 py-3 text-text-primary transition hover:border-accent-cyan hover:text-accent-cyan"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
                  rel="noreferrer"
                  target="_blank"
                >
                  Share on LinkedIn
                </Link>
              </div>
            </div>

            <aside className="space-y-6">
              {headings.length ? (
                <div className="rounded-[28px] border border-border bg-bg-surface p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">
                    Table of contents
                  </p>
                  <div className="mt-5 space-y-3">
                    {headings.map((heading) => (
                      <a
                        className={`block text-sm ${heading.level === 3 ? "pl-4 text-text-tertiary" : "text-text-primary"}`}
                        href={`#${heading.id}`}
                        key={heading.id}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              {relatedPosts.length ? (
                <div className="rounded-[28px] border border-border bg-bg-surface p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Related posts</p>
                  <div className="mt-5 space-y-4">
                    {relatedPosts.map((related) => (
                      <Link className="block text-text-primary transition hover:text-accent-cyan" href={`/blog/${related.slug}`} key={related._id}>
                        {related.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
