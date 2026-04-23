import type { LucideIcon } from "lucide-react";
import { Award, Building2, DatabaseZap, FileSearch } from "lucide-react";

import { Card } from "@/components/ui";

const timelineItems = [
  {
    year: "Apr 2025",
    title: "CRASH Lab founded",
    body: "The lab launched at Ashoka University with a mandate to build clinically grounded evaluation infrastructure for healthcare AI.",
    icon: Building2,
  },
  {
    year: "Sep 2025",
    title: "RadLE benchmark unveiled",
    body: "Radiology's Last Exam became the lab's flagship benchmark and the anchor for its problem-first research narrative.",
    icon: FileSearch,
  },
  {
    year: "Nov 2025",
    title: "RSNA breakout year",
    body: "Six accepted abstracts positioned CRASH Lab as the fastest-ramping responsible health AI lab in India.",
    icon: Award,
  },
  {
    year: "2027",
    title: "50+ hospital data commons vision",
    body: "Scale federated data infrastructure, benchmark access, and responsible deployment partnerships across India.",
    icon: DatabaseZap,
  }
] satisfies Array<{
  year: string;
  title: string;
  body: string;
  icon: LucideIcon;
}>;

export function TimelineSection(): React.ReactElement {
  return (
    <section className="py-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="mt-10 grid gap-6 lg:grid-cols-4">
          {timelineItems.map((item) => (
            <Card className="relative overflow-hidden" key={item.year}>
              <div className="absolute inset-x-6 top-0 h-1 rounded-full bg-accent-cyan" />
              <div className="mt-6 flex items-center justify-between gap-4">
                <p className="font-mono text-sm text-accent-cyan">{item.year}</p>
                <div
                  aria-hidden="true"
                  className="flex size-10 items-center justify-center rounded-full bg-status-info-surface text-accent-cyan"
                >
                  <item.icon className="size-4" />
                </div>
              </div>
              <h3 className="mt-4 text-2xl font-semibold text-text-primary">{item.title}</h3>
              <p className="mt-4 text-text-secondary">{item.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
