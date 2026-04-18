"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui";

export function HeroSection(): React.ReactElement {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-bg-primary pb-24 pt-36"
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

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <h1 className="font-display font-semibold leading-[0.92] tracking-[-0.035em] text-text-primary text-[clamp(2.75rem,7vw,4.75rem)]">
          Responsible AI,
          <br />
          built for Healthcare.
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-text-secondary lg:text-lg">
          CRASH Lab is an interdisciplinary research group at the intersection
          of clinical practice and frontier AI — building benchmarks that hold
          AI accountable, tools clinicians trust, and infrastructure for
          India&apos;s healthcare future.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button href="/join" size="lg">
            Join the Team <ArrowRight className="size-4" />
          </Button>
          <Button href="/collaborate" size="lg" variant="outline">
            Collaborate with Us
          </Button>
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
