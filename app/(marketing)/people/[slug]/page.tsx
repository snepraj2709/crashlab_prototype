import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail } from "lucide-react";

import { JsonLd } from "@/components/seo/JsonLd";
import { PortableTextContent, TeamMemberPortrait, TeamSocialLinks } from "@/components/sections";
import { PrincipalInvestigatorBadge } from "@/components/ui";
import { getTeamProfileBySlug, getTeamProfiles } from "@/lib/content/site";

export const revalidate = 86400;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const profiles = await getTeamProfiles();
  return profiles.map((profile) => ({ slug: profile.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const person = await getTeamProfileBySlug(params.slug);
  if (!person) {
    return {};
  }

  return {
    title: `${person.name} | CRASH Lab People`,
    description: person.shortBio,
    openGraph: {
      title: person.name,
      description: person.shortBio,
      images: [person.photo?.url || "/og/default.svg"]
    }
  };
}

export default async function PersonPage({
  params
}: {
  params: { slug: string };
}): Promise<React.ReactElement> {
  const person = await getTeamProfileBySlug(params.slug);
  if (!person) {
    notFound();
  }

  const visibleCredentials = person.credentials.slice(0, 4);
  const visibleResearchFocus = person.researchFocus.slice(0, 5);
  const hasSocialLinks = Object.values(person.socialLinks ?? {}).some(Boolean);
  const alumniYear = (person as typeof person & { alumniYear?: number }).alumniYear;
  const currentInstitution = (person as typeof person & { currentInstitution?: string }).currentInstitution;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: person.name,
          description: person.shortBio,
          jobTitle: person.role,
          worksFor: {
            "@type": "Organization",
            name: "CRASH Lab, Ashoka University"
          },
          url: `https://crashlab.in/people/${person.slug}`
        }}
      />
      <div className="pt-32">
        <section className="py-8 lg:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Link
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan transition hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
              href="/people"
            >
              <ArrowLeft className="h-4 w-4" />
              All People
            </Link>

            <div className="mt-8 grid gap-10 lg:grid-cols-[22rem_minmax(0,1fr)] lg:items-start">
              <aside className="space-y-6">
                <TeamMemberPortrait
                  className="aspect-[4/5] w-full"
                  member={person}
                  priority
                  sizes="(min-width: 1024px) 22rem, 90vw"
                />

                {(hasSocialLinks || person.email || (!person.isActive && (alumniYear || currentInstitution))) && (
                  <div className="space-y-6 px-1">
                    {!person.isActive && (alumniYear || currentInstitution) ? (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
                          Status
                        </p>
                        <div className="mt-2 space-y-1 text-sm leading-7 text-text-secondary">
                          {alumniYear ? <p>Alumni · {alumniYear}</p> : null}
                          {currentInstitution ? <p>Now at {currentInstitution}</p> : null}
                        </div>
                      </div>
                    ) : null}

                    {hasSocialLinks ? (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
                          Connect
                        </p>
                        <div className="mt-3">
                          <TeamSocialLinks name={person.name} socialLinks={person.socialLinks} />
                        </div>
                      </div>
                    ) : null}

                    {person.email ? (
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-cyan">
                          Email
                        </p>
                        <a
                          className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-text-primary transition hover:text-accent-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
                          href={`mailto:${person.email}`}
                        >
                          <Mail className="h-4 w-4" />
                          {person.email}
                        </a>
                      </div>
                    ) : null}
                  </div>
                )}
              </aside>

              <div>
                {person.isPrincipalInvestigator ? (
                  <div className="flex flex-wrap gap-2">
                    <PrincipalInvestigatorBadge />
                  </div>
                ) : null}

                <h1 className="mt-5 font-display text-5xl text-text-primary lg:text-6xl">
                  {person.name}
                </h1>
                <p className="mt-4 text-xl text-text-secondary">{person.role}</p>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary">
                  {person.shortBio}
                </p>

                <div className="mt-12 space-y-12">
                  {person.fullBio?.length ? (
                    <section>
                      <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">
                        About
                      </p>
                      <div className="mt-4 max-w-3xl text-base leading-8 text-text-secondary">
                        <PortableTextContent blocks={person.fullBio} />
                      </div>
                    </section>
                  ) : null}

                  {visibleResearchFocus.length ? (
                    <section>
                      <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">
                        Research Focus
                      </p>
                      <div className="mt-4 flex max-w-3xl flex-wrap gap-3">
                        {visibleResearchFocus.map((focus) => (
                          <span
                            className="rounded-full border border-border px-4 py-2 text-sm font-medium text-text-secondary"
                            key={focus}
                          >
                            {focus}
                          </span>
                        ))}
                      </div>
                    </section>
                  ) : null}

                  {visibleCredentials.length ? (
                    <section>
                      <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">
                        Credentials
                      </p>
                      <ul className="mt-4 max-w-3xl space-y-4 text-base leading-8 text-text-secondary">
                        {visibleCredentials.map((credential) => (
                          <li key={credential}>{credential}</li>
                        ))}
                      </ul>
                    </section>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
