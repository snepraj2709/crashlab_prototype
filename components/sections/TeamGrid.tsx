import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { CallToActionCard } from "@/components/sections/CallToActionCard";
import { PeopleDirectory } from "@/components/sections/PeopleDirectory";
import { PeopleMomentsCarousel } from "@/components/sections/PeopleMomentsCarousel";
import { cn } from "@/lib/utils/cn";
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
        <div
          className={cn(
            "relative mt-2 w-full overflow-hidden rounded-none border border-border bg-bg-secondary shadow-sm sm:mt-4",
            "h-[min(44dvh,22rem)] sm:h-[min(48dvh,26rem)] md:h-[min(52dvh,30rem)] lg:h-[min(52dvh,34rem)]",
          )}
        >
          <Image
            alt="CRASH Lab team in front of the CRASH LAB backdrop."
            className="object-contain object-center"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1216px"
            src="/Carousel/crash-lab-people-moment-01.jpeg"
          />
          <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2">
            <div className="flex items-center gap-1 rounded-full border border-white/45 bg-black/35 px-2 py-1 text-white shadow-sm backdrop-blur-[2px]">
              <ChevronDown aria-hidden="true" className="size-3 animate-bounce" />
              <span className="text-[9px] font-medium uppercase tracking-[0.16em]">
                Scroll
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 max-w-3xl lg:mt-10">
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

        <PeopleMomentsCarousel embedded />

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
