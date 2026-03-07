"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { MetricTile, SectionLabel } from "@/components/ui";

const metrics = [
  { value: "15+", label: "Papers accepted at top conferences" },
  { value: "6", label: "RSNA 2025 accepted abstracts" },
  { value: "#1", label: "Indian lab by AI abstracts at RSNA 2025" },
  { value: "< 8mo", label: "From zero to 15 papers — founded April 2025" },
  { value: "4", label: "Research pillars: Data, Benchmarks, Design, Models" },
  { value: "3", label: "International institutional collaborations" }
];

export function ImpactStrip(): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionLabel number="03" text="Research Impact" />
        <div className="mt-6 flex items-end justify-between gap-8">
          <h2 className="max-w-3xl font-display text-4xl text-white lg:text-5xl">
            Velocity that looks like a startup. Standards that look like science.
          </h2>
        </div>
        <div className="mt-12 overflow-x-auto pb-2" ref={ref}>
          <div className="grid min-w-[980px] gap-6 md:grid-cols-2 xl:min-w-0 xl:grid-cols-6">
            {metrics.map((metric, index) => (
              <motion.div
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                initial={false}
                key={metric.label}
                transition={{ delay: index * 0.08, duration: 0.4 }}
              >
                <MetricTile label={metric.label} value={metric.value} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
