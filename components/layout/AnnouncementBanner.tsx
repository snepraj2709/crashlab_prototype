"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

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

function getDismissKey(announcement: AnnouncementData): string {
  return [
    "banner-dismissed",
    announcement._id,
    announcement.message,
    announcement.ctaText ?? "",
    announcement.ctaUrl ?? "",
  ].join("::");
}

export function AnnouncementBanner({
  announcement,
}: AnnouncementBannerProps): React.ReactElement | null {
  const [dismissed, setDismissed] = useState(false);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!announcement) {
      setDismissed(false);
      return;
    }

    const key = getDismissKey(announcement);
    setDismissed(sessionStorage.getItem(key) === "1");
  }, [announcement]);

  useEffect(() => {
    const root = document.documentElement;
    const banner = bannerRef.current;

    if (!announcement || dismissed || !banner) {
      root.style.setProperty("--announcement-banner-offset", "0px");
      return;
    }

    const gap = 0;
    const updateOffset = (): void => {
      root.style.setProperty(
        "--announcement-banner-offset",
        `${banner.getBoundingClientRect().height + gap}px`,
      );
    };

    updateOffset();

    const resizeObserver = new ResizeObserver(updateOffset);
    resizeObserver.observe(banner);
    window.addEventListener("resize", updateOffset);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateOffset);
      root.style.setProperty("--announcement-banner-offset", "0px");
    };
  }, [announcement, dismissed]);

  if (!announcement || dismissed) return null;

  const currentAnnouncement = announcement;

  function dismiss(): void {
    const key = getDismissKey(currentAnnouncement);
    sessionStorage.setItem(key, "1");
    setDismissed(true);
    window.dispatchEvent(new Event("banner-dismissed"));
  }

  return (
    <div
      className="sticky top-0 z-50 border-b border-white/10 px-4 py-4 text-white"
      ref={bannerRef}
      style={{ backgroundColor: "#101729" }}
      role="banner"
    >
      <div className="mx-auto max-w-7xl px-2 lg:px-4">
        <div className="relative px-10 sm:px-14">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
            <p className="max-w-4xl text-base font-medium leading-snug text-white/90 sm:text-lg">
              {announcement.message}
            </p>
            {currentAnnouncement.ctaText && currentAnnouncement.ctaUrl ? (
              <Link
                className="shrink-0 rounded-none border border-white/40 px-4 py-1.5 text-sm font-semibold text-white transition-all hover:bg-white hover:text-neutral-900"
                href={currentAnnouncement.ctaUrl}
                rel="noreferrer"
                target="_blank"
              >
                {currentAnnouncement.ctaText}
              </Link>
            ) : null}
          </div>
          <button
            aria-label="Dismiss announcement"
            className="absolute right-0 top-1/2 shrink-0 -translate-y-1/2 rounded-none p-1 text-white/60 transition-colors hover:text-white"
            onClick={dismiss}
            type="button"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
