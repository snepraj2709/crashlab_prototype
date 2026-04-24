import Image from "next/image";
import Link from "next/link";
import { EmptyState } from "@/components/ui";
import { EventsList } from "@/components/sections/EventsList";
import { getEvents, getNewsPosts } from "@/lib/content/site";
import { filterPosts } from "@/lib/utils/filtering";
import { formatDate } from "@/lib/utils/formatDate";

export const revalidate = 60;

const categories = [
  { label: "All", value: "all" },
  { label: "Benchmark Update", value: "benchmark-update" },
  { label: "Research Paper", value: "research-paper" },
  { label: "Lab News", value: "lab-news" },
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
    <div className="pt-16">
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="mt-6 font-display text-5xl text-text-primary lg:text-6xl">
            News & Events from the lab.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-text-secondary">
            Writing and events for researchers, industry teams, and funders who need the
            signal behind the metrics.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {categories.map((entry) => (
              <Link
                className={`text-sm transition ${
                  category === entry.value
                    ? "text-accent-cyan underline underline-offset-4"
                    : "text-text-tertiary hover:text-accent-cyan hover:underline"
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
                <Link className="mt-12 block border-b border-border pb-12" href={`/news/${featured.slug}`}>
                  <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <div>
                      <span className="text-xs uppercase tracking-[0.18em] text-accent-cyan">
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
                    <div className="relative aspect-[16/10] overflow-hidden rounded-token-sm">
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
                <div className="mt-12">
                  {rest.map((post) => (
                    <Link className="block border-b border-border py-6 transition hover:opacity-75" href={`/news/${post.slug}`} key={post._id}>
                      <p className="text-xs uppercase tracking-[0.18em] text-accent-cyan">
                        {post.category?.replace(/-/g, " ")}
                      </p>
                      <h3 className="mt-3 line-clamp-2 text-2xl font-medium text-text-primary">
                        {post.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 text-text-secondary">{post.excerpt}</p>
                      <p className="mt-4 text-xs text-text-tertiary">
                        {post.author?.name || "CRASH Lab"} · {formatDate(post.publishedAt)}
                      </p>
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
