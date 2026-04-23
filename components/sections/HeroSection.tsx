"use client";

import { motion } from "framer-motion";
import { ChevronDown, FileText, Globe, Microscope } from "lucide-react";
import { Button } from "@/components/ui";

const stats = [
  { value: "15+", label: "papers", icon: FileText },
  { value: "6", label: "RSNA abstracts", icon: Microscope },
  { value: "3", label: "institutional collaborations", icon: Globe },
];

export function HeroSection(): React.ReactElement {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-bg-primary pb-20 pt-36 lg:pb-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.05,
          backgroundImage:
            "radial-gradient(circle at 18% 28%, rgba(35,76,106,.6) 0, transparent 22%), radial-gradient(circle at 86% 18%, rgba(234,88,12,.5) 0, transparent 16%), radial-gradient(circle at 55% 78%, rgba(35,76,106,.4) 0, transparent 20%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <h1 className="mt-6 font-display font-semibold leading-[0.92] tracking-[-0.035em] text-text-primary text-[clamp(2.75rem,7vw,4.75rem)]">
          Responsible AI,
          <br />
          built for <span className="text-[#244c6a]">Healthcare.</span>
        </h1>

        <p className="mt-8 max-w-3xl text-base leading-8 text-text-secondary lg:text-lg">
          CRASH Lab is an interdisciplinary research group at the intersection
          of clinical practice and frontier AI — building benchmarks that hold
          AI accountable, tools clinicians trust, and infrastructure for
          India&apos;s healthcare future.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button
            className="sm:min-w-[15.5rem]"
            href="/join"
            size="lg"
          >
            Join the team
          </Button>
          <Button
            className="sm:min-w-[15.5rem]"
            href="/collaborate"
            size="lg"
            variant="secondary"
          >
            Collaborate with the lab
          </Button>
        </div>

        <div className="mt-12 border-y border-border py-5">
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap md:items-center md:gap-0">
            {stats.map((stat, index) => (
              <div
                className="flex items-center gap-3 md:pr-6 md:mr-6 md:border-r md:border-border last:md:mr-0 last:md:border-r-0 last:md:pr-0"
                key={stat.label}
              >
                <stat.icon
                  aria-hidden="true"
                  className="size-4 shrink-0 text-accent-cyan"
                />
                <span className="font-mono text-2xl text-text-primary">{stat.value}</span>
                <span className="text-sm text-text-secondary">{stat.label}</span>
                {index === stats.length - 1 ? null : null}
              </div>
            ))}
          </div>
        </div>
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
