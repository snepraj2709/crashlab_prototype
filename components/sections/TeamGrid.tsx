import { TeamFilterTabs } from "@/components/sections/TeamFilterTabs";
import { SectionLabel } from "@/components/ui";
import type { TeamMemberProfile } from "@/types/team";

interface TeamGridProps {
  profiles: TeamMemberProfile[];
}

export function TeamGrid({ profiles }: TeamGridProps): React.ReactElement {
  return (
    <section className="py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionLabel number="01" text="People" />
        <div className="mt-8 max-w-3xl">
          <div>
            <h1 className="font-display text-5xl text-text-primary lg:text-6xl">Lab Members</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-text-secondary">
            The team behind the benchmarks. A multidisciplinary group of clinicians, researchers, and engineers.
            </p>
          </div>
        </div>

        <TeamFilterTabs profiles={profiles} />
      </div>
    </section>
  );
}
