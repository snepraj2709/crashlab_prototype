"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Beaker,
  Building2,
  ChevronDown,
  ChevronRight,
  DatabaseZap,
  FileText,
  Globe,
  Presentation,
} from "lucide-react";

import { cn } from "@/lib/utils/cn";

interface JourneyItem {
  period: string;
  title: string;
  body: string;
  icon: string;
  isFeatured?: boolean;
}

interface JourneyContent {
  body: string;
  items: JourneyItem[];
}

interface FutureOutlookContent {
  heading: string;
  body: string;
}

interface JourneyOutlookSectionProps {
  futureOutlook: FutureOutlookContent;
  journey: JourneyContent;
}

const sectionIconMap = {
  papers: FileText,
  presentation: Presentation,
  globe: Globe,
  building: Building2,
  cohort: Beaker,
  trend: ArrowUpRight,
  data: DatabaseZap,
} satisfies Record<string, LucideIcon>;

type SegmentKey =
  | "accentOrange"
  | "accentCyan"
  | "brandBlue"
  | "accentGreen"
  | "accentYellow"
  | "steel"
  | "featured";

const SEGMENT_TAILWIND: Record<
  SegmentKey,
  {
    bar: string;
    connector: string;
    border: string;
    headerBg: string;
    headerText: string;
    nodeOuter: string;
  }
> = {
  accentOrange: {
    bar: "bg-accent-orange",
    connector: "bg-accent-orange",
    border: "border-accent-orange",
    headerBg: "bg-accent-orange",
    headerText: "text-white",
    nodeOuter: "border-accent-orange bg-accent-orange",
  },
  accentCyan: {
    bar: "bg-accent-cyan",
    connector: "bg-accent-cyan",
    border: "border-accent-cyan",
    headerBg: "bg-accent-cyan",
    headerText: "text-white",
    nodeOuter: "border-accent-cyan bg-accent-cyan",
  },
  brandBlue: {
    bar: "bg-brand-blue",
    connector: "bg-brand-blue",
    border: "border-brand-blue",
    headerBg: "bg-brand-blue",
    headerText: "text-white",
    nodeOuter: "border-brand-blue bg-brand-blue",
  },
  accentGreen: {
    bar: "bg-accent-green",
    connector: "bg-accent-green",
    border: "border-accent-green",
    headerBg: "bg-accent-green",
    headerText: "text-white",
    nodeOuter: "border-accent-green bg-accent-green",
  },
  accentYellow: {
    bar: "bg-accent-yellow",
    connector: "bg-accent-yellow",
    border: "border-accent-yellow",
    headerBg: "bg-accent-yellow",
    headerText: "text-white",
    nodeOuter: "border-accent-yellow bg-accent-yellow",
  },
  steel: {
    bar: "bg-navy-800",
    connector: "bg-navy-800",
    border: "border-navy-800",
    headerBg: "bg-navy-800",
    headerText: "text-white",
    nodeOuter: "border-navy-800 bg-navy-800",
  },
  featured: {
    bar: "bg-navy-900",
    connector: "bg-navy-900",
    border: "border-navy-900",
    headerBg: "bg-navy-900",
    headerText: "text-white",
    nodeOuter: "border-navy-900 bg-navy-900",
  },
};

const SEGMENT_CYCLE: SegmentKey[] = [
  "steel",
];

function segmentForItem(item: JourneyItem, index: number): SegmentKey {
  if (item.isFeatured === true) {
    return "featured";
  }

  const cycled = SEGMENT_CYCLE[index % SEGMENT_CYCLE.length];
  return cycled ?? "accentOrange";
}

function JourneyIntro({ intro }: { intro: string }): React.ReactElement {
  return (
    <div className="mt-6 max-w-3xl space-y-5 lg:grid lg:max-w-none lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)] lg:items-start lg:gap-x-10 lg:gap-y-2 lg:space-y-0">
      <h2 className="font-display text-4xl font-semibold tracking-tight text-text-primary lg:text-5xl">
        CRASH Lab Journey: The Milestone Timeline
      </h2>
      <p
        className="text-base leading-relaxed text-text-secondary md:text-[1.05rem] lg:max-w-xl lg:self-center lg:text-[1rem] lg:leading-snug xl:text-[1.05rem]"
        title={intro}
      >
        {intro}
      </p>
    </div>
  );
}

function AxisNode({ segment }: { segment: SegmentKey }): React.ReactElement {
  const s = SEGMENT_TAILWIND[segment];

  return (
    <span
      aria-hidden="true"
      className={cn(
        "absolute left-1/2 top-1/2 z-10 size-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-surface-panel shadow-sm lg:size-2.5",
        s.nodeOuter,
      )}
    />
  );
}

interface JourneyCardPanelsProps {
  item: JourneyItem;
  segment: SegmentKey;
}

function JourneyMilestoneDescription({
  body,
  paragraphClassName,
}: {
  body: string;
  paragraphClassName: string;
}): React.ReactElement {
  const baseId = useId();
  const descId = `${baseId}-journey-desc`;
  const measureRef = useRef<HTMLParagraphElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const remeasure = useCallback((): void => {
    const el = measureRef.current;
    if (!el) {
      return;
    }

    if (expanded) {
      setIsOverflowing(true);
      return;
    }

    setIsOverflowing(el.scrollHeight > el.clientHeight + 1);
  }, [expanded]);

  useLayoutEffect(() => {
    remeasure();

    const el = measureRef.current;
    if (!el) {
      return;
    }

    const observer = new ResizeObserver(() => {
      remeasure();
    });
    observer.observe(el);
    window.addEventListener("resize", remeasure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", remeasure);
    };
  }, [body, expanded, remeasure]);

  const control = !(isOverflowing || expanded) ? null : (
    <button
      aria-controls={descId}
      aria-expanded={expanded}
      className="ui-focus-ring mt-0.5 rounded-sm font-mono text-[0.65rem] uppercase tracking-[0.14em] text-accent-cyan transition-colors hover:text-text-primary lg:hidden"
      onClick={() => {
        setExpanded((v) => !v);
      }}
      type="button"
    >
      <span className="inline-flex items-center gap-1">
        {expanded ? "Show less" : "Read full"}
        <ChevronDown
          aria-hidden="true"
          className={cn(
            "size-3.5 shrink-0 transition-transform duration-200 ease-out",
            expanded && "rotate-180",
          )}
        />
      </span>
    </button>
  );

  return (
    <div className="min-w-0 space-y-1">
      <p className={cn(paragraphClassName, !expanded && "line-clamp-3 lg:group-hover/col:line-clamp-none")} id={descId} ref={measureRef}>
        {body}
      </p>
      {control}
    </div>
  );
}

function MilestoneTitlePanel({
  item,
  revealSide,
}: {
  item: JourneyItem;
  revealSide: "left" | "right";
}): React.ReactElement {
  return (
    <div className="relative h-[7.25rem] bg-surface-panel p-4 lg:h-[6.25rem] lg:p-3 xl:h-[6.75rem] xl:p-4">
      <div className="flex h-full items-center justify-center">
        <h3 className="line-clamp-3 max-w-[14rem] text-center font-sans text-base font-semibold leading-tight text-text-primary lg:text-[0.95rem] xl:text-base">
          {item.title}
        </h3>
      </div>
      <div
        className={cn(
          "absolute top-1/2 z-30 hidden w-[21rem] -translate-y-1/2 border border-white/10 bg-navy-900 p-5 text-white opacity-0 shadow-[0_24px_70px_rgba(15,23,42,0.24)] transition duration-200 ease-out lg:block",
          "pointer-events-none group-hover/card:pointer-events-auto group-hover/card:translate-x-0 group-hover/card:opacity-100 group-focus-within/card:pointer-events-auto group-focus-within/card:translate-x-0 group-focus-within/card:opacity-100",
          revealSide === "right"
            ? "left-[calc(100%+0.75rem)] -translate-x-2"
            : "right-[calc(100%+0.75rem)] translate-x-2",
        )}
      >
        <p className="font-sans text-sm font-semibold leading-snug text-white">{item.title}</p>
        <p className="mt-3 text-sm leading-relaxed text-white/80">
          {item.body}
        </p>
      </div>
    </div>
  );
}

function MilestonePeriodStrip({
  item,
}: {
  item: JourneyItem;
}): React.ReactElement {
  return (
    <div className="bg-navy-900 px-4 py-3 text-center font-mono text-sm font-semibold uppercase leading-none tracking-[0.12em] text-white lg:px-3 lg:py-3 lg:text-[0.8125rem] lg:tracking-[0.1em] xl:px-4 xl:text-sm">
      {item.period}
    </div>
  );
}

function JourneyMilestoneCard({
  item,
  segment,
  periodPosition,
  revealSide,
}: JourneyCardPanelsProps & {
  periodPosition: "top" | "bottom";
  revealSide: "left" | "right";
}): React.ReactElement {
  const s = SEGMENT_TAILWIND[segment];

  return (
    <div
      className={cn(
        "ui-focus-ring-panel group/card mx-0 overflow-visible border-2 bg-surface-panel transition-[box-shadow,transform] duration-200 ease-out hover:shadow-soft lg:border lg:border-solid",
        "lg:hover:-translate-y-0.5",
        s.border,
      )}
      tabIndex={0}
    >
      {periodPosition === "top" ? <MilestonePeriodStrip item={item} /> : null}
      <MilestoneTitlePanel item={item} revealSide={revealSide} />
      {periodPosition === "bottom" ? <MilestonePeriodStrip item={item} /> : null}
    </div>
  );
}

function ConnectorDown({ segment }: { segment: SegmentKey }): React.ReactElement {
  const s = SEGMENT_TAILWIND[segment];

  return (
    <div className="flex shrink-0 justify-center">
      <div className={cn("h-10 w-px lg:h-5", s.connector)} />
    </div>
  );
}

export function JourneyOutlookSection({
  futureOutlook,
  journey,
}: JourneyOutlookSectionProps): React.ReactElement {
  void futureOutlook;

  const timelineScrollerRef = useRef<HTMLDivElement>(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    const scroller = timelineScrollerRef.current;
    if (!scroller) {
      return;
    }

    function updateScrollCues(): void {
      if (!timelineScrollerRef.current) {
        return;
      }

      const el = timelineScrollerRef.current;
      const maxScrollLeft = el.scrollWidth - el.clientWidth;
      setHasOverflow(maxScrollLeft > 4);
      setCanScrollRight(el.scrollLeft < maxScrollLeft - 4);
    }

    updateScrollCues();
    scroller.addEventListener("scroll", updateScrollCues, { passive: true });
    window.addEventListener("resize", updateScrollCues);

    return () => {
      scroller.removeEventListener("scroll", updateScrollCues);
      window.removeEventListener("resize", updateScrollCues);
    };
  }, []);

  function handleScrollRight(): void {
    timelineScrollerRef.current?.scrollBy({
      left: 360,
      behavior: "smooth",
    });
  }

  const items = journey.items;

  return (
    <section className="py-8 lg:min-h-0 lg:pt-6 lg:pb-12 xl:pt-8 xl:pb-16" id="journey-outlook">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <JourneyIntro intro={journey.body} />

        <div className="mt-12 lg:mt-12 xl:mt-14">
          {/* Smaller breakpoints: horizontal scroll */}
          <div className="relative lg:hidden" aria-label="CRASH Lab journey timeline">
            {hasOverflow && canScrollRight ? (
              <>
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg-primary to-transparent" />
                <button
                  aria-label="Scroll timeline right"
                  className="ui-focus-ring-panel absolute right-2 top-[28%] z-20 inline-flex size-9 items-center justify-center rounded-none border border-border-default bg-surface-panel text-text-secondary shadow-sm transition hover:border-border-focus hover:text-text-primary"
                  onClick={handleScrollRight}
                  type="button"
                >
                  <ChevronRight aria-hidden="true" className="size-4" />
                </button>
              </>
            ) : null}
            <div
              className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:thin]"
              ref={timelineScrollerRef}
            >
              {items.map((item, index) => {
                const segment = segmentForItem(item, index);
                const s = SEGMENT_TAILWIND[segment];
                const Icon = sectionIconMap[item.icon as keyof typeof sectionIconMap];

                return (
                  <article
                    className="w-[85vw] max-w-[21rem] shrink-0 snap-start sm:w-[22rem]"
                    key={`${item.period}-${item.title}-m`}
                  >
                    <div className={cn("border-2 bg-surface-panel", s.border)}>
                      <div className="bg-navy-900 px-4 py-3 text-center font-mono text-sm font-semibold uppercase leading-none tracking-[0.12em] text-white">
                        {item.period}
                      </div>
                      <div className="flex items-start gap-3 p-4">
                        {Icon !== undefined ? (
                          <Icon aria-hidden="true" className="mt-1 size-5 shrink-0 text-text-secondary" />
                        ) : null}
                        <div className="min-w-0 space-y-2">
                          <h3 className="font-sans text-lg font-semibold leading-snug text-text-primary">
                            {item.title}
                          </h3>
                          <JourneyMilestoneDescription
                            body={item.body}
                            paragraphClassName="text-sm leading-relaxed text-text-secondary"
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* lg+: segmented horizontal axis + alternating above/below — no horizontal scroll */}
          <div aria-label="CRASH Lab journey timeline" className="hidden lg:block">
            <div className="flex min-w-0 items-end">
              {items.map((item, index) => {
                const segment = segmentForItem(item, index);
                const above = index % 2 === 1;
                const revealSide = index < Math.ceil(items.length / 2) ? "right" : "left";

                return (
                  <div
                    className="relative flex min-h-0 min-w-0 flex-1 flex-col justify-end px-1 hover:z-30 focus-within:z-30"
                    key={`${item.period}-${item.title}-band-up`}
                  >
                    {above ? (
                      <>
                        <JourneyMilestoneCard
                          item={item}
                          periodPosition="bottom"
                          revealSide={revealSide}
                          segment={segment}
                        />
                        <ConnectorDown segment={segment} />
                      </>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="flex h-3 w-full min-w-0 shrink-0 lg:h-2">
              {items.map((item, index) => {
                const segment = segmentForItem(item, index);
                const s = SEGMENT_TAILWIND[segment];

                return (
                  <div
                    className={cn("relative min-w-0 flex-1 first:rounded-l-sm last:rounded-r-sm", s.bar)}
                    key={`${item.period}-axis-${index}`}
                  >
                    <AxisNode segment={segment} />
                  </div>
                );
              })}
            </div>

            <div className="flex min-h-0 min-w-0 items-start">
              {items.map((item, index) => {
                const segment = segmentForItem(item, index);
                const below = index % 2 === 0;
                const revealSide = index < Math.ceil(items.length / 2) ? "right" : "left";

                return (
                  <div
                    className="relative flex min-w-0 flex-1 flex-col px-1 hover:z-30 focus-within:z-30"
                    key={`${item.period}-${item.title}-band-low`}
                  >
                    {below ? (
                      <>
                        <ConnectorDown segment={segment} />
                        <JourneyMilestoneCard
                          item={item}
                          periodPosition="top"
                          revealSide={revealSide}
                          segment={segment}
                        />
                      </>
                    ) : (
                      <div className="min-h-0 flex-1" aria-hidden />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
