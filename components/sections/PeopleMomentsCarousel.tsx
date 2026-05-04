"use client";

import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { peopleMomentSlides } from "@/lib/content/peopleMoments";
import { cn } from "@/lib/utils/cn";

/** Letterbox behind contained images so uneven aspect ratios look intentional */
const LETTERBOX_CLASS =
  "bg-[radial-gradient(ellipse_at_center,var(--color-bg-elevated)_0%,var(--color-bg-secondary)_100%)]";

type PeopleMomentsCarouselProps = {
  /** Ignored — kept for backward compatibility with earlier marquee API */
  animationDuration?: number;
  /** When true, renders as a region inside another section (no outer section / duplicate max-width padding). */
  embedded?: boolean;
};

export function PeopleMomentsCarousel({
  animationDuration: _animationDuration,
  embedded = false,
}: PeopleMomentsCarouselProps): React.ReactElement {
  const slides = peopleMomentSlides;
  const count = slides.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const thumbStripRef = useRef<HTMLDivElement | null>(null);
  const closeLightboxRef = useRef<HTMLButtonElement | null>(null);
  const lightboxTitleId = useId();

  const goPrev = useCallback(() => {
    if (count === 0) return;
    setActiveIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    if (count === 0) return;
    setActiveIndex((i) => (i + 1) % count);
  }, [count]);

  useEffect(() => setMounted(true), []);

  /** Keep active thumb visible inside the strip only — never `scrollIntoView` on the button (that scrolls the page). */
  useEffect(() => {
    if (count === 0) return;
    const id = requestAnimationFrame(() => {
      const strip = thumbStripRef.current;
      const thumb = thumbRefs.current[activeIndex];
      if (!strip || !thumb) return;
      const stripRect = strip.getBoundingClientRect();
      const thumbRect = thumb.getBoundingClientRect();
      const margin = 8;
      if (thumbRect.left < stripRect.left + margin) {
        strip.scrollLeft -= stripRect.left + margin - thumbRect.left;
      } else if (thumbRect.right > stripRect.right - margin) {
        strip.scrollLeft += thumbRect.right - (stripRect.right - margin);
      }
    });
    return () => cancelAnimationFrame(id);
  }, [activeIndex, count]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    queueMicrotask(() => closeLightboxRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxOpen, goPrev, goNext]);

  if (count === 0) {
    const EmptyShell = embedded ? "div" : "section";
    return (
      <EmptyShell
        aria-label="Lab photos"
        className={cn(
          "border-t border-border pt-10",
          embedded ? "mt-12 lg:mt-16" : "pb-12",
        )}
        role={embedded ? "region" : undefined}
      >
        <div className={cn(!embedded && "mx-auto max-w-7xl px-6 lg:px-8", embedded && "w-full")}>
          <p className="text-text-secondary">Photos coming soon.</p>
        </div>
      </EmptyShell>
    );
  }

  const safeIndex = ((activeIndex % count) + count) % count;
  const currentSlide = slides[safeIndex]!;

  const lightbox =
    mounted &&
    lightboxOpen &&
    createPortal(
      <div
        aria-labelledby={lightboxTitleId}
        aria-modal="true"
        className="fixed inset-0 z-[100] flex flex-col bg-[color:rgba(15,23,42,0.88)] backdrop-blur-sm"
        onClick={() => setLightboxOpen(false)}
        role="dialog"
      >
        <div
          className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-4 py-3 sm:px-6"
          onClick={(e) => e.stopPropagation()}
        >
          <p
            className="truncate text-sm font-medium text-white/95 sm:text-base"
            id={lightboxTitleId}
          >
            {currentSlide.alt}
          </p>
          <button
            aria-label="Close full-screen photo"
            className="flex size-10 shrink-0 items-center justify-center rounded-none border border-white/20 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            ref={closeLightboxRef}
            type="button"
          >
            <X aria-hidden className="size-5" />
          </button>
        </div>

        <div
          className="relative flex min-h-0 flex-1 cursor-default items-center justify-center px-3 py-4 sm:px-8 sm:py-6"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-[min(96vw,1280px)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={cn(
                "relative h-[min(78dvh,800px)] w-full max-h-[82dvh] overflow-hidden rounded-none sm:h-[min(80dvh,840px)]",
                LETTERBOX_CLASS,
                "ring-1 ring-white/10",
              )}
            >
              <Image
                alt={currentSlide.alt}
                className="object-contain p-1 sm:p-2"
                fill
                key={`lb-${currentSlide.src}`}
                sizes="(max-width: 1280px) 96vw, 1280px"
                src={currentSlide.src}
              />
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-1 sm:px-2">
              <button
                aria-label="Previous photo"
                className="pointer-events-auto flex size-11 items-center justify-center rounded-none border border-white/25 bg-black/40 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:size-12"
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                type="button"
              >
                <ChevronLeft aria-hidden className="size-6 sm:size-7" />
              </button>
              <button
                aria-label="Next photo"
                className="pointer-events-auto flex size-11 items-center justify-center rounded-none border border-white/25 bg-black/40 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/55 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:size-12"
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                type="button"
              >
                <ChevronRight aria-hidden className="size-6 sm:size-7" />
              </button>
            </div>
          </div>
        </div>

        <p
          className="shrink-0 cursor-default pb-[max(1rem,env(safe-area-inset-bottom))] pt-1 text-center text-xs text-white/70 sm:text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          Photo {activeIndex + 1} of {count}
          <span className="text-white/50"> · Click outside or Esc to close</span>
        </p>
      </div>,
      document.body,
    );

  const Shell = embedded ? "div" : "section";

  return (
    <Shell
      aria-label="Lab photos"
      className={cn(
        "border-t border-border pt-10 lg:pt-12",
        embedded ? "mt-12 lg:mt-16" : "pb-12 lg:pb-16",
      )}
      role={embedded ? "region" : undefined}
    >
      <div className={cn(!embedded && "mx-auto max-w-7xl px-6 lg:px-8", embedded && "w-full")}>
        <p className="text-xs uppercase tracking-[0.22em] text-text-primary">
          Life at CRASH
        </p>
        <h2 className="mt-3 font-display text-2xl text-text-primary sm:text-3xl lg:text-4xl">
          On the ground
        </h2>
        <p className="mt-3 max-w-3xl text-base text-text-secondary sm:text-lg">
          Team snapshots, conferences, and collaborators — the people behind the
          work.
        </p>

        <div className="mt-6 flex min-h-0 flex-col gap-2.5 sm:mt-8 sm:gap-3">
          <figure
            className="relative flex min-h-0 flex-col overflow-hidden rounded-none border border-border bg-bg-elevated shadow-sm outline-none ring-[var(--color-border-focus)] focus-visible:ring-2"
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") {
                e.preventDefault();
                goPrev();
              }
              if (e.key === "ArrowRight") {
                e.preventDefault();
                goNext();
              }
              if (e.key === "Enter" && !lightboxOpen) {
                e.preventDefault();
                setLightboxOpen(true);
              }
            }}
            tabIndex={0}
          >
            <div
              className={cn(
                "relative w-full max-w-full overflow-hidden",
                LETTERBOX_CLASS,
                "h-[min(40dvh,26rem)]",
                "sm:h-[min(44dvh,30rem)]",
                "md:h-[min(46dvh,34rem)]",
                "max-[height:720px]:h-[min(36dvh,22rem)]",
                "max-[height:640px]:h-[min(32dvh,20rem)]",
              )}
            >
              <Image
                alt={currentSlide.alt}
                className="object-contain p-0.5 sm:p-1"
                draggable={false}
                fill
                key={currentSlide.src}
                priority={activeIndex === 0}
                sizes="(max-width: 1280px) 100vw, 1216px"
                src={currentSlide.src}
              />

              <button
                aria-label={`Open full size: ${currentSlide.alt}`}
                className="absolute inset-0 z-[2] cursor-zoom-in bg-transparent"
                onClick={() => setLightboxOpen(true)}
                type="button"
              />

              <div className="pointer-events-none absolute right-2 top-2 z-[3] sm:right-3 sm:top-3">
                <span
                  className="inline-flex items-center gap-1.5 rounded-none border border-border/80 bg-bg-surface/95 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-text-secondary shadow-sm backdrop-blur-sm sm:text-xs"
                  aria-hidden
                >
                  <Maximize2 className="size-3 opacity-80 sm:size-3.5" />
                  Full
                </span>
              </div>

              <div className="pointer-events-none absolute inset-x-0 top-1/2 z-[4] flex -translate-y-1/2 justify-between px-2 sm:px-3">
                <button
                  aria-label="Previous photo"
                  className="pointer-events-auto flex size-10 items-center justify-center rounded-none border border-border bg-bg-surface/95 text-text-primary shadow-sm backdrop-blur-sm transition hover:bg-bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)] sm:size-11"
                  onClick={(e) => {
                    e.stopPropagation();
                    goPrev();
                  }}
                  type="button"
                >
                  <ChevronLeft aria-hidden className="size-5 sm:size-6" />
                </button>
                <button
                  aria-label="Next photo"
                  className="pointer-events-auto flex size-10 items-center justify-center rounded-none border border-border bg-bg-surface/95 text-text-primary shadow-sm backdrop-blur-sm transition hover:bg-bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)] sm:size-11"
                  onClick={(e) => {
                    e.stopPropagation();
                    goNext();
                  }}
                  type="button"
                >
                  <ChevronRight aria-hidden className="size-5 sm:size-6" />
                </button>
              </div>
            </div>

            <figcaption className="shrink-0 border-t border-border bg-bg-secondary/80 px-3 py-2 text-center backdrop-blur-sm sm:px-4 sm:py-2.5">
              <span aria-live="polite" className="text-xs text-text-secondary sm:text-sm">
                Photo {activeIndex + 1} of {count}
                <span className="text-text-tertiary"> · </span>
                <span className="text-text-tertiary">
                  Click the image for full size
                </span>
              </span>
            </figcaption>
          </figure>

          <div className="shrink-0">
            <p className="mb-1.5 text-xs uppercase tracking-[0.18em] text-text-tertiary sm:mb-2">
              All photos
            </p>
            <div
              className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 pt-0.5 scroll-smooth [scrollbar-width:thin]"
              ref={thumbStripRef}
            >
              {slides.map((slide, index) => (
                <button
                  aria-label={`Show photo ${index + 1} of ${count}`}
                  aria-pressed={index === activeIndex}
                  className={cn(
                    "relative h-14 w-[5.25rem] shrink-0 snap-start overflow-hidden rounded-none border-2 transition-all sm:h-16 sm:w-24 md:h-[4.25rem] md:w-28",
                    LETTERBOX_CLASS,
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-border-focus)]",
                    index === activeIndex
                      ? "border-accent-cyan opacity-100 ring-2 ring-accent-cyan/25"
                      : "border-transparent opacity-65 hover:opacity-100",
                  )}
                  key={slide.src}
                  onClick={() => setActiveIndex(index)}
                  ref={(el) => {
                    thumbRefs.current[index] = el;
                  }}
                  type="button"
                >
                  <Image
                    alt=""
                    aria-hidden
                    className="object-contain p-px"
                    fill
                    sizes="(max-width: 640px) 96px, 128px"
                    src={slide.src}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {lightbox}
    </Shell>
  );
}
