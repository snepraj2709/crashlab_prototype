import { SocialProofCarouselRow } from "@/components/sections/social-proof/SocialProofCarouselRow";
import { getSocialProofData } from "@/lib/social-proof/fetch-social-proof";
import {
  RedditPostCard,
  XPostCard,
} from "@/components/sections/social-proof/SocialProofPostCards";
import { Button } from "@/components/ui";

export async function SocialProofSection(): Promise<React.ReactElement> {
  const { englishXPosts, internationalXPosts, redditPosts } = await getSocialProofData();

  return (
    <section className="border-t border-border py-8 lg:py-12" aria-label="Community response to RadLE">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-text-primary">
              What the field said
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-text-primary sm:text-3xl lg:text-4xl">
              A benchmark the community<br className="hidden sm:block" /> could not stop sharing.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">
              RadLE drew responses from radiologists, AI safety researchers, clinical educators,
              and health-tech writers across the first week of release.
            </p>
          </div>
          <Button
            className="shrink-0 self-start sm:self-auto"
            href="/community-response"
            size="sm"
            variant="outline"
          >
            View all
          </Button>
        </div>
      </div>

      {/* English X posts */}
      <div className="mx-auto mt-6 max-w-7xl px-6 lg:mt-7 lg:px-8">
        <ul className="sr-only">
          {englishXPosts.map((p) => (
            <li key={p.id}>
              {p.authorName}: {p.text}
            </li>
          ))}
        </ul>
        <SocialProofCarouselRow ariaLabel="Posts on X about RadLE" itemCount={englishXPosts.length}>
          {englishXPosts.map((post) => (
            <div className="snap-start shrink-0" key={post.id}>
              <XPostCard post={post} />
            </div>
          ))}
        </SocialProofCarouselRow>
      </div>

      {internationalXPosts.length > 0 ? (
        <>
          <div className="mx-auto mt-6 max-w-7xl px-6 lg:mt-7 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-text-primary">
              International coverage
            </p>
            <p className="mt-1 text-xs leading-5 text-text-secondary sm:text-sm sm:leading-snug">
              RadLE reached global audiences in Japanese, German, and Hindi.
            </p>
          </div>
          <div className="mx-auto mt-3 max-w-7xl px-6 lg:px-8">
            <ul className="sr-only">
              {internationalXPosts.map((p) => (
                <li key={p.id}>
                  {p.authorName}: {p.text}
                </li>
              ))}
            </ul>
            <SocialProofCarouselRow
              ariaLabel="International posts on X about RadLE"
              itemCount={internationalXPosts.length}
            >
              {internationalXPosts.map((post) => (
                <div className="snap-start shrink-0" key={post.id}>
                  <XPostCard post={post} />
                </div>
              ))}
            </SocialProofCarouselRow>
          </div>
        </>
      ) : null}

      {redditPosts.length > 0 ? (
        <>
          <div className="mx-auto mt-6 max-w-7xl px-6 lg:mt-7 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-text-primary">
              Also discussed on Reddit
            </p>
          </div>
          <div className="mx-auto mt-3 max-w-7xl px-6 lg:px-8">
            <ul className="sr-only">
              {redditPosts.map((p) => (
                <li key={p.id}>
                  r/{p.subreddit}: {p.title}
                </li>
              ))}
            </ul>
            <SocialProofCarouselRow ariaLabel="Reddit discussions of RadLE" itemCount={redditPosts.length}>
              {redditPosts.map((post) => (
                <div className="snap-start shrink-0" key={post.id}>
                  <RedditPostCard post={post} />
                </div>
              ))}
            </SocialProofCarouselRow>
          </div>
        </>
      ) : null}
    </section>
  );
}
