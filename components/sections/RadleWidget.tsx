"use client";

import Image from "next/image";
import projectsSeed from "@/content/seed/projects.json";
import { BarChart3, Sparkles, UserRound } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { formatMonthYear } from "@/lib/utils/formatDate";
import { cn } from "@/lib/utils/cn";
import type { ProjectMetric } from "@/types/research";

interface RadleWidgetProps {
  metrics: ProjectMetric[];
  compact?: boolean;
  variant?: "hero" | "feature";
}

interface SeedProjectWithBenchmarkUpdate {
  slug: string;
  benchmarkUpdatedAt?: string;
}

type LogoType = "human" | "openai" | "gemini" | "grok" | "claude";

interface PlotItem {
  key: string;
  label: string;
  value: number;
  group: "human" | "ai";
  logoType: LogoType;
  barColor: string;
}

const plotItems: PlotItem[] = [
  {
    key: "radiologists",
    label: "Radiologists",
    value: 83,
    group: "human",
    logoType: "human",
    barColor: "#2567A9",
  },
  {
    key: "trainees",
    label: "Trainees",
    value: 45,
    group: "human",
    logoType: "human",
    barColor: "#2567A9",
  },
  {
    key: "gpt5",
    label: "GPT-5",
    value: 30,
    group: "ai",
    logoType: "openai",
    barColor: "#A34022",
  },
  {
    key: "gemini",
    label: "Gemini 2.5 Pro",
    value: 29,
    group: "ai",
    logoType: "gemini",
    barColor: "#A34022",
  },
  {
    key: "o3",
    label: "OpenAI o3",
    value: 23,
    group: "ai",
    logoType: "openai",
    barColor: "#A34022",
  },
  {
    key: "grok4",
    label: "Grok-4",
    value: 12,
    group: "ai",
    logoType: "grok",
    barColor: "#A34022",
  },
  {
    key: "claude",
    label: "Claude Opus 4.1",
    value: 1,
    group: "ai",
    logoType: "claude",
    barColor: "#A34022",
  },
];

const yTicks = [0, 20, 40, 60, 80, 100];
const traineeBenchmark = 45;

function getNumericMetric(metrics: ProjectMetric[], labelIncludes: string): number | null {
  const metric = metrics.find((item) =>
    item.label.toLowerCase().includes(labelIncludes.toLowerCase()),
  );

  if (!metric) {
    return null;
  }

  const parsedValue = Number.parseFloat(metric.value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsedValue) ? parsedValue : null;
}

function LogoMark({
  type,
  compact,
}: {
  type: LogoType;
  compact: boolean;
}): React.ReactElement {
  const iconClassName = compact ? "size-6" : "size-7 sm:size-8";

  if (type === "human") {
    return (
      <span className="inline-flex size-7 items-center justify-center rounded-none bg-[#2F64E9] text-white shadow-sm sm:size-8">
        <UserRound className="size-4 sm:size-4.5" />
      </span>
    );
  }

  if (type === "openai") {
    return (
      <Image
        alt="OpenAI"
        className="h-6 w-auto object-contain opacity-90 sm:h-7"
        height={28}
        src="/logos/openai.svg"
        width={28}
      />
    );
  }

  if (type === "gemini") {
    return (
      <span className="inline-flex items-center justify-center text-[#4A87F8]">
        <Sparkles className={iconClassName} strokeWidth={1.9} />
      </span>
    );
  }

  if (type === "grok") {
    return (
      <span className="text-2xl font-semibold italic leading-none text-[#1d1d1d] sm:text-3xl">
        g
      </span>
    );
  }

  return (
    <span className="text-xl leading-none text-[#E77747] sm:text-2xl">
      *
    </span>
  );
}

export function RadleWidget({
  compact = false,
  metrics,
  variant = "hero",
}: RadleWidgetProps): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();
  const benchmarkUpdatedAt = (
    projectsSeed as SeedProjectWithBenchmarkUpdate[]
  ).find((project) => project.slug === "radle-benchmark")?.benchmarkUpdatedAt;
  const subtitle = benchmarkUpdatedAt
    ? `Updated ${formatMonthYear(benchmarkUpdatedAt)}`
    : "Updated November 2025";
  const expertValue = getNumericMetric(metrics, "expert") ?? 83;
  const bestAiValue = getNumericMetric(metrics, "gpt") ?? 30;
  const expertAiGap = Math.max(expertValue - bestAiValue, 0);
  const chartHeightClass = compact ? "h-[17rem]" : "h-[19rem] sm:h-[22rem]";
  const minChartWidthClass = compact ? "min-w-[720px]" : "min-w-[860px]";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-token-md border border-border bg-bg-primary text-text-primary shadow-soft",
        compact ? "p-3" : variant === "hero" ? "p-4 sm:p-5" : "p-5 sm:p-6",
      )}
    >
      {compact ? null : (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
              <BarChart3 className="size-4" />
              RadLE Benchmark
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-text-primary">
              Diagnostic accuracy on RadLE v1
            </h3>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-text-secondary">
              Mean diagnostic accuracy across 50 cases. Humans are shown on the
              left, frontier AI models on the right.
            </p>
          </div>
          <span className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] text-text-tertiary">
            {subtitle}
          </span>
        </div>
      )}

      <div className="overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className={cn(minChartWidthClass, "pr-2")}>
          <div
            aria-label="Diagnostic accuracy benchmark bar chart"
            className="grid grid-cols-[44px_minmax(0,1fr)] gap-3"
            role="img"
          >
            <div className={cn("relative", chartHeightClass)}>
              <span className="absolute left-0 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap text-xs font-medium text-text-secondary sm:block">
                Diagnostic accuracy
              </span>
              {yTicks.map((tick) => (
                <span
                  className="absolute right-0 -translate-y-1/2 whitespace-nowrap text-xs font-medium text-text-tertiary"
                  key={tick}
                  style={{ bottom: `${tick}%` }}
                >
                  {tick}%
                </span>
              ))}
            </div>

            <div className={cn("relative border-b border-l border-border", chartHeightClass)}>
              {yTicks.map((tick) => (
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 border-t border-border/55"
                  key={`grid-${tick}`}
                  style={{ bottom: `${tick}%` }}
                />
              ))}

              <div
                aria-hidden="true"
                className="absolute inset-x-0 z-10 border-t border-dashed border-text-tertiary/70"
                style={{ bottom: `${traineeBenchmark}%` }}
              />

              <span
                className="absolute right-0 z-10 -translate-y-[calc(100%+0.25rem)] whitespace-nowrap text-xs font-semibold text-text-secondary"
                style={{ bottom: `${traineeBenchmark}%` }}
              >
                Trainee benchmark 45%
              </span>

              <div className="absolute inset-0 flex items-end justify-between gap-5 px-5">
                {plotItems.map((item, index) => (
                  <div className="relative h-full min-w-0 flex-1" key={item.key}>
                    <motion.div
                      animate={{ height: `${item.value}%` }}
                      className="absolute bottom-0 left-1/2 w-full max-w-[66px] -translate-x-1/2 rounded-t-none"
                      initial={{ height: shouldReduceMotion ? `${item.value}%` : 0 }}
                      style={{ backgroundColor: item.barColor }}
                      transition={{
                        delay: shouldReduceMotion ? 0 : index * 0.08,
                        duration: shouldReduceMotion ? 0 : 0.7,
                        ease: "easeOut",
                      }}
                    />

                    <motion.div
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1"
                      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                      style={{ bottom: `calc(${item.value}% + 0.45rem)` }}
                      transition={{
                        delay: shouldReduceMotion ? 0 : 0.2 + index * 0.08,
                        duration: shouldReduceMotion ? 0 : 0.45,
                        ease: "easeOut",
                      }}
                    >
                      <span className="whitespace-nowrap text-sm font-semibold leading-none text-text-primary">
                        {item.value}%
                      </span>
                      <LogoMark compact={compact} type={item.logoType} />
                    </motion.div>

                    <span className="absolute bottom-[-2.1rem] left-1/2 -translate-x-1/2 whitespace-nowrap text-center text-sm font-medium leading-none text-text-secondary">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="ml-[56px] mt-10 flex items-center gap-5 text-xs text-text-secondary">
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <span className="size-3 rounded-none bg-[#2567A9]" />
              Human readers
            </span>
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <span className="size-3 rounded-none bg-[#A34022]" />
              Frontier AI
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-border pt-5 sm:grid-cols-4">
        <div className="min-w-0">
          <p className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
            Expert
          </p>
          <p className="mt-1 whitespace-nowrap text-3xl font-bold tracking-tight text-text-primary">
            {expertValue}%
          </p>
        </div>
        <div className="min-w-0">
          <p className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
            Best AI
          </p>
          <p className="mt-1 whitespace-nowrap text-3xl font-bold tracking-tight text-text-primary">
            {bestAiValue}%
          </p>
        </div>
        <div className="min-w-0">
          <p className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
            Expert-AI Gap
          </p>
          <p className="mt-1 whitespace-nowrap text-3xl font-bold tracking-tight text-[#A34022]">
            {expertAiGap} pts
          </p>
        </div>
        <div className="min-w-0">
          <p className="whitespace-nowrap text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
            Reproducibility
          </p>
          <p className="mt-1 whitespace-nowrap text-3xl font-bold tracking-tight text-text-primary">
            k ≈ 0.64
          </p>
        </div>
      </div>
    </div>
  );
}
