import Image from "next/image";
import Link from "next/link";

import { Card, ProofChip, SectionLabel } from "@/components/ui";
import type { PersonSeed } from "@/types/team";

interface TeamGridProps {
  people: PersonSeed[];
}

export function TeamGrid({ people }: TeamGridProps): React.ReactElement {
  const [pi, ...team] = people.sort((left, right) => left.position - right.position);

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionLabel number="01" text="People" />
        {pi ? (
          <Card className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr] lg:p-10">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-white/10">
              <Image
                alt={pi.photo?.alt || pi.name}
                className="object-cover"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 280px"
                src={pi.photo?.url || "/og/default.svg"}
              />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Principal Investigator</p>
              <h2 className="mt-4 font-display text-4xl text-white">{pi.name}</h2>
              <p className="mt-4 max-w-3xl text-base leading-8 text-text-secondary lg:text-lg">
                {pi.shortBio}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {pi.credentials.slice(0, 4).map((credential) => (
                  <ProofChip key={credential} label={credential} size="sm" />
                ))}
              </div>
              <div className="mt-8">
                <Link
                  className="text-sm font-medium text-white transition hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                  href={`/people/${pi.slug}`}
                >
                  Read full profile →
                </Link>
              </div>
            </div>
          </Card>
        ) : null}

        {team.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {team.map((person) => (
              <Link href={`/people/${person.slug}`} key={person.slug}>
                <Card className="h-full transition hover:border-accent-cyan">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-white/10">
                    <Image
                      alt={person.photo?.alt || person.name}
                      className="object-cover"
                      fill
                      sizes="(max-width: 1280px) 50vw, 33vw"
                      src={person.photo?.url || "/og/default.svg"}
                    />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold text-white">{person.name}</h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.18em] text-accent-cyan">
                    {person.role}
                  </p>
                  <p className="mt-4 line-clamp-3 text-text-secondary">{person.shortBio}</p>
                </Card>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
