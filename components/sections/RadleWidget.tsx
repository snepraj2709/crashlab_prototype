"use client";

import projectsSeed from "@/content/seed/projects.json";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/Card";
import { formatMonthYear } from "@/lib/utils/formatDate";
import { cn } from "@/lib/utils/cn";
import type { ProjectMetric } from "@/types/research";

interface BarStyle {
  backgroundColor: string;
  opacity: number;
  labelColor?: string;
}

type MetricWithOptionalId = ProjectMetric & {
  id?: string;
};

const METRIC_BAR_STYLES: Record<string, BarStyle> = {
  "expert-radiologists": {
    backgroundColor: "var(--radle-human-primary)",
    opacity: 1,
  },
  "gemini-3-pro": {
    backgroundColor: "var(--radle-ai-primary)",
    opacity: 1,
  },
  "radiology-trainees": {
    backgroundColor: "var(--radle-human-secondary)",
    opacity: 0.55,
  },
  "gpt-5-thinking": {
    backgroundColor: "var(--radle-ai-secondary)",
    opacity: 0.5,
  },
  "human-ai-gap": {
    backgroundColor: "var(--radle-gap)",
    opacity: 1,
    labelColor: "var(--radle-gap)",
  },
};

const DEFAULT_BAR_STYLE: BarStyle = {
  backgroundColor: "var(--color-accent-cyan)",
  opacity: 0.6,
};

function getMetricId(metric: MetricWithOptionalId): string {
  if (metric.id) {
    return metric.id;
  }

  return metric.label
    .toLowerCase()
    .replace(/\.0\b/g, "")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

interface RadleWidgetProps {
  metrics: ProjectMetric[];
  compact?: boolean;
  variant?: "hero" | "feature";
}

interface SeedProjectWithBenchmarkUpdate {
  slug: string;
  benchmarkUpdatedAt?: string;
}

export function RadleWidget({
  compact = false,
  metrics,
  variant = "hero",
}: RadleWidgetProps): React.ReactElement {
  const benchmarkUpdatedAt = (
    projectsSeed as SeedProjectWithBenchmarkUpdate[]
  ).find((project) => project.slug === "radle-benchmark")?.benchmarkUpdatedAt;
  const displayedMetrics = (
    compact ? metrics.filter((metric) => metric.type !== "gap") : metrics
  ) as MetricWithOptionalId[];
  const subtitle = benchmarkUpdatedAt
    ? `Updated ${formatMonthYear(benchmarkUpdatedAt)}`
    : "Updated November 2025";
  const barHeightClass = compact ? "h-1.5" : "h-2";

  return (
    <Card
      className={cn(
        "overflow-hidden border-border bg-bg-surface shadow-[var(--shadow-elevated)]",
        compact ? "p-4" : variant === "hero" ? "p-5 md:p-6" : "p-6 md:p-8",
      )}
    >
      {compact ? null : (
        <>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">
                RadLE Live Benchmark
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-text-primary">
                How far is AI from expert radiologists?
              </h3>
            </div>
            <span className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.18em] text-text-secondary">
              {subtitle}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div
                aria-hidden="true"
                className="h-3 w-3 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "var(--radle-human-primary)" }}
              />
              <span className="text-xs uppercase tracking-wide text-text-tertiary">
                Human
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <div
                aria-hidden="true"
                className="h-3 w-3 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "var(--radle-ai-primary)" }}
              />
              <span className="text-xs uppercase tracking-wide text-text-tertiary">
                AI Model
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <div
                aria-hidden="true"
                className="h-3 w-3 flex-shrink-0 rounded-full"
                style={{ backgroundColor: "var(--radle-gap)" }}
              />
              <span className="text-xs uppercase tracking-wide text-text-tertiary">
                Gap
              </span>
            </div>
          </div>
        </>
      )}

      <div className={cn("space-y-4", compact ? "" : "mt-4")}>
        {displayedMetrics.map((metric, index) => {
          const metricId = getMetricId(metric);
          const barStyle = METRIC_BAR_STYLES[metricId] ?? DEFAULT_BAR_STYLE;
          const numericValue =
            Number.parseFloat(metric.value.replace(/[^0-9.]/g, "")) || 0;
          const barWidth = Math.min(numericValue, 100);
          const valueLabelStyle = barStyle.labelColor
            ? { color: barStyle.labelColor }
            : { color: "var(--color-text-primary)" };

          return (
            <div key={metricId} className="space-y-1.5">
              <div className="mb-2 flex items-center justify-between gap-4">
                <p className="text-sm text-text-secondary">{metric.label}</p>
                <p
                  className="font-mono text-sm font-semibold"
                  style={valueLabelStyle}
                >
                  {metric.value}
                </p>
              </div>

              <div
                aria-hidden="true"
                className={cn(
                  "w-full overflow-hidden rounded-full",
                  barHeightClass,
                )}
                role="presentation"
                style={{ backgroundColor: "var(--radle-track)" }}
              >
                <motion.div
                  animate={{ width: `${barWidth}%` }}
                  className={cn("rounded-full", barHeightClass)}
                  initial={{ width: 0 }}
                  style={{
                    backgroundColor: barStyle.backgroundColor,
                    opacity: barStyle.opacity,
                  }}
                  transition={{
                    delay: index * 0.12,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
