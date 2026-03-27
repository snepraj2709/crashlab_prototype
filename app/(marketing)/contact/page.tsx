import { ContactPageForm } from "@/components/sections/ContactPageForm";
import { SectionLabel } from "@/components/ui";

export default function ContactPage(): React.ReactElement {
  return (
    <section className="pt-32 pb-24 lg:pb-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <SectionLabel number="01" text="Contact" />
        <h1 className="mt-6 max-w-4xl font-display text-5xl text-text-primary lg:text-6xl">
          Get Involved
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-text-secondary">
          Send a message to the lab and we&apos;ll route it to the right person.
        </p>
        <ContactPageForm />
      </div>
    </section>
  );
}
