import Image from "next/image";
import Link from "next/link";
import { EmptyState, SectionLabel } from "@/components/ui";
import { EventsList } from "@/components/sections/EventsList";
import { getEvents, getNewsPosts } from "@/lib/content/site";
import { filterPosts } from "@/lib/utils/filtering";
import { formatDate } from "@/lib/utils/formatDate";

export const revalidate = 60;

const categories = [
  { label: "All", value: "all" },
  { label: "Benchmark Update", value: "benchmark-update" },
  { label: "Research Paper", value: "research-paper" },
  { label: "Industry Insight", value: "industry-insight" },
  { label: "Lab News", value: "lab-news" },
  { label: "Policy", value: "policy" },
  { label: "Events", value: "events" }
];

const CATEGORY_COVERS: Record<string, string> = {
  "benchmark-update": "/og/benchmark-update.svg",
  "research-paper": "/og/research-paper.svg",
  "lab-news": "/og/lab-news.svg",
  "industry-insight": "/og/research-paper.svg",
  policy: "/og/lab-news.svg"
};

function getCoverSrc(
  post: Awaited<ReturnType<typeof getNewsPosts>>[number]
): string {
  const explicitCover = post.coverImage?.url;
  if (explicitCover && explicitCover !== "/og/default.svg") return explicitCover;
  return (post.category ? CATEGORY_COVERS[post.category] : undefined) || "/og/default.svg";
}

export default async function NewsPage({
  searchParams
}: {
  searchParams: Record<string, string | string[] | undefined>;
}): Promise<React.ReactElement> {
  const category =
    typeof searchParams.category === "string" ? searchParams.category : "all";
  const showEvents = category === "events";

  const [posts, events] = await Promise.all([
    showEvents ? Promise.resolve([]) : getNewsPosts(),
    showEvents ? getEvents() : Promise.resolve([])
  ]);

  const filtered = showEvents ? [] : filterPosts(posts, category);
  const [featured, ...rest] = filtered;

  return (
    <div className="pt-32">
      <section className="py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionLabel number="01" text="News & Events" />
          <h1 className="mt-6 font-display text-5xl text-text-primary lg:text-6xl">
            News & Events from the lab.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-secondary">
            Writing and events for researchers, industry teams, and funders who need the
            signal behind the metrics.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((entry) => (
              <Link
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  category === entry.value
                    ? "bg-accent-cyan/10 border-accent-cyan text-accent-cyan"
                    : "border-border text-text-secondary hover:border-accent-cyan hover:text-accent-cyan"
                }`}
                href={
                  entry.value === "all"
                    ? "/news"
                    : `/news?category=${entry.value}`
                }
                key={entry.value}
              >
                {entry.label}
              </Link>
            ))}
          </div>

          {showEvents ? (
            <EventsList events={events} />
          ) : (
            <>
              {featured ? (
                <Link className="mt-12 block" href={`/news/${featured.slug}`}>
                  <div className="grid gap-8 rounded-token-md border border-border bg-bg-surface p-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                      <span className="border-accent-cyan/30 bg-accent-cyan/10 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.18em] text-accent-cyan">
                        Featured
                      </span>
                      <h2 className="mt-6 font-display text-4xl text-text-primary">
                        {featured.title}
                      </h2>
                      <p className="mt-4 max-w-3xl text-text-secondary">{featured.excerpt}</p>
                      <p className="mt-6 text-sm text-text-tertiary">
                        {featured.author?.name || "CRASH Lab"} · {formatDate(featured.publishedAt)}
                      </p>
                    </div>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-token-sm border border-border">
                      <Image
                        alt={`Cover image for ${featured.title}`}
                        className="object-cover"
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        src={getCoverSrc(featured)}
                      />
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="mt-12">
                  <EmptyState
                    body="Publish the first story in Sanity or use the seed posts."
                    title="No posts yet."
                  />
                </div>
              )}

              {rest.length ? (
                <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                  {rest.map((post) => (
                    <Link href={`/news/${post.slug}`} key={post._id}>
                      <div className="h-full rounded-token-md border border-border bg-bg-surface p-6 transition hover:border-accent-cyan">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-token-sm border border-border">
                          <Image
                            alt={`Cover image for ${post.title}`}
                            className="object-cover"
                            fill
                            sizes="(max-width: 1280px) 50vw, 33vw"
                            src={getCoverSrc(post)}
                          />
                        </div>
                        <p className="mt-5 text-xs uppercase tracking-[0.18em] text-accent-cyan">
                          {post.category?.replace(/-/g, " ")}
                        </p>
                        <h3 className="mt-3 line-clamp-2 text-2xl font-semibold text-text-primary">
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
            </>
          )}
        </div>
      </section>
    </div>
  );
}
