"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";

import { Button, ProofChip, SectionLabel } from "@/components/ui";

const proofChips = [
  {
    label: "RadLE Benchmark — RSNA 2025 Cutting Edge",
    variant: "filled" as const,
  },
  { label: "RSNA Trainee Research Prize 2023", variant: "outline" as const },
  { label: "15 Papers — Founded April 2025", variant: "outline" as const },
  { label: "Harvard × AIIMS × Ashoka", variant: "outline" as const },
];

export function HeroSection(): React.ReactElement {
  return (
    <section className="relative min-h-screen overflow-hidden bg-bg-primary">
      <div className="pointer-events-none absolute inset-0 bg-hero-grid" />
      <div
        aria-hidden="true"
        className="hero-mesh pointer-events-none absolute inset-0"
        style={{ opacity: "var(--mesh-opacity)" }}
      />

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-14 px-6 pb-20 pt-32 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <SectionLabel number="01" text="CRASH LAB — ASHOKA UNIVERSITY" />
          <h1 className="mt-6 font-display text-6xl leading-[0.92] text-text-primary lg:text-7xl">
            Responsible AI,
            <br />
            built for Healthcare.
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-text-secondary lg:text-lg">
            CRASH Lab is an interdisciplinary research group at the intersection
            of clinical practice and frontier AI — building benchmarks that hold
            AI accountable, tools clinicians trust, and infrastructure for
            India&apos;s healthcare future.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            {proofChips.map((chip, index) => (
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 10 }}
                key={chip.label}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
              >
                <ProofChip label={chip.label} variant={chip.variant} />
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/join" size="lg">
              Explore Open Projects <ArrowRight className="size-4" />
            </Button>
            <Button href="/people" size="lg" variant="outline">
              Meet the Team
            </Button>
          </div>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="overflow-hidden rounded-[2rem] border border-border bg-bg-surface shadow-[var(--shadow-elevated)]">
            <Image
              alt="RadLE benchmark comparison visualization"
              className="h-auto w-full object-cover"
              height={1358}
              priority
              src="/radle-image.png"
              width={2000}
            />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          <ChevronDown className="size-8 text-text-tertiary" />
        </motion.div>
      </div>
    </section>
  );
}
