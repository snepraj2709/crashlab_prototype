import { Building2, DatabaseZap, FileSearch } from "lucide-react";

import { PartnerInterestForm } from "@/components/sections";
import { SectionLabel } from "@/components/ui";
import { getTrustSection } from "@/lib/content/site";

const models = [
  {
    title: "Research License",
    body: "Access published CRASH Lab benchmarks and datasets for internal validation.",
    icon: FileSearch
  },
  {
    title: "Commissioned Study",
    body: "Task the team with a specific clinical AI evaluation or validation study.",
    icon: Building2
  },
  {
    title: "Joint Grant",
    body: "Co-apply for DST, DBT, or Wellcome Trust grants with CRASH Lab as research partner.",
    icon: DatabaseZap
  }
];

export default function CollaboratePage(): React.ReactElement {
  const trustSection = getTrustSection();

  return (
    <div className="pt-32">
      <section className="py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionLabel number="01" text="Collaborate" />
        <h1 className="mt-6 max-w-4xl font-display text-5xl text-text-primary lg:text-6xl">
          Your AI needs to work in real clinical settings. Ours already does.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-text-secondary">
          CRASH Lab partners with healthcare companies, institutions, and funders that need
          clinically credible evaluation and India-specific deployment research.
        </p>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {models.map((model) => (
            <div className="rounded-[28px] border border-border bg-bg-surface p-8" key={model.title}>
              <model.icon className="size-10 text-accent-cyan" />
              <h2 className="mt-8 text-3xl font-semibold text-text-primary">{model.title}</h2>
              <p className="mt-4 text-text-secondary">{model.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[28px] p-8">
            <h1 className="mt-6 font-display text-5xl text-text-primary lg:text-6xl">Why collaborate with us</h1>
            <div className="mt-6 space-y-5 text-text-secondary">
              <p className="mt-6 text-xl leading-9 text-text-secondary">
                Dr. Datta brings a dual identity most AI teams cannot offer: clinician and
                researcher, with AIIMS training, Harvard affiliation, and RSNA credibility.
              </p>
              <p className="mt-6 text-xl leading-9 text-text-secondary">
                The lab is built to answer the questions companies struggle to validate honestly:
                does the model work on Indian data, in real workflows, and under clinical scrutiny?
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["AIIMS New Delhi", "Harvard Medical School", "JIPMER", "IIT Collaborators"].map(
                (item) => (
                  <span className="rounded-full border border-border px-4 py-2 text-sm text-text-primary" key={item}>
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
          <PartnerInterestForm />
        </div>

        <div className="mt-16 rounded-[28px] border border-border bg-bg-surface p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Collaboration network</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Ashoka University", "AIIMS", "Harvard", "JIPMER", "IIT ecosystem"].map((institution) => (
              <span className="rounded-full border border-border px-4 py-2 text-sm text-text-secondary" key={institution}>
                {institution}
              </span>
            ))}
          </div>
        </div>
        </div>
      </section>
    </div>
  );
}
