"use client";

import projectsSeed from "@/content/seed/projects.json";
import { motion } from "framer-motion";

import { Card } from "@/components/ui/Card";
import { formatMonthYear } from "@/lib/utils/formatDate";
import { cn } from "@/lib/utils/cn";
import type { ProjectMetric } from "@/types/research";

interface RadleWidgetProps {
  metrics: ProjectMetric[];
  compact?: boolean;
  variant?: "hero" | "feature";
}

const accentByType = {
  human: "bg-accent-cyan",
  ai: "bg-border",
  gap: "bg-accent-orange",
} satisfies Record<ProjectMetric["type"], string>;

interface SeedProjectWithBenchmarkUpdate {
  slug: string;
  benchmarkUpdatedAt?: string;
}

export function RadleWidget({
  compact = false,
  metrics,
  variant = "hero"
}: RadleWidgetProps): React.ReactElement {
  const benchmarkUpdatedAt = (projectsSeed as SeedProjectWithBenchmarkUpdate[]).find(
    (project) => project.slug === "radle-benchmark"
  )?.benchmarkUpdatedAt;
  const displayedMetrics = compact ? metrics.filter((metric) => metric.type !== "gap") : metrics;
  const subtitle = benchmarkUpdatedAt
    ? `Updated ${formatMonthYear(benchmarkUpdatedAt)}`
    : "Updated November 2025";
  const maxValue = Math.max(
    ...displayedMetrics.map(
      (metric) => Number.parseInt(metric.value.replace(/[^\d]/g, ""), 10) || 0
    ),
    100
  );

  return (
    <Card
      className={cn(
        "overflow-hidden border-border bg-bg-surface shadow-[var(--shadow-elevated)]",
        compact ? "p-4" : variant === "hero" ? "p-5 md:p-6" : "p-6 md:p-8",
      )}
    >
      {compact ? null : (
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">RadLE Live Benchmark</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">
              How far is AI from expert radiologists?
            </h3>
          </div>
          <span className="rounded-full border border-border px-3 py-1 text-xs uppercase tracking-[0.18em] text-text-secondary">
            {subtitle}
          </span>
        </div>
      )}

      <div className={cn("space-y-4", compact ? "" : "mt-8")}>
        {displayedMetrics.map((metric, index) => {
          const rawValue = Number.parseInt(metric.value.replace(/[^\d]/g, ""), 10) || 0;
          const width = Math.max((rawValue / maxValue) * 100, 12);

          return (
            <div key={metric.label}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <p className="text-sm text-text-secondary">{metric.label}</p>
                <p
                  className={cn(
                    "font-mono text-sm",
                    metric.type === "gap"
                      ? "text-accent-orange"
                      : "text-text-primary",
                  )}
                >
                  {metric.value}
                </p>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-bg-elevated">
                <motion.div
                  animate={{ width: `${width}%` }}
                  className={cn("h-full rounded-full", accentByType[metric.type])}
                  initial={{ width: 0 }}
                  transition={{ delay: index * 0.12, duration: 0.8, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
