"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils/cn";

type SocialProofCarouselRowProps = {
  /** Accessible name for the scroll region (e.g. section heading). */
  ariaLabel: string;
  /** Used to re-measure overflow after server-rendered children update. */
  itemCount: number;
  children: React.ReactNode;
};

const SCROLL_EDGE_EPS = 6;

export function SocialProofCarouselRow({
  ariaLabel,
  itemCount,
  children,
}: SocialProofCarouselRowProps): React.ReactElement {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    setCanPrev(scrollLeft > SCROLL_EDGE_EPS);
    setCanNext(scrollLeft < maxScroll - SCROLL_EDGE_EPS);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      ro.disconnect();
    };
  }, [updateScrollState, itemCount]);

  const scrollPage = useCallback((direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const delta = direction * el.clientWidth;
    el.scrollBy({ left: delta, behavior: "smooth" });
  }, []);

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] w-14 bg-gradient-to-r from-surface-canvas to-transparent sm:w-20" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[1] w-14 bg-gradient-to-l from-surface-canvas to-transparent sm:w-20" />

      <button
        aria-label="Scroll posts left"
        className={cn(
          "ui-focus-ring absolute left-1 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-none border border-border bg-bg-surface text-text-primary shadow-sm transition hover:bg-bg-elevated disabled:pointer-events-none disabled:opacity-30 sm:left-2",
        )}
        disabled={!canPrev}
        onClick={() => scrollPage(-1)}
        type="button"
      >
        <ChevronLeft aria-hidden className="h-4 w-4" />
      </button>
      <button
        aria-label="Scroll posts right"
        className={cn(
          "ui-focus-ring absolute right-1 top-1/2 z-[2] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-none border border-border bg-bg-surface text-text-primary shadow-sm transition hover:bg-bg-elevated disabled:pointer-events-none disabled:opacity-30 sm:right-2",
        )}
        disabled={!canNext}
        onClick={() => scrollPage(1)}
        type="button"
      >
        <ChevronRight aria-hidden className="h-4 w-4" />
      </button>

      <div
        aria-label={ariaLabel}
        className={cn(
          "flex gap-3 overflow-x-auto overflow-y-hidden scroll-smooth pb-0.5 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none]",
          "[&::-webkit-scrollbar]:hidden snap-x snap-mandatory",
        )}
        ref={scrollerRef}
        role="region"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            scrollPage(-1);
          }
          if (e.key === "ArrowRight") {
            e.preventDefault();
            scrollPage(1);
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}
