import { CallToActionCard } from "@/components/sections/CallToActionCard";
import { PeopleDirectory } from "@/components/sections/PeopleDirectory";
import type { TeamMemberProfile } from "@/types/team";

interface TeamGridProps {
  profiles: TeamMemberProfile[];
}

export function TeamGrid({ profiles }: TeamGridProps): React.ReactElement {
  const peopleCta = {
    heading: "Let's Accelerate Healthcare AI Innovation Together",
    body: "Whether you're a clinician, researcher, or industry partner — we'd love to collaborate.",
    buttonLabel: "Join Us",
    buttonHref: "/join",
  };

  return (
    <section className="py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mt-8 max-w-3xl">
          <div>
            <h1 className="font-display text-5xl text-text-primary lg:text-6xl">
              Meet our team
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-text-secondary">
              The team behind the benchmarks. A multidisciplinary group of
              clinicians, researchers, and engineers.
            </p>
          </div>
        </div>

        <PeopleDirectory profiles={profiles} />
        <div className="lg:mt-18 mt-12">
          <CallToActionCard
            body={peopleCta.body}
            buttonHref={peopleCta.buttonHref}
            buttonLabel={peopleCta.buttonLabel}
            heading={peopleCta.heading}
          />
        </div>
      </div>
    </section>
  );
}
