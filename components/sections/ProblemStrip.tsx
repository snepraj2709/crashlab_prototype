import { TrendingUp, ClipboardList, ShieldCheck, Database, Users } from "lucide-react";

const benchmarkModels = [
  { label: "GPT-4 VISION", score: 99.2 },
  { label: "LLAMA 3.1", score: 98.5 },
  { label: "CLAUDE 3.5", score: 97.8 },
];

const clinicalScores = [
  { label: "EXPERT RADIOLOGISTS", score: 83, barClass: "bg-steel-300" },
  { label: "GEMINI 3.0 PRO", score: 57, barClass: "bg-steel-400" },
  { label: "RADIOLOGY TRAINEES", score: 45, barClass: "bg-steel-500" },
];

const yardstickMetrics = [
  { Icon: Database, label: "80k+ Clinical Cases" },
  { Icon: Users, label: "50 Board-Certified Radiologists" },
];

export function ProblemStrip(): React.ReactElement {
  return (
    <section className="border-t border-border py-12 lg:py-20" id="problem">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
          <div>
            <h2 className="font-display text-4xl text-text-primary lg:text-5xl">
              AI in healthcare has outgrown its benchmarks.
            </h2>
          </div>
          <div>
          <p className="mt-4 max-w-2xl text-base leading-8 text-text-secondary">
            Standard evaluation metrics in medical AI are failing to capture the nuances of clinical reasoning.
            We are transitioning from simple pattern recognition to accountable healthcare diagnostics.
          </p>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {/* Card 1 — Benchmark inflation */}
          <article className="flex flex-col p-6">
            <TrendingUp
              className="mb-5 h-6 w-6 text-text-secondary"
              aria-hidden="true"
            />
            <h3 className="font-display text-2xl font-medium text-text-primary">
              Benchmark inflation
            </h3>
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Public radiology benchmarks have saturated. New models report higher scores on
              tests that no longer reflect clinical reasoning.
            </p>

            <div className="mt-6 flex flex-col gap-4">
              {benchmarkModels.map(({ label, score }) => (
                <div key={label}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.18em] text-text-tertiary">
                      {label}
                    </span>
                    <span className="font-mono text-xs text-text-secondary">{score}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-steel-100">
                    <div
                      className="h-full rounded-full bg-steel-400 transition-all"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Card 2 — Clinical reality gap (dark) */}
          <article className="flex flex-col bg-navy-900 p-6 text-white rounded-2xl">
            <ClipboardList
              className="mb-5 h-6 w-6 text-white/70"
              aria-hidden="true"
            />
            <h3 className="font-display text-2xl font-medium text-white">
              Clinical reality gap
            </h3>
            <p className="mt-3 text-sm leading-7 text-white/60">
              In practice, frontier multimodal AI still misses the reasoning steps a trained
              radiologist performs automatically on difficult cases.
            </p>

            <div className="mt-6 flex flex-col gap-4">
              {clinicalScores.map(({ label, score, barClass }) => (
                <div key={label}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-[0.18em] text-white/50">
                      {label}
                    </span>
                    <span className="font-mono text-xs text-white/70">{score}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full transition-all ${barClass}`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          {/* Card 3 — No accountable yardstick */}
          <article className="flex flex-col p-6">
            <ShieldCheck
              className="mb-5 h-6 w-6 text-text-secondary"
              aria-hidden="true"
            />
            <h3 className="font-display text-2xl font-medium text-text-primary">
              No accountable yardstick
            </h3>
            <p className="mt-3 text-sm leading-7 text-text-secondary">
              Hospitals, funders, and policy-makers need a reasoning-heavy benchmark that
              separates hype from signal and was built with real readers.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              {yardstickMetrics.map(({ Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 border-t border-border-subtle pt-3"
                >
                  <Icon
                    className="h-4 w-4 shrink-0 text-text-tertiary"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-text-default">{label}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
