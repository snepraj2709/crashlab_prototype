import { ContactPageForm } from "@/components/sections/ContactPageForm";
import { SectionLabel } from "@/components/ui";

export default function ContactPage(): React.ReactElement {
  return (
    <div className="pt-32">
      <section className="pb-16 pt-8 lg:pb-24 lg:pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start lg:gap-16">
          <div className="max-w-2xl pt-2">
            <SectionLabel number="01" text="Contact" />
            <h1 className="mt-6 font-display text-5xl text-text-primary lg:text-6xl">
              Get Involved
            </h1>
            <p className="mt-6 text-xl leading-9 text-text-secondary">
              Whether you&apos;re building healthcare AI products or looking for a serious
              research environment, this is the fastest way to start a conversation with the lab.
            </p>

            <div className="mt-10 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-text-primary">For Industry Partners</h2>
                <p className="mt-3 text-lg leading-8 text-text-secondary">
                  Reach out if you need India-specific validation, clinician-grounded evaluation,
                  benchmark design, or a research partner who understands deployment constraints in
                  real hospital settings.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-text-primary">For Future Team Members</h2>
                <p className="mt-3 text-lg leading-8 text-text-secondary">
                  Send a quick note if you want to work on ambitious projects with real clinical
                  context, strong publication intent, and a lab culture that values rigor over
                  hype.
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
