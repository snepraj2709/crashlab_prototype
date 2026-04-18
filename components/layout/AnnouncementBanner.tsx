"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export interface AnnouncementData {
  _id: string;
  message: string;
  ctaText?: string | null;
  ctaUrl?: string | null;
  type?: "grant" | "paper" | "event" | "general" | null;
}

interface AnnouncementBannerProps {
  announcement: AnnouncementData | null;
}

const TYPE_BADGES: Record<string, string> = {
  paper: "Paper Accepted",
  grant: "Grant",
  event: "Event",
  general: "Announcement"
};

export function AnnouncementBanner({ announcement }: AnnouncementBannerProps): React.ReactElement | null {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (!announcement) return;
    const key = `banner-dismissed-${announcement._id}`;
    setDismissed(sessionStorage.getItem(key) === "1");
  }, [announcement]);

  if (!announcement || dismissed) return null;

  function dismiss(): void {
    const key = `banner-dismissed-${announcement!._id}`;
    sessionStorage.setItem(key, "1");
    setDismissed(true);
    window.dispatchEvent(new Event("banner-dismissed"));
  }

  const badge = TYPE_BADGES[announcement.type ?? "general"] ?? "Announcement";

  return (
    <div
      className="relative z-50 border-b border-white/10 px-4 py-2.5 text-sm text-white"
      style={{ backgroundColor: "#101729" }}
      role="banner"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-2 lg:px-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <span className="hidden shrink-0 rounded-full border border-white/30 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/80 sm:inline-block">
            {badge}
          </span>
          <p className="truncate text-sm text-white/90">{announcement.message}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          {announcement.ctaText && announcement.ctaUrl ? (
            <Link
              className="hidden shrink-0 rounded-full border border-white/40 px-3 py-1 text-xs font-semibold text-white transition-all hover:bg-white hover:text-neutral-900 sm:inline-block"
              href={announcement.ctaUrl}
            >
              {announcement.ctaText}
            </Link>
          ) : null}
          <button
            aria-label="Dismiss announcement"
            className="shrink-0 rounded-full p-1 text-white/60 transition-colors hover:text-white"
            onClick={dismiss}
            type="button"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
