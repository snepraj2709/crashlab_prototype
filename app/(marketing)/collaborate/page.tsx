import { Database, LayoutGrid, UsersRound, type LucideIcon } from "lucide-react";
import type { Metadata } from "next";

import { ContactPageForm } from "@/components/sections";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

export const metadata: Metadata = {
  title: "Collaborate & Contact — CRASH Lab",
  description:
    "Partner with CRASH Lab on rigorous clinical AI benchmarking, secure medical data commons, and interdisciplinary expertise. Get in touch with the lab directly."
};

const pillars = [
  {
    who: "Clinical benchmarks",
    title: "Clinical Benchmarks & Evaluation",
    body: "We offer standardized, stress-test environments that evaluate how AI models perform against expert human reasoning. Our frameworks help partners identify safety gaps and validate their technology for high-stakes medical use.",
    cta: "Back to RadLE",
    href: "/#radle",
    icon: LayoutGrid,
    featured: true
  },
  {
    who: "Data commons",
    title: "Secure Medical Data Commons",
    body: "We are building a secure data infrastructure that reflects India’s diverse patient population. This resource allows for the training and validation of AI on representative, real-world datasets without compromising patient privacy or data security.",
    icon: Database
  },
  {
    who: "Expert studio",
    title: "Interdisciplinary Expert Studio",
    body: "CRASH Lab acts as a translation layer, providing partners and collaborators with direct access to a network of radiologists, frontline clinicians, and AI researchers. We offer the clinical oversight necessary to ensure technical innovation solves actual medical problems.",
    icon: UsersRound
  }
] satisfies Array<{
  who: string;
  title: string;
  body: string;
  icon: LucideIcon;
  cta?: string;
  href?: string;
  featured?: boolean;
}>;

export default function CollaboratePage(): React.ReactElement {
  return (
    <div>
      {/* Partner collaboration */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
            <div>
              <h1 className="mt-6 max-w-4xl font-display text-5xl text-text-primary lg:text-6xl">
                Your Partner in Rigorous Clinical AI Benchmarking
              </h1>
            </div>
            <div>
              <p className="mt-6 max-w-2xl text-base leading-8 text-text-secondary lg:justify-self-end lg:pt-6">
                Most models today excel in a lab but struggle in the clinic, and we at CRASH Lab are
                changing that. We provide the essential resources required to move medical AI from a
                research concept to a clinical reality.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-3 lg:gap-12">
            {pillars.map((pillar) => (
              <div
                className={cn(
                  "flex h-full flex-col",
                  pillar.featured ? "rounded-none bg-navy-900 p-6 text-white" : "border-t border-border pt-6"
                )}
                key={pillar.title}
              >
                <div className="flex items-center gap-3">
                  <div
                    aria-hidden="true"
                    className={cn(
                      "inline-flex size-10 items-center justify-center rounded-none",
                      pillar.featured
                        ? "bg-white/10 text-white/70"
                        : "bg-accent-cyan-muted text-accent-cyan"
                    )}
                  >
                    <pillar.icon className="size-[18px]" />
                  </div>
                  <p
                    className={cn(
                      "text-xs uppercase tracking-[0.2em]",
                      pillar.featured ? "text-white/60" : "text-accent-cyan"
                    )}
                  >
                    {pillar.who}
                  </p>
                </div>
                <h2
                  className={cn(
                    "mt-5 text-2xl font-medium leading-tight lg:text-3xl",
                    pillar.featured ? "text-white" : "text-text-primary"
                  )}
                >
                  {pillar.title}
                </h2>
                <p
                  className={cn(
                    "mt-4 text-sm leading-8",
                    pillar.featured ? "text-white/70" : "text-text-secondary"
                  )}
                >
                  {pillar.body}
                </p>
                {pillar.cta !== undefined && pillar.href !== undefined ? (
                  <Button
                    className={cn(
                      "mt-6",
                      pillar.featured &&
                        "border-white bg-white text-navy-900 hover:border-white hover:bg-white hover:text-navy-900 hover:shadow-[0_0_0_3px_#0c1527,0_0_0_6px_rgba(255,255,255,0.9)] active:bg-white/80 active:shadow-[0_0_0_2px_#0c1527,0_0_0_4px_rgba(255,255,255,0.72)]"
                    )}
                    href={pillar.href}
                    variant={pillar.featured ? "outline" : "secondary"}
                  >
                    {pillar.cta}
                  </Button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <hr className="border-border-default" />
      </div>

      {/* Join Our Mission + contact */}
      <section className="py-12 lg:py-18">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-16">
            <div className="max-w-2xl pt-2">
              <h2 className="mt-6 font-display text-5xl text-text-primary lg:text-6xl">
                Join Our Mission
              </h2>
              <div className="mt-6 space-y-6 text-xl leading-9 text-text-secondary">
                <p>
                  We are building a new ecosystem for responsible healthcare AI. Whether you are
                  developing an AI-driven product or seeking a dedicated, high-resource research
                  environment, CRASH Lab provides the clinical expertise and infrastructure needed to
                  turn innovation into reality.
                </p>
                <p className="text-lg leading-8">
                  Please share as much detail as possible in the form below. This helps us direct your
                  inquiry to the right specialist so we can begin exploring how to work together.
                </p>
              </div>
            </div>
            <div className="lg:pl-4">
              <ContactPageForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
