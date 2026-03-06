import { Button, SectionLabel } from "@/components/ui";
import { ProjectCard } from "@/components/sections/ProjectCard";
import type { ProjectSeed } from "@/types/research";

interface ProblemCardsProps {
  projects: ProjectSeed[];
}

export function ProblemCards({ projects }: ProblemCardsProps): React.ReactElement {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionLabel number="02" text="The Problems We Work On" />
        <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display text-4xl text-white lg:text-5xl">
              Navigate by the clinical problems that still resist automation.
            </h2>
            <p className="mt-4 max-w-3xl text-base text-text-secondary lg:text-lg">
              The lab is organized around questions the field still has not answered well enough.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.slice(0, 6).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="mt-10 rounded-[28px] border border-white/10 bg-white/[0.03] p-8 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-xl font-semibold text-white">
              Working on one of these problems in healthcare?
            </p>
            <p className="mt-2 max-w-2xl text-text-secondary">
              Explore partnership models built for clinical validation, joint grants, and
              commissioned India-specific studies.
            </p>
          </div>
          <div className="mt-6 lg:mt-0">
            <Button href="/partners" variant="secondary">
              Explore Partnership Models
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
