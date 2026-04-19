import { Building2, Microscope, TrendingUp } from "lucide-react";

import { Button, Card } from "@/components/ui";

const cards = [
  {
    icon: Microscope,
    eyebrow: "For Researchers",
    headline: "Do work that ships to top venues and reaches real patients.",
    body: "CRASH Lab offers publication velocity, clinical data access, and mentorship from AIIMS-trained, Harvard-affiliated researchers.",
    href: "/join",
    cta: "Explore Open Projects",
    className: "border-cyan-400/25",
  },
  {
    icon: Building2,
    eyebrow: "For Industry",
    headline:
      "License research. Validate your AI. Commission India-specific studies.",
    body: "We offer Research Licensing, Commissioned Studies, and Joint Grant programs — backed by clinical-grade data and expert radiologists.",
    href: "/collaborate",
    cta: "Collaborate With Us",
    className: "border-cyan-400/25",
  },
  {
    icon: TrendingUp,
    eyebrow: "For Investors",
    headline: "Fund India's most credible responsible health AI lab.",
    body: "#1 Indian lab by AI abstracts at RSNA 2025. 15 papers in under 8 months. Led by an AIIMS-trained, Harvard-affiliated radiologist with national healthcare policy influence.",
    href: "/publications",
    cta: "View Publications",
    className: "border-cyan-400/25",
  },
];

export function ThreeWayCTA(): React.ReactElement {
  return (
    <section className="py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {cards.map((card) => (
            <Card className={card.className} key={card.eyebrow}>
              <card.icon className="size-10 text-accent-cyan" />
              <p className="mt-8 text-xs uppercase tracking-[0.22em] text-text-tertiary">
                {card.eyebrow}
              </p>
              <h3 className="mt-4 text-2xl font-semibold text-text-primary">
                {card.headline}
              </h3>
              <p className="mt-4 text-base leading-8 text-text-secondary">
                {card.body}
              </p>
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
