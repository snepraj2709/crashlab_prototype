"use client";

import { motion } from "framer-motion";

import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";
import type { ProjectMetric } from "@/types/research";

interface RadleWidgetProps {
  metrics: ProjectMetric[];
  compact?: boolean;
  variant?: "hero" | "feature";
}

const accentByType = {
  human: "bg-accent-cyan",
  ai: "bg-accent-orange",
  gap: "bg-white/40"
} satisfies Record<ProjectMetric["type"], string>;

export function RadleWidget({
  compact = false,
  metrics,
  variant = "hero"
}: RadleWidgetProps): React.ReactElement {
  const displayedMetrics = compact ? metrics.filter((metric) => metric.type !== "gap") : metrics;
  const maxValue = Math.max(
    ...displayedMetrics.map(
      (metric) => Number.parseInt(metric.value.replace(/[^\d]/g, ""), 10) || 0
    ),
    100
  );

  return (
    <Card
      className={cn(
        "overflow-hidden border-white/10 bg-[linear-gradient(180deg,rgba(17,24,39,0.96),rgba(10,15,30,0.96))]",
        compact ? "p-4" : variant === "hero" ? "p-5 md:p-6" : "p-6 md:p-8"
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
          <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-text-secondary">
            Updated from seed data
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
                <p className="font-mono text-sm text-white">{metric.value}</p>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/6">
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
