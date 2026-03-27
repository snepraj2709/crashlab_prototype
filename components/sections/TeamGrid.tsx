import { LabMembersList } from "@/components/sections/LabMembersList";
import { SectionLabel } from "@/components/ui";
import { getLabMemberGroups, getLabMembers } from "@/lib/content/site";
import type { PersonSeed } from "@/types/team";

interface TeamGridProps {
  people: PersonSeed[];
}

export function TeamGrid({ people }: TeamGridProps): React.ReactElement {
  const members = getLabMembers();
  const groups = getLabMemberGroups();
  const activeCount = members.filter((member) => member.isActive).length;
  const alumniCount = members.filter((member) => !member.isActive).length;
  const linkedSlugs = people.map((person) => person.slug);

  return (
    <section className="py-8 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionLabel number="01" text="People" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1 className="font-display text-5xl text-text-primary lg:text-6xl">Lab Members</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-text-secondary">
              The CRASH Lab team spans clinicians, engineers, data researchers, and governance
              collaborators. This directory view uses seeded dummy member data to show the fuller
              shape of the lab beyond the currently published profile pages.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-border px-4 py-2 text-sm text-text-primary">
              {activeCount} active members
            </span>
            <span className="rounded-full border border-border px-4 py-2 text-sm text-text-primary">
              {alumniCount} alumni
            </span>
          </div>
        </div>

        <div className="mt-12">
          <LabMembersList
            groups={groups}
            linkedSlugs={linkedSlugs}
            members={members}
            variant="page"
          />
        </div>
      </div>
    </section>
  );
}
