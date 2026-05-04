import type { Metadata } from "next";

import {
  RedditPostCard,
  XPostCard,
} from "@/components/sections/social-proof/SocialProofPostCards";
import { getSocialProofData } from "@/lib/social-proof/fetch-social-proof";

export const metadata: Metadata = {
  title: "Community response — RadLE | CRASH Lab",
  description:
    "Live highlights from X and Reddit discussing Radiology's Last Exam (RadLE): posts, threads, and engagement from clinicians and the AI community.",
};

export const revalidate = 300;

const gridCardClass = "w-full max-w-none sm:w-full";

export default async function CommunityResponsePage(): Promise<React.ReactElement> {
  const { englishXPosts, internationalXPosts, redditPosts } = await getSocialProofData();

  return (
    <div className="pb-16 pt-10 lg:pb-24 lg:pt-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-text-primary">RadLE in the wild</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-text-primary sm:text-5xl">
          Community response
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
          Posts and threads fetched live from X and Reddit — same sources as the homepage section,
          shown in full so you can browse every highlight.
        </p>
      </div>

      <section className="mx-auto mt-12 max-w-7xl px-6 lg:mt-16 lg:px-8">
        <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">On X</h2>
        <p className="mt-2 text-sm text-text-secondary">
          English-language posts (metrics update on refresh).
        </p>
        <ul className="mt-8 grid list-none gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {englishXPosts.map((post) => (
            <li className="min-w-0" key={post.id}>
              <XPostCard className={gridCardClass} post={post} />
            </li>
          ))}
        </ul>
      </section>

      {internationalXPosts.length > 0 ? (
        <section className="mx-auto mt-16 max-w-7xl px-6 lg:mt-20 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">
            International coverage
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Global audiences in Japanese, Hindi, German, and more.
          </p>
          <ul className="mt-8 grid list-none gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {internationalXPosts.map((post) => (
              <li className="min-w-0" key={post.id}>
                <XPostCard className={gridCardClass} post={post} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {redditPosts.length > 0 ? (
        <section className="mx-auto mt-16 max-w-7xl px-6 lg:mt-20 lg:px-8">
          <h2 className="font-display text-2xl font-bold text-text-primary sm:text-3xl">Reddit</h2>
          <p className="mt-2 text-sm text-text-secondary">Threads that cited or discussed RadLE.</p>
          <ul className="mt-8 grid list-none gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {redditPosts.map((post) => (
              <li className="min-w-0" key={post.id}>
                <RedditPostCard className={gridCardClass} post={post} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
