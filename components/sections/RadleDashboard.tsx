"use client";

import Link from "next/link";
import { BarChart3 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type BarMark =
  | { kind: "human"; cohort: "boardCertified" | "trainee" }
  | { kind: "image"; src: string; label: string; intrinsicRatio?: "square" | "wide" }
  | { kind: "grok" }
  | { kind: "claude" };

const plotData: Array<{
  key: string;
  labelLines: string[];
  value: number;
  tone: "human" | "frontier";
  barColor: string;
  mark: BarMark;
}> = [
  {
    key: "radiologists",
    labelLines: ["Board-certified", "radiologists"],
    value: 83,
    tone: "human",
    barColor: "#4D50A8",
    mark: { cohort: "boardCertified", kind: "human" },
  },
  {
    key: "trainees",
    labelLines: ["Radiology", "trainees"],
    value: 45,
    tone: "human",
    barColor: "#6EA1E3",
    mark: { cohort: "trainee", kind: "human" },
  },
  {
    key: "gpt5",
    labelLines: ["GPT-5", "thinking"],
    value: 30,
    tone: "frontier",
    barColor: "#9FC9C1",
    mark: {
      kind: "image",
      intrinsicRatio: "square",
      src: "/logos/openai.svg",
      label: "OpenAI",
    },
  },
  {
    key: "gemini",
    labelLines: ["Gemini 2.5", "Pro"],
    value: 29,
    tone: "frontier",
    barColor: "#5A84DE",
    mark: {
      kind: "image",
      intrinsicRatio: "wide",
      src: "/logos/google-logo.svg",
      label: "Google Gemini",
    },
  },
  {
    key: "o3",
    labelLines: ["OpenAI o3"],
    value: 23,
    tone: "frontier",
    barColor: "#7D7D7D",
    mark: {
      kind: "image",
      intrinsicRatio: "square",
      src: "/logos/openai.svg",
      label: "OpenAI",
    },
  },
  {
    key: "grok4",
    labelLines: ["Grok 4"],
    value: 12,
    tone: "frontier",
    barColor: "#2C2F35",
    mark: { kind: "grok" },
  },
  {
    key: "claude",
    labelLines: ["Claude", "Opus 4.1"],
    value: 1,
    tone: "frontier",
    barColor: "#E0906A",
    mark: { kind: "claude" },
  },
];

const traineeBenchmark = 45;

const chartData = plotData.map((row) => ({
  ...row,
  label: row.labelLines.join(" "),
}));

const expertAccuracy = plotData.find((p) => p.key === "radiologists")!.value;
const bestAiAccuracy = Math.max(
  ...plotData.filter((p) => p.tone === "frontier").map((p) => p.value),
);
const expertAiGapPts = expertAccuracy - bestAiAccuracy;
const RADLE_KAPPA = "0.64";

/** Multi-line X labels: stack tspans under the axis tick. */
function RadleCategoryTickStacked(props: {
  x?: number | string;
  y?: number | string;
  payload?: { value?: string };
}) {
  const x = Number(props.x ?? 0);
  const y = Number(props.y ?? 0);
  const keyVal = props.payload?.value;
  const row = plotData.find((p) => p.key === keyVal);
  if (!row) {
    return null;
  }
  return (
    <text fill="#4a4a4a" fontSize={10} fontWeight={500} textAnchor="middle" x={x} y={y}>
      {row.labelLines.map((line, i) => (
        <tspan dy={i === 0 ? 11 : 10} key={`${row.key}-${line}`} x={x}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

/**
 * Logos/mark above each bar — percentages stay in tooltip only.
 * Recharts 3 strips non-SVG keys (including payload) before calling custom content — resolve row via index.
 */
function RadleBarTopMark(props: {
  x?: number | string;
  y?: number | string;
  width?: number | string;
  index?: number;
  payload?: (typeof chartData)[number];
}): React.ReactElement | null {
  const row =
    props.payload ??
    (typeof props.index === "number" ? chartData[props.index] : undefined);
  const mark = row?.mark;
  if (!row || !mark) {
    return null;
  }
  const barW = Number(props.width ?? 0);
  const barX = Number(props.x ?? 0);
  const barTop = Number(props.y ?? 0);
  const cx = barX + barW / 2;

  /** Full bar-slot width with a tiny inset; height stays visually short. */
  const MARK_H = 20;
  const GAP = 4;
  const markW = Math.max(barW - 2, 0);
  const top = barTop - MARK_H - GAP;
  const left = barX + (barW - markW) / 2;

  const iconScale = (MARK_H * 0.78) / 24;

  if (mark.kind === "human") {
    /** Board-certified — filled clinician silhouette; trainees — stroked graduation cap (24×24 viewBox). */
    return (
      <g transform={`translate(${left},${top})`}>
        <title>{row.label}</title>
        <rect fill={row.barColor} height={MARK_H} rx={MARK_H / 2} width={markW} />
        <g
          transform={`translate(${markW / 2},${MARK_H / 2}) scale(${iconScale}) translate(-12,-12)`}
        >
          {mark.cohort === "boardCertified" ? (
            <>
              <circle cx="12" cy="8" fill="white" r="5" stroke="none" />
              <path
                d="M20 21a8 8 0 0 0-16 0"
                fill="none"
                stroke="white"
                strokeLinecap="round"
                strokeWidth="2"
              />
            </>
          ) : (
            <g
              fill="none"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            >
              <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.113a2 2 0 0 0-1.66 0L2.6 9.086a1 1 0 0 0 0 1.838l8.58 3.908a2 2 0 0 0 1.66 0z" />
              <path d="M22 10v6" />
              <path d="M6 12.5V16a6 6 0 0 0 12 0v-3.5" />
            </g>
          )}
        </g>
      </g>
    );
  }

  if (mark.kind === "image") {
    const ratio = mark.intrinsicRatio ?? "wide";

    if (ratio === "square") {
      /* Square marks (e.g. OpenAI bloom): wide + short viewBox breaks `meet` inside a bar strip. */
      const side = Math.min(Math.max(barW - 2, 0), MARK_H);
      const sqLeft = barX + (barW - side) / 2;

      return (
        <g transform={`translate(${sqLeft},${top})`}>
          <title>{mark.label}</title>
          <image
            height={side}
            href={mark.src}
            preserveAspectRatio="xMidYMid meet"
            width={side}
            x={0}
            y={0}
          />
        </g>
      );
    }

    return (
      <g transform={`translate(${left},${top})`}>
        <title>{mark.label}</title>
        <image
          height={MARK_H}
          href={mark.src}
          preserveAspectRatio="xMidYMid meet"
          width={markW}
          x={0}
          y={0}
        />
      </g>
    );
  }

  const glyphPx = Math.min(Math.max(barW * 0.42, 16), MARK_H + 12);

  if (mark.kind === "grok") {
    return (
      <g transform={`translate(${cx}, ${top + MARK_H / 2})`}>
        <title>{row.label}</title>
        <text
          dominantBaseline="middle"
          fill="#1d1d1d"
          fontSize={glyphPx}
          fontStyle="italic"
          fontWeight={600}
          textAnchor="middle"
          x={0}
          y={0}
        >
          g
        </text>
      </g>
    );
  }

  return (
    <g transform={`translate(${cx}, ${top + MARK_H / 2})`}>
      <title>{row.label}</title>
      <text
        dominantBaseline="middle"
        fill="#E77747"
        fontSize={glyphPx}
        fontWeight={600}
        textAnchor="middle"
        x={0}
        y={0}
      >
        ✳
      </text>
    </g>
  );
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
          className="pointer-events-none absolute -inset-2 rounded-none blur-2xl"
          style={{
            background:
              "radial-gradient(circle at 18% 12%, rgba(17, 24, 39, 0.14) 0%, transparent 38%), radial-gradient(circle at 78% 18%, rgba(17, 24, 39, 0.08) 0%, transparent 34%)",
          }}
        />

        <Link
          aria-label="Open the RadLE benchmark research project page"
          className="group relative block overflow-hidden rounded-none border border-border bg-bg-primary text-text-primary shadow-panel"
          href="/research/radle-benchmark"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-15"
            style={{
              backgroundImage:
                "linear-gradient(transparent 50%, rgba(17, 24, 39, 0.02) 50%)",
              backgroundSize: "100% 4px",
            }}
          />

          <div className="relative flex h-9 items-center justify-between border-b border-border bg-bg-secondary/40 px-3 sm:h-10 sm:px-4 lg:px-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-none"
                  style={{ backgroundColor: "rgba(239, 68, 68, 0.7)" }}
                />
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-none"
                  style={{ backgroundColor: "rgba(234, 179, 8, 0.7)" }}
                />
                <span
                  aria-hidden="true"
                  className="size-2.5 rounded-none"
                  style={{ backgroundColor: "rgba(34, 197, 94, 0.8)" }}
                />
              </div>

              <div className="h-4 w-px bg-border" />

              <BarChart3
                aria-hidden="true"
                className="size-4 shrink-0 text-text-secondary"
              />
              <span className="text-sm font-semibold tracking-wide text-text-primary">
                RadLE Benchmark
              </span>
            </div>

            <div className="hidden items-center gap-2 sm:flex">
              <span
                aria-hidden="true"
                className="size-2 rounded-none"
                style={{ backgroundColor: "rgba(34, 197, 94, 0.78)" }}
              />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-tertiary">
                v1
              </span>
            </div>
          </div>

          <div className="relative p-3 sm:p-5 lg:p-6">
            <div className="rounded-token-md border border-black/5 bg-[#fdfdfc] text-[#222222]">
              <div className="px-3 py-3 sm:px-4 sm:py-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-serif text-base font-semibold text-[#1f1f1f] sm:text-2xl sm:leading-snug lg:text-[1.65rem]">
                      Figure 1: Diagnostic accuracy on RadLE v1
                    </p>
                    <p className="mt-0.5 text-[11px] leading-snug text-[#3f3f3f] sm:text-sm sm:leading-relaxed">
                      Mean diagnostic accuracy with 95% Wilson confidence
                      intervals. Humans on the left, frontier AI models on the
                      right.
                    </p>
                  </div>
                  <p className="text-xs font-semibold text-[#676767] sm:text-sm">N = 50 cases</p>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] text-[#2c2c2c] sm:text-xs">
                  <span className="inline-flex items-center gap-2">
                    <span className="size-3 rounded-none bg-[#4D50A8]" />
                    Human readers
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="size-3 rounded-none bg-[#9FC9C1]" />
                    Frontier AI
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <span className="h-0.5 w-6 border-t border-dashed border-[#8a8a8a]" />
                    Trainee benchmark (45%)
                  </span>
                </div>

                {/*
                  Narrow viewports: horizontal scroll so seven categories + two-line ticks
                  keep readable width instead of cramming into ~320px.
                */}
                <div className="-mx-3 mt-3 touch-pan-x sm:mx-0">
                  <div className="overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:thin] sm:overflow-visible [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:rounded-none [&::-webkit-scrollbar-thumb]:bg-black/15">
                    <div className="min-w-[44rem] px-3 sm:min-w-0 sm:w-full sm:px-0">
                      <div
                        aria-hidden="true"
                        className="h-[min(38vh,300px)] w-full sm:h-[min(34vh,280px)] lg:h-[300px]"
                      >
                        <ResponsiveContainer debounce={50} height="100%" width="100%">
                          <BarChart
                            accessibilityLayer
                            barCategoryGap="14%"
                            data={chartData}
                            margin={{ top: 34, right: 8, left: 8, bottom: 4 }}
                          >
                            <CartesianGrid stroke="#efefef" strokeDasharray="0" vertical={false} />
                            <XAxis
                              axisLine={{ stroke: "#d9d9d9" }}
                              dataKey="key"
                              height={58}
                              interval={0}
                              tick={(props) => <RadleCategoryTickStacked {...props} />}
                              tickLine={false}
                              type="category"
                            />
                            <YAxis
                              axisLine={{ stroke: "#d9d9d9" }}
                              domain={[0, 100]}
                              tick={{ fill: "#4a4a4a", fontSize: 11 }}
                              tickFormatter={(v) => `${v}%`}
                              tickLine={false}
                              ticks={[0, 20, 40, 60, 80, 100]}
                              width={52}
                            />
                            <Tooltip
                              contentStyle={{
                                borderRadius: "0px",
                                border: "1px solid #e5e5e5",
                                fontSize: "12px",
                              }}
                              cursor={{ fill: "rgba(0,0,0,0.04)" }}
                              formatter={(value, _name, item) => {
                                const v = value ?? item?.value ?? 0;
                                return [`${v}%`, "Accuracy"];
                              }}
                              labelFormatter={(_, items) => {
                                const item = items?.[0]?.payload as { label?: string } | undefined;
                                return item?.label ?? "";
                              }}
                            />
                            <ReferenceLine
                              stroke="#9f9f9f"
                              strokeDasharray="4 4"
                              strokeWidth={1}
                              y={traineeBenchmark}
                            />
                            <Bar
                              animationDuration={shouldReduceMotion ? 0 : 450}
                              animationEasing="ease-out"
                              dataKey="value"
                              isAnimationActive={!shouldReduceMotion}
                              radius={[4, 4, 0, 0]}
                            >
                              <LabelList
                                content={RadleBarTopMark as never}
                                dataKey="value"
                                position="top"
                              />
                              {chartData.map((entry) => (
                                <Cell fill={entry.barColor} key={entry.key} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                </div>

                <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-black/10 pt-3 sm:mt-5 sm:grid-cols-4 sm:gap-x-6 sm:pt-4 lg:gap-x-8">
                  <div className="min-w-0">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#797979] sm:text-[11px]">
                      Expert
                    </dt>
                    <dd className="mt-0.5 text-lg font-bold tabular-nums leading-none text-[#141414] sm:text-xl">
                      {expertAccuracy}%
                    </dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#797979] sm:text-[11px]">
                      Best AI
                    </dt>
                    <dd className="mt-0.5 text-lg font-bold tabular-nums leading-none text-[#141414] sm:text-xl">
                      {bestAiAccuracy}%
                    </dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#797979] sm:text-[11px]">
                      Expert-AI gap
                    </dt>
                    <dd className="mt-0.5 text-lg font-bold tabular-nums leading-none text-[#9c4638] sm:text-xl">
                      {expertAiGapPts} pts
                    </dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#797979] sm:text-[11px]">
                      Reproducibility
                    </dt>
                    <dd className="mt-0.5 text-lg font-bold tabular-nums leading-none text-[#141414] sm:text-xl">
                      κ&nbsp;≈&nbsp;
                      {RADLE_KAPPA}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col gap-1 border-t border-border bg-bg-secondary/30 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:px-4 lg:px-5">
            <span className="text-[9px] font-mono uppercase tracking-[0.26em] text-text-tertiary sm:text-[10px]">
              RSNA 2025 • Cutting Edge Oral Presentation
            </span>
            <span className="text-[9px] font-mono text-text-secondary sm:text-[10px]">
              crashlab.in/radle
            </span>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
