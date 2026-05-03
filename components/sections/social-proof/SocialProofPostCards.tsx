import type { RedditPostData, XPostData } from "@/lib/social-proof/types";
import { cn } from "@/lib/utils/cn";

function XLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 fill-current text-text-primary" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function BluecheckIcon() {
  return (
    <svg viewBox="0 0 22 22" className="h-3.5 w-3.5 shrink-0 text-[#1d9bf0]" fill="currentColor" aria-label="Verified">
      <path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z" />
    </svg>
  );
}

function RedditLogo() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0" fill="#FF4500" aria-hidden>
      <path d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10s4.477 10 10 10 10-4.477 10-10zm-11.5 4.5c-1.5 0-2.5-.672-2.5-1.5s1-1.5 2.5-1.5 2.5.672 2.5 1.5-1 1.5-2.5 1.5zm3 0c1.5 0 2.5-.672 2.5-1.5s-1-1.5-2.5-1.5-2.5.672-2.5 1.5 1 1.5 2.5 1.5zM10 7c-.768 0-1.47.289-2 .764A3.978 3.978 0 006 7C4.895 7 4 7.895 4 9s.895 2 2 2c.47 0 .9-.163 1.236-.432A3.978 3.978 0 009 11.764V12h2v-.236A3.978 3.978 0 0012.764 11.568C13.1 11.837 13.53 12 14 12c1.105 0 2-.895 2-2s-.895-2-2-2a3.978 3.978 0 00-2-.764A1 1 0 0010 7zm0-3a1 1 0 100 2 1 1 0 000-2z" />
    </svg>
  );
}

export function XPostCard({
  post,
  className,
}: {
  post: XPostData;
  className?: string;
}): React.ReactElement {
  return (
    <a
      className={cn(
        "flex h-[198px] min-w-0 max-w-[300px] w-[min(100vw-3rem,300px)] shrink-0 flex-col overflow-hidden rounded-none border border-border bg-bg-surface p-4 transition-shadow hover:shadow-md sm:w-[300px]",
        className,
      )}
      href={post.url}
      rel="noreferrer"
      target="_blank"
    >
      <div className="flex min-w-0 items-start justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <div
            aria-hidden="true"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-none text-[11px] font-bold text-white"
            style={{ backgroundColor: post.avatarColor }}
          >
            {post.initials}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="truncate text-sm font-semibold leading-tight text-text-primary">
                {post.authorName}
              </span>
              {post.verified && <BluecheckIcon />}
            </div>
            <span className="block truncate text-xs text-text-tertiary">
              {[post.authorHandle, post.date].filter(Boolean).join(" · ") || "Post"}
            </span>
          </div>
        </div>
        <XLogo />
      </div>

      <div className="mt-2 flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        <p className="line-clamp-3 min-w-0 break-words text-[13px] leading-[1.45] text-text-secondary">
          {post.text}
        </p>
        <div aria-hidden className="min-h-0 flex-1" />
      </div>

      <div className="mt-2 flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 border-t border-border-subtle pt-2 text-[11px] text-text-tertiary">
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {post.replies}
        </span>
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="17 1 21 5 17 9" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <polyline points="7 23 3 19 7 15" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          </svg>
          {post.reposts}
        </span>
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {post.likes}
        </span>
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          {post.views}
        </span>
      </div>
    </a>
  );
}

export function RedditPostCard({
  post,
  className,
}: {
  post: RedditPostData;
  className?: string;
}): React.ReactElement {
  return (
    <a
      className={cn(
        "flex h-[198px] min-w-0 max-w-[300px] w-[min(100vw-3rem,300px)] shrink-0 flex-col overflow-hidden rounded-none border border-border bg-bg-surface p-4 transition-shadow hover:shadow-md sm:w-[300px]",
        className,
      )}
      href={post.url}
      rel="noreferrer"
      target="_blank"
    >
      <div className="flex min-w-0 shrink-0 items-center gap-1.5 overflow-hidden">
        <RedditLogo />
        <span className="min-w-0 flex-1 truncate text-xs font-semibold text-text-secondary">
          r/{post.subreddit}
        </span>
        <span className="shrink-0 text-xs text-text-tertiary">· {post.timeAgo}</span>
      </div>

      <div className="mt-2 flex min-h-0 min-w-0 flex-1 flex-col gap-1 overflow-hidden">
        <p className="line-clamp-3 min-w-0 break-words text-[13px] font-medium leading-snug text-text-primary">
          {post.title}
        </p>
        {post.body ? (
          <p className="line-clamp-2 min-w-0 shrink-0 break-words text-[11px] leading-5 text-text-secondary">
            {post.body}
          </p>
        ) : null}
        {/* Fills space when there is no body so the stats row lines up across cards */}
        <div aria-hidden className="min-h-0 flex-1" />
      </div>

      <div className="mt-2 flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 border-t border-border-subtle pt-2 text-[11px] text-text-tertiary">
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="18 15 12 9 6 15" />
          </svg>
          {post.upvotes} upvotes
        </span>
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {post.comments} comments
        </span>
      </div>
    </a>
  );
}
