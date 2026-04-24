"use client";

import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowUpRight,
  Beaker,
  Building2,
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

const futureOutlookHighlight = "50+ hospitals by 2027.";
const stickyTopOffset = 128;

function JourneyIntro({ body }: { body: string }): React.ReactElement {
  return (
    <div>
      <h2 className="font-display text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
        Journey &amp;
        <span className="block italic text-accent-cyan">Outlook</span>
      </h2>
      <p className="mt-8 max-w-md text-lg leading-9 text-text-secondary">
        {body}
      </p>
    </div>
  );
}

export function JourneyOutlookSection({
  futureOutlook,
  journey,
}: JourneyOutlookSectionProps): React.ReactElement {
  const desktopRailRef = useRef<HTMLDivElement>(null);
  const desktopIntroRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const futureCardRef = useRef<HTMLElement>(null);

  const [dockOffset, setDockOffset] = useState<number | null>(null);
  const [isDocked, setIsDocked] = useState(false);

  useEffect(() => {
    function updateDockState(): void {
      if (
        !desktopRailRef.current ||
        !desktopIntroRef.current ||
        !rightColumnRef.current ||
        !futureCardRef.current
      ) {
        return;
      }

      if (window.innerWidth < 1024) {
        setIsDocked(false);
        setDockOffset(null);
        return;
      }

      const rightColumnRect = rightColumnRef.current.getBoundingClientRect();
      const futureCardRect = futureCardRef.current.getBoundingClientRect();
      const introHeight =
        desktopIntroRef.current.getBoundingClientRect().height;
      const stickyBottom = stickyTopOffset + introHeight;
      const nextDockOffset = Math.max(
        0,
        futureCardRect.bottom - rightColumnRect.top - introHeight,
      );

      setDockOffset(nextDockOffset);
      setIsDocked(futureCardRect.bottom <= stickyBottom);
    }

    updateDockState();

    window.addEventListener("resize", updateDockState);
    window.addEventListener("scroll", updateDockState, { passive: true });

    return () => {
      window.removeEventListener("resize", updateDockState);
      window.removeEventListener("scroll", updateDockState);
    };
  }, []);

  return (
    <section className="py-8 lg:py-12" id="journey-outlook">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[minmax(18rem,0.82fr)_minmax(0,1.18fr)] lg:gap-20 xl:gap-28">
          <div className="lg:hidden">
            <JourneyIntro body={journey.body} />
          </div>

          <div className="relative hidden lg:block" ref={desktopRailRef}>
            <div
              className={cn(
                "max-w-md",
                isDocked ? "absolute left-0 right-0" : "sticky top-32",
              )}
              ref={desktopIntroRef}
              style={
                isDocked && dockOffset !== null
                  ? { top: dockOffset }
                  : undefined
              }
            >
              <JourneyIntro body={journey.body} />
            </div>
          </div>

          <div
            className="space-y-14 lg:space-y-20 lg:pr-6"
            ref={rightColumnRef}
          >
            <div aria-label="CRASH Lab journey timeline" className="relative">
              <div className="relative before:absolute before:bottom-0 before:left-6 before:top-6 before:w-px before:bg-border-subtle">
                {journey.items.map((item, index) => {
                  const Icon =
                    sectionIconMap[item.icon as keyof typeof sectionIconMap];
                  const isFeatured = item.isFeatured === true;

                  return (
                    <article
                      className={cn(
                        "relative snap-start pl-20",
                        index === journey.items.length - 1
                          ? "pb-6"
                          : "pb-14 lg:pb-20",
                      )}
                      key={`${item.period}-${item.title}`}
                    >
                      <div
                        className={cn(
                          "absolute left-0 top-0 z-10 flex size-12 items-center justify-center rounded-full border transition-all",
                          isFeatured
                            ? "border-navy-900 bg-navy-900 text-white shadow-soft"
                            : "border-border-default bg-surface-panel text-text-secondary shadow-[0_0_0_6px_rgba(250,250,248,0.98)]",
                        )}
                      >
                        <Icon
                          aria-hidden="true"
                          className={cn(
                            "size-5",
                            isFeatured ? "text-white" : "text-text-secondary",
                          )}
                        />
                      </div>

                      <div className="space-y-4">
                        <p className="font-mono text-sm uppercase tracking-[0.18em] text-text-secondary">
                          {item.period}
                        </p>
                        <h3
                          className={cn(
                            "max-w-3xl font-sans text-[2rem] font-semibold leading-[1.15] tracking-tight text-text-primary lg:text-[2.15rem]",
                          )}
                        >
                          {item.title}
                        </h3>
                        <p
                          className={cn(
                            "max-w-3xl text-lg leading-8 text-text-secondary lg:text-[1.2rem] lg:leading-9",
                          )}
                        >
                          {item.body}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <article
              className="overflow-hidden rounded-[2rem] bg-navy-900 px-8 py-10 shadow-soft sm:px-10 lg:px-14 lg:py-14"
              ref={futureCardRef}
            >
              <h3 className="font-display text-3xl font-semibold text-white md:text-4xl">
                {futureOutlook.heading}
              </h3>
              <p className="mt-6 max-w-4xl font-sans text-lg font-normal leading-relaxed text-white/90 md:text-xl">
                {futureOutlook.body.replace(futureOutlookHighlight, "")}
                <span className="font-medium text-white">
                  {futureOutlookHighlight}
                </span>
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
