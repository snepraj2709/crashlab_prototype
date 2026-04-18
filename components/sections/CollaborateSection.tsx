import { ArrowRight } from "lucide-react";

const rows = [
  {
    who: "Industry AI teams",
    why: "Validate your model on RadLE v1. Commission India-specific studies.",
    cta: "Commission a study",
    href: "/collaborate",
  },
  {
    who: "Clinical researchers",
    why: "Join RadLE-X or propose a cohort. Expert readers and data access provided.",
    cta: "Propose a study",
    href: "/join",
  },
  {
    who: "Funders & policy",
    why: "Back the benchmark infrastructure the field is missing.",
    cta: "Talk to the lab",
    href: "/contact",
  },
];

export function CollaborateSection(): React.ReactElement {
  return (
    <section
      id="collaborate"
      className="relative overflow-hidden py-28 lg:py-36"
      style={{ background: "#0F172A", color: "#E8EDF5" }}
    >
      {/* Subtle background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.4,
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(35,76,106,.6) 0, transparent 30%), radial-gradient(circle at 88% 80%, rgba(234,88,12,.25) 0, transparent 28%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 grid gap-14 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="font-sans text-[12px] font-medium uppercase tracking-[0.22em] text-accent-orange">
              06 — COLLABORATE
            </p>
            <h2 className="mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.035em] text-white lg:text-6xl">
              Hold your model
              <br />
              to the hard test.
            </h2>
          </div>
          <div>
            <p className="max-w-[480px] text-[17px] leading-relaxed text-white/78">
              Run your model against RadLE. Partner on the next benchmark. Fund
              infrastructure India&apos;s healthcare AI actually needs.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#radle"
                className="inline-flex h-[52px] items-center gap-2 rounded-full border border-white bg-white px-6 text-[15px] font-medium text-[#0F172A] shadow-[0_8px_24px_rgba(0,0,0,.25)] transition-opacity hover:opacity-90"
              >
                Explore the RadLE Benchmark <ArrowRight className="size-4" />
              </a>
              <a
                href="mailto:suvrankar.datta@ashoka.edu.in"
                className="inline-flex h-[52px] items-center gap-2 rounded-full border border-white/28 bg-transparent px-6 text-[15px] font-medium text-white transition-colors hover:border-white/50"
              >
                Email the lab
              </a>
            </div>
          </div>
        </div>

        {/* Audience cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {rows.map((r) => (
            <div
              key={r.who}
              className="flex min-h-[220px] flex-col gap-4 rounded-token-md border border-white/12 bg-white/[0.03] p-7"
            >
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-accent-orange">
                For
              </div>
              <h3 className="font-display text-[22px] font-semibold leading-tight tracking-tight text-white">
                {r.who}
              </h3>
              <p className="flex-1 text-[14.5px] leading-relaxed text-white/72">
                {r.why}
              </p>
              <a
                href={r.href}
                className="mt-1 inline-flex items-center gap-1.5 text-sm font-medium text-white hover:underline"
              >
                {r.cta} <ArrowRight className="size-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
