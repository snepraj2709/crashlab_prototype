import {
  englishXSources,
  internationalXSources,
  redditPostIds,
} from "@/lib/social-proof/sources";
import type { RedditPostData, XPostData } from "@/lib/social-proof/types";

const FETCH_REVALIDATE_SECONDS = 300;

const REQUEST_HEADERS = {
  "User-Agent": "CrashLabWebsite/1.0 (+https://crashlab.in)",
};

function formatCompactCount(value: number | null | undefined): string {
  if (value == null || Number.isNaN(value)) return "—";
  const n = Math.abs(Math.round(value));
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 10_000) return `${Math.round(n / 1_000)}K`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

function initialsFromDisplayName(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "?";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    const first = parts[0]!;
    const last = parts[parts.length - 1]!;
    const a = Array.from(first)[0];
    const b = Array.from(last)[0];
    if (a && b) return `${a}${b}`.toUpperCase();
  }
  const chars = Array.from(trimmed).slice(0, 2).join("");
  return chars.toUpperCase() || "?";
}

const AVATAR_PALETTE = [
  "#1d4ed8",
  "#7c3aed",
  "#234c6a",
  "#059669",
  "#0891b2",
  "#b45309",
  "#dc2626",
  "#be185d",
  "#0369a1",
  "#16a34a",
];

function avatarColorFromSeed(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) {
    h = seed.charCodeAt(i) + ((h << 5) - h);
  }
  return AVATAR_PALETTE[Math.abs(h) % AVATAR_PALETTE.length]!;
}

function formatTweetShortDate(createdAt: string | undefined): string {
  if (!createdAt) return "";
  const d = new Date(createdAt);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
}

function formatRelativeTimeFromUtc(createdUtc: number): string {
  const now = Date.now();
  const then = createdUtc * 1000;
  let deltaSec = Math.round((now - then) / 1000);
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
  if (deltaSec < 60) return rtf.format(-deltaSec, "second");
  let deltaMin = Math.round(deltaSec / 60);
  if (deltaMin < 60) return rtf.format(-deltaMin, "minute");
  let deltaHr = Math.round(deltaMin / 60);
  if (deltaHr < 48) return rtf.format(-deltaHr, "hour");
  let deltaDay = Math.round(deltaHr / 24);
  if (deltaDay < 30) return rtf.format(-deltaDay, "day");
  let deltaMonth = Math.round(deltaDay / 30);
  if (deltaMonth < 12) return rtf.format(-deltaMonth, "month");
  const deltaYear = Math.round(deltaDay / 365);
  return rtf.format(-deltaYear, "year");
}

function trimSelftext(raw: string | undefined): string | undefined {
  if (!raw?.trim()) return undefined;
  const oneLine = raw.replace(/\s+/g, " ").trim();
  if (oneLine.length <= 280) return oneLine;
  return `${oneLine.slice(0, 277)}…`;
}

type FxTwitterPayload = {
  code?: number;
  message?: string;
  tweet?: {
    url?: string;
    id?: string;
    text?: string;
    replies?: number;
    retweets?: number;
    likes?: number;
    views?: number | null;
    created_at?: string;
    author?: {
      name?: string;
      screen_name?: string;
      verification?: { verified?: boolean };
    };
  };
};

function xPostFallback(source: { id: string; url: string }): XPostData {
  return {
    id: source.id,
    authorName: "X",
    authorHandle: "",
    initials: "𝕏",
    avatarColor: "#64748b",
    verified: false,
    date: "",
    text: "Live preview unavailable — open on X to read this post.",
    replies: "—",
    reposts: "—",
    likes: "—",
    views: "—",
    url: source.url,
  };
}

async function fetchXPost(source: { id: string; url: string }): Promise<XPostData> {
  try {
    const res = await fetch(`https://api.fxtwitter.com/status/${source.id}`, {
      headers: REQUEST_HEADERS,
      next: { revalidate: FETCH_REVALIDATE_SECONDS },
    });
    if (!res.ok) return xPostFallback(source);
    const json = (await res.json()) as FxTwitterPayload;
    if (json.code !== 200 || !json.tweet) return xPostFallback(source);
    const t = json.tweet;
    const author = t.author;
    const screenName = author?.screen_name ?? "";
    const displayName = author?.name ?? screenName ?? "X user";
    const handle = screenName ? `@${screenName}` : "";
    const verified = author?.verification?.verified === true;
    const views =
      t.views != null && t.views > 0 ? formatCompactCount(t.views) : "—";

    return {
      id: t.id ?? source.id,
      authorName: displayName,
      authorHandle: handle,
      initials: initialsFromDisplayName(displayName),
      avatarColor: avatarColorFromSeed(screenName || displayName),
      verified,
      date: formatTweetShortDate(t.created_at),
      text: (t.text ?? "").trim() || "Open on X to read this post.",
      replies: formatCompactCount(t.replies),
      reposts: formatCompactCount(t.retweets),
      likes: formatCompactCount(t.likes),
      views,
      url: t.url ?? source.url,
    };
  } catch {
    return xPostFallback(source);
  }
}

type RedditPostRaw = {
  id?: string;
  subreddit?: string;
  title?: string;
  selftext?: string;
  ups?: number;
  score?: number;
  num_comments?: number;
  permalink?: string;
  created_utc?: number;
};

type RedditCommentsJson = [
  {
    data?: {
      children?: Array<{ kind?: string; data?: RedditPostRaw }>;
    };
  },
];

async function fetchRedditPost(postId: string): Promise<RedditPostData | null> {
  try {
    const res = await fetch(`https://www.reddit.com/comments/${postId}.json?raw_json=1`, {
      headers: REQUEST_HEADERS,
      next: { revalidate: FETCH_REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    const page = (await res.json()) as RedditCommentsJson;
    const post = page[0]?.data?.children?.[0]?.data;
    if (!post?.permalink || !post.id) return null;

    const ups = typeof post.ups === "number" ? post.ups : post.score ?? 0;
    const comments =
      typeof post.num_comments === "number" ? post.num_comments : 0;
    const url = `https://www.reddit.com${post.permalink}`;
    const created =
      typeof post.created_utc === "number" ? post.created_utc : Date.now() / 1000;

    return {
      id: post.id,
      subreddit: post.subreddit ?? "",
      title: post.title ?? "(Untitled)",
      body: trimSelftext(post.selftext),
      upvotes: formatCompactCount(ups),
      comments: formatCompactCount(comments),
      url,
      timeAgo: formatRelativeTimeFromUtc(created),
    };
  } catch {
    return null;
  }
}

export async function getSocialProofData(): Promise<{
  englishXPosts: XPostData[];
  internationalXPosts: XPostData[];
  redditPosts: RedditPostData[];
}> {
  const [englishXPosts, internationalXPosts, redditResults] = await Promise.all([
    Promise.all(englishXSources.map(fetchXPost)),
    Promise.all(internationalXSources.map(fetchXPost)),
    Promise.all(redditPostIds.map(fetchRedditPost)),
  ]);

  const redditPosts = redditResults.filter((p): p is RedditPostData => p != null);

  return { englishXPosts, internationalXPosts, redditPosts };
}
