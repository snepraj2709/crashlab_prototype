import { Building2, DatabaseZap, FileSearch } from "lucide-react";

import { PartnerInterestForm } from "@/components/sections";
import { SectionLabel } from "@/components/ui";

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

export default function PartnersPage(): React.ReactElement {
  return (
    <section className="pt-32 pb-24 lg:pb-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionLabel number="01" text="Partners" />
        <h1 className="mt-6 max-w-4xl font-display text-5xl text-white lg:text-6xl">
          Your AI needs to work in real clinical settings. Ours already does.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-text-secondary">
          CRASH Lab partners with healthcare companies, institutions, and funders that need
          clinically credible evaluation and India-specific deployment research.
        </p>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {models.map((model) => (
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8" key={model.title}>
              <model.icon className="size-10 text-accent-cyan" />
              <h2 className="mt-8 text-3xl font-semibold text-white">{model.title}</h2>
              <p className="mt-4 text-text-secondary">{model.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
            <h2 className="font-display text-4xl text-white">Why partner with us</h2>
            <div className="mt-6 space-y-5 text-text-secondary">
              <p>
                Dr. Datta brings a dual identity most AI teams cannot offer: clinician and
                researcher, with AIIMS training, Harvard affiliation, and RSNA credibility.
              </p>
              <p>
                The lab is built to answer the questions companies struggle to validate honestly:
                does the model work on Indian data, in real workflows, and under clinical scrutiny?
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["AIIMS New Delhi", "Harvard Medical School", "JIPMER", "IIT Collaborators"].map(
                (item) => (
                  <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-white" key={item}>
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
          <PartnerInterestForm />
        </div>

        <div className="mt-16 rounded-[28px] border border-white/10 bg-white/[0.03] p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Collaboration network</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {["Ashoka University", "AIIMS", "Harvard", "JIPMER", "IIT ecosystem"].map((institution) => (
              <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-text-secondary" key={institution}>
                {institution}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
