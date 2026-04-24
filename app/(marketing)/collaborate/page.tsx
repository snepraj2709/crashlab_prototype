import { Building2, DatabaseZap, FileSearch } from "lucide-react";
import type { Metadata } from "next";

import { ContactPageForm } from "@/components/sections";

export const metadata: Metadata = {
  title: "Collaborate & Contact — CRASH Lab",
  description:
    "Partner with CRASH Lab on clinical AI evaluation, joint grants, or commissioned studies. Get in touch with the lab directly."
};

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
  return (
    <div>
      {/* Partner collaboration */}
      <section className="py-8 lg:py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h1 className="mt-6 max-w-4xl font-display text-5xl text-text-primary lg:text-6xl">
            Your AI needs to work in real clinical settings. Ours already does.
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary">
            CRASH Lab partners with healthcare companies, institutions, and funders that need
            clinically credible evaluation and India-specific deployment research.
          </p>

          <div className="mt-16 grid gap-10 lg:grid-cols-3 lg:gap-12">
            {models.map((model) => (
              <div className="border-t border-border pt-6" key={model.title}>
                <model.icon className="size-10 text-accent-cyan" />
                <h2 className="mt-6 text-3xl font-medium text-text-primary">{model.title}</h2>
                <p className="mt-4 text-sm leading-8 text-text-secondary">{model.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <hr className="border-border-default" />
      </div>

      {/* General Contact */}
      <section className="py-12 lg:py-18">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-16">
            <div className="max-w-2xl pt-2">
              <h2 className="mt-6 font-display text-5xl text-text-primary lg:text-6xl">
                Get Involved
              </h2>
              <p className="mt-6 text-xl leading-9 text-text-secondary">
                Whether you&apos;re building healthcare AI products or looking for a serious research
                environment, this is the fastest way to start a conversation with the lab.
              </p>

              <div className="mt-10 space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">For Industry Partners</h3>
                  <p className="mt-3 text-lg leading-8 text-text-secondary">
                    Reach out if you need India-specific validation, clinician-grounded evaluation,
                    benchmark design, or a research partner who understands deployment constraints in
                    real hospital settings.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-text-primary">For Future Team Members</h3>
                  <p className="mt-3 text-lg leading-8 text-text-secondary">
                    Send a quick note if you want to work on ambitious projects with real clinical
                    context, strong publication intent, and a lab culture that values rigor over hype.
                  </p>
                </div>
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
