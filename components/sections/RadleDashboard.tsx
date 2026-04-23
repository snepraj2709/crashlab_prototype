"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  ChartColumn,
  UserRound,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils/cn";

type ChartTone = "human" | "ai" | "muted";

interface ChartDatum {
  label: string;
  value: number;
  tone: ChartTone;
  isNew?: boolean;
}

interface KeyMetric {
  label: string;
  value: string;
  icon: LucideIcon;
  tone: "default" | "highlight";
}

const chartData = [
  { label: "Experts", value: 83, tone: "human" },
  { label: "Gemini", value: 57, tone: "ai", isNew: true },
  { label: "Web", value: 51, tone: "muted" },
  { label: "Trainees", value: 45, tone: "muted" },
  { label: "GPT-5", value: 30, tone: "muted" },
] satisfies ChartDatum[];

const keyMetrics = [
  { label: "Human", value: "83%", icon: UserRound, tone: "default" },
  { label: "Best AI", value: "57%", icon: Bot, tone: "highlight" },
  { label: "Gap", value: "26pt", icon: ChartColumn, tone: "default" },
] satisfies KeyMetric[];

const maxScore = Math.max(...chartData.map((item) => item.value));

function getBarClassName(tone: ChartTone): string {
  switch (tone) {
    case "human":
      return "shadow-[0_18px_40px_rgba(35,76,106,0.22)]";
    case "ai":
      return "shadow-[0_18px_40px_rgba(35,76,106,0.16)]";
    default:
      return "";
  }
}

function getBarStyle(tone: ChartTone): { background: string } {
  switch (tone) {
    case "human":
      return {
        background:
          "linear-gradient(180deg, rgba(112, 150, 182, 0.96) 0%, rgba(35, 76, 106, 0.92) 100%)",
      };
    case "ai":
      return {
        background:
          "linear-gradient(180deg, rgba(125, 165, 195, 0.94) 0%, rgba(63, 104, 136, 0.92) 100%)",
      };
    default:
      return {
        background:
          "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(226, 232, 240, 0.1) 100%)",
      };
  }
}

export function RadleDashboard(): React.ReactElement {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="w-full [perspective:2000px]"
      initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      viewport={{ amount: 0.2, once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className="relative w-full transform-gpu [transform-style:preserve-3d] [transform:rotateX(5deg)] sm:[transform:rotateX(6deg)] lg:[transform:rotateX(8deg)]"
        transition={{ duration: 0.3, ease: "easeOut" }}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.005 }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-2 rounded-[2rem] blur-2xl"
          style={{
            background:
              "radial-gradient(circle at 18% 12%, rgba(35, 76, 106, 0.22) 0%, transparent 38%), radial-gradient(circle at 78% 18%, rgba(35, 76, 106, 0.14) 0%, transparent 34%)",
          }}
        />

        <Link
          aria-label="Read the Gemini 3.0 RadLE benchmark update"
          className="group relative block overflow-hidden rounded-[1.75rem] border border-white/10 text-white shadow-panel"
          href="/blog/gemini-3-0-radle"
          style={{
            background:
              "linear-gradient(180deg, rgba(15, 23, 42, 0.98) 0%, rgba(17, 24, 39, 0.98) 100%)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(transparent 50%, rgba(255, 255, 255, 0.018) 50%)",
              backgroundSize: "100% 4px",
            }}
          />

          <div className="relative flex h-11 items-center justify-between border-b border-white/10 bg-white/5 px-4 sm:h-12 sm:px-5 lg:px-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: "rgba(248, 113, 113, 0.7)" }}
                />
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: "rgba(250, 204, 21, 0.7)" }}
                />
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-full"
                  style={{ backgroundColor: "rgba(35, 76, 106, 0.8)" }}
                />
              </div>

              <div className="h-4 w-px bg-white/10" />

              <BarChart3
                aria-hidden="true"
                className="size-4 shrink-0 text-accent-cyan"
              />
              <span className="text-sm font-semibold tracking-wide text-white/90">
                RadLE Benchmark
              </span>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <span
                aria-hidden="true"
                className="size-2 rounded-full"
                style={{ backgroundColor: "rgba(112, 150, 182, 0.78)" }}
              />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/45">
                Live
              </span>
            </div>
          </div>

          <div className="relative flex flex-col lg:min-h-[34rem] lg:flex-row">
            <div className="w-full border-b border-white/5 p-5 sm:p-6 lg:w-[70%] lg:border-b-0 lg:border-r lg:p-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-white/90">
                  Performance Comparison
                </h3>
                <span
                  className="w-fit rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80"
                  style={{ backgroundColor: "rgba(35, 76, 106, 0.26)" }}
                >
                  RSNA 2025
                </span>
              </div>

              <div className="mt-8 sm:mt-10">
                <div className="flex h-[18rem] items-end gap-3 sm:h-[20rem] sm:gap-4 lg:h-[24rem] lg:gap-6">
                  {chartData.map((item) => {
                    const barHeight = Math.max((item.value / maxScore) * 100, 20);

                    return (
                      <div
                        className="grid h-full flex-1 grid-rows-[4.5rem_minmax(0,1fr)_2.25rem] gap-3 sm:grid-rows-[5rem_minmax(0,1fr)_2.75rem]"
                        key={item.label}
                      >
                        <div className="flex flex-col items-center justify-end gap-1.5">
                          {item.isNew ? (
                            <span
                              className="rounded-md px-2 py-1 text-[9px] font-bold uppercase tracking-[0.18em] text-white"
                              style={{ backgroundColor: "rgba(112, 150, 182, 0.72)" }}
                            >
                              New
                            </span>
                          ) : (
                            <span aria-hidden="true" className="h-[1.625rem]" />
                          )}
                          <span
                            className={cn(
                              "font-mono text-base font-semibold sm:text-2xl",
                              item.tone === "muted" ? "text-white/52" : "text-white",
                            )}
                          >
                            {item.value}%
                          </span>
                        </div>

                        <div className="flex items-end">
                          <div
                            className={cn(
                              "w-full rounded-t-lg sm:rounded-t-xl",
                              getBarClassName(item.tone),
                            )}
                            style={{
                              ...getBarStyle(item.tone),
                              height: `${barHeight}%`,
                            }}
                          />
                        </div>

                        <div className="pt-1 text-center text-[11px] font-medium text-white/60 sm:text-sm">
                          {item.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[30%]">
              <div className="border-b border-white/5 p-5 sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/38">
                  Key Metrics
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-1 lg:gap-4">
                  {keyMetrics.map((metric) => (
                    <div
                      className={cn(
                        "rounded-token-md border p-3 sm:p-4",
                        metric.tone === "highlight"
                          ? "border-[rgba(35,76,106,0.34)]"
                          : "border-white/5",
                      )}
                      key={metric.label}
                      style={{
                        backgroundColor:
                          metric.tone === "highlight"
                            ? "rgba(35, 76, 106, 0.14)"
                            : "rgba(255, 255, 255, 0.05)",
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/38 sm:text-[10px]">
                            {metric.label}
                          </p>
                          <p className="mt-1 font-mono text-xl font-semibold text-white sm:text-3xl">
                            {metric.value}
                          </p>
                        </div>

                        <div
                          aria-hidden="true"
                          className="hidden size-12 shrink-0 items-center justify-center rounded-full lg:flex"
                          style={{ backgroundColor: "rgba(35, 76, 106, 0.18)" }}
                        >
                          <metric.icon className="size-5 text-accent-cyan" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-white/38">
                  Insight
                </p>

                <div
                  className="mt-4 rounded-token-md border p-4 sm:p-5"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(35, 76, 106, 0.16) 0%, rgba(255, 255, 255, 0.02) 100%)",
                    borderColor: "rgba(35, 76, 106, 0.28)",
                  }}
                >
                  <p className="text-base font-medium leading-relaxed text-white/86">
                    First AI to beat radiology trainees
                  </p>
                  <span
                    className="mt-4 inline-flex rounded-lg px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80"
                    style={{ backgroundColor: "rgba(112, 150, 182, 0.18)" }}
                  >
                    +12% vs Trainees
                  </span>
                </div>

                <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/88">
                  <span>Read full analysis</span>
                  <ArrowRight aria-hidden="true" className="size-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col gap-2 border-t border-white/5 bg-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 lg:px-6">
            <span className="text-[9px] font-mono uppercase tracking-[0.26em] text-white/58 sm:text-[10px]">
              RSNA 2025 • Cutting Edge Oral Presentation
            </span>
            <span className="text-[9px] font-mono text-white/82 sm:text-[10px]">
              crashlab.in/radle
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
