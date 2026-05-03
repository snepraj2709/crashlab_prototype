import type { LucideIcon } from "lucide-react";
import { BookOpenCheck, Building2, DatabaseZap } from "lucide-react";

import { Button } from "@/components/ui";
import { ContactPageForm } from "@/components/sections/ContactPageForm";

/** Homepage teaser — partnership pathways. Full pillar detail lives on `/collaborate`. */
const partnerPathways = [
  {
    title: "Research License",
    body: "Access published CRASH Lab benchmarks and datasets for internal validation.",
    icon: BookOpenCheck,
  },
  {
    title: "Commissioned Study",
    body: "Task the team with a specific clinical AI evaluation or validation study.",
    icon: Building2,
  },
  {
    title: "Joint Grant",
    body: "Co-apply for DST, DBT, or Wellcome Trust grants with CRASH Lab as research partner.",
    icon: DatabaseZap,
  },
] satisfies Array<{
  title: string;
  body: string;
  icon: LucideIcon;
}>;

export function CollaborateSection(): React.ReactElement {
  return (
    <section className="border-t border-border py-12 lg:pt-18 lg:pb-24" id="collaborate">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-4xl">
          <h2 className="font-display text-4xl text-text-primary lg:text-5xl">
            Your AI needs to work in real clinical settings. Ours already does.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-text-secondary">
            CRASH Lab partners with healthcare companies, institutions, and funders that need clinically
            credible evaluation and India-specific deployment research.
          </p>
        </div>

        <hr className="my-14 border-border lg:my-16" />

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          {partnerPathways.map((item) => (
            <div className="flex min-w-0 flex-col border-t border-border pt-6" key={item.title}>
              <div
                aria-hidden="true"
                className="inline-flex size-10 items-center justify-center rounded-none bg-accent-cyan-muted text-accent-cyan"
              >
                <item.icon className="size-[18px]" />
              </div>
              <h3 className="mt-5 text-2xl font-medium leading-tight text-text-primary">{item.title}</h3>
              <p className="mt-4 line-clamp-5 min-w-0 break-words text-sm leading-8 text-text-secondary">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/collaborate" variant="secondary">
            Benchmarking, data commons & expert studio
          </Button>
        </div>

        <div className="border-t border-border pt-16 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-3xl text-text-primary lg:text-4xl">Join Our Mission</h2>
              <div className="mt-6 space-y-6 text-base leading-8 text-text-secondary">
                <p>
                  We are building a new ecosystem for responsible healthcare AI. Whether you are developing
                  an AI-driven product or seeking a dedicated, high-resource research environment, CRASH Lab
                  provides the clinical expertise and infrastructure needed to turn innovation into reality.
                </p>
                <p>
                  Please share as much detail as possible in the form below. This helps us direct your inquiry
                  to the right specialist so we can begin exploring how to work together.
                </p>
              </div>
            </div>
            <div className="lg:pl-4">
              <ContactPageForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
