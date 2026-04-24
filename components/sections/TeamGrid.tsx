import { Button } from "@/components/ui";
import { PeopleDirectory } from "@/components/sections/PeopleDirectory";
import type { TeamMemberProfile } from "@/types/team";

interface TeamGridProps {
  profiles: TeamMemberProfile[];
}

export function TeamGrid({ profiles }: TeamGridProps): React.ReactElement {
  return (
    <section className="py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mt-8 max-w-3xl">
          <div>
            <h1 className="font-display text-5xl text-text-primary lg:text-6xl">Meet our team</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-text-secondary">
            The team behind the benchmarks. A multidisciplinary group of clinicians, researchers, and engineers.
            </p>
          </div>
        </div>

        <PeopleDirectory profiles={profiles} />
        <section className="py-12 lg:py-18">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-token-md border border-slate-800 bg-navy-900 px-10 py-12 shadow-soft lg:px-16 lg:py-14">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-accent-cyan/10 blur-3xl"
            />
            <div className="relative max-w-5xl">
              <h2 className="max-w-4xl font-display text-3xl font-semibold leading-[1.04] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Let&apos;s Accelerate Healthcare AI Innovation Together
              </h2>
              <p className="mt-6 max-w-4xl font-sans text-lg font-normal leading-8 text-slate-300 sm:text-xl sm:leading-[1.5] lg:text-2xl">
                Whether you&apos;re a clinician, researcher, or industry partner
                {" \u2014 "}we&apos;d love to collaborate.
              </p>
            </div>
            <Button
              className="mt-10 font-sans text-lg font-semibold"
              href="/join"
              size="lg"
              variant="secondary"
            >
              Join Us
            </Button>
          </div>
        </div>
      </section>
      </div>
    </section>
  );
}
