import { Building2, Microscope, TrendingUp } from "lucide-react";

import { Button, Card, SectionLabel } from "@/components/ui";

const cards = [
  {
    icon: Microscope,
    eyebrow: "For Researchers",
    headline: "Do work that ships to top venues and reaches real patients.",
    body: "CRASH Lab offers publication velocity, clinical data access, and mentorship from AIIMS-trained, Harvard-affiliated researchers.",
    href: "/join",
    cta: "Explore Open Projects",
    className: "border-cyan-400/25"
  },
  {
    icon: Building2,
    eyebrow: "For Industry",
    headline: "License research. Validate your AI. Commission India-specific studies.",
    body: "We offer Research Licensing, Commissioned Studies, and Joint Grant programs — backed by clinical-grade data and expert radiologists.",
    href: "/partners",
    cta: "Partner With Us",
    className: "border-white/10 bg-bg-elevated"
  },
  {
    icon: TrendingUp,
    eyebrow: "For Investors",
    headline: "Fund India's most credible responsible health AI lab.",
    body: "15 papers in 8 months. RSNA's top-ranked Indian team. A lead PI with AIIMS training, Harvard affiliation, and national policy influence.",
    href: "/impact",
    cta: "Our Impact",
    className: "border-transparent bg-[linear-gradient(#111827,#111827)_padding-box,linear-gradient(135deg,#FF6B35,#00D4FF)_border-box]"
  }
];

export function ThreeWayCTA(): React.ReactElement {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionLabel number="05" text="Choose Your Entry Point" />
        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {cards.map((card) => (
            <Card className={card.className} key={card.eyebrow}>
              <card.icon className="size-10 text-accent-cyan" />
              <p className="mt-8 text-xs uppercase tracking-[0.22em] text-text-tertiary">
                {card.eyebrow}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-white">{card.headline}</h3>
              <p className="mt-4 text-base leading-8 text-text-secondary">{card.body}</p>
              <div className="mt-8">
                <Button href={card.href} variant="secondary">
                  {card.cta}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
