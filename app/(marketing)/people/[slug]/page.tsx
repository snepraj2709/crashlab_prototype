import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/seo/JsonLd";
import { PortableTextContent } from "@/components/sections";
import { Card, ProofChip } from "@/components/ui";
import { getPersonBySlug, getPeople, getSeedPublications } from "@/lib/content/site";

export const revalidate = 86400;

export async function generateStaticParams(): Promise<Array<{ slug: string }>> {
  const people = await getPeople();
  return people.map((person) => ({ slug: person.slug }));
}

export async function generateMetadata({
  params
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const person = await getPersonBySlug(params.slug);
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
  const person = await getPersonBySlug(params.slug);
  if (!person) {
    notFound();
  }

  const publications = getSeedPublications();

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
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">People</p>
          <h1 className="mt-6 font-display text-5xl text-text-primary lg:text-6xl">{person.name}</h1>
          {"headline" in person && person.headline ? (
            <div className="mt-6 space-y-2 text-lg text-text-secondary">
              {person.headline.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-lg text-text-secondary">{person.role}</p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            {person.credentials.map((credential) => (
              <ProofChip key={credential} label={credential} />
            ))}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-10">
              <Card>
                <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Biography</p>
                <div className="mt-6">
                  <PortableTextContent blocks={person.fullBio} />
                </div>
              </Card>

              {"originStory" in person && person.originStory ? (
                <Card>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">
                    CRASH Lab started with a question...
                  </p>
                  <div className="mt-6">
                    <PortableTextContent blocks={person.originStory} />
                  </div>
                </Card>
              ) : null}

              <Card>
                <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Publications</p>
                <div className="mt-6 space-y-4">
                  {publications.map((publication) => (
                    <div className="border-b border-border pb-4 last:border-b-0 last:pb-0" key={publication.id}>
                      <p className="text-lg font-medium text-text-primary">{publication.title}</p>
                      <p className="mt-2 text-sm text-text-secondary">
                        {publication.venue} · {publication.year}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-8">
              <Card>
                <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Research areas</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {person.researchFocus.map((focus) => (
                    <span className="rounded-full border border-border px-4 py-2 text-sm text-text-secondary" key={focus}>
                      {focus}
                    </span>
                  ))}
                </div>
              </Card>

              {"collaborations" in person && person.collaborations?.length ? (
                <Card>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Collaborations</p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {person.collaborations.map((collaboration) => (
                      <span className="rounded-full border border-border px-4 py-2 text-sm text-text-primary" key={collaboration}>
                        {collaboration}
                      </span>
                    ))}
                  </div>
                </Card>
              ) : null}

              <Card>
                <p className="text-xs uppercase tracking-[0.2em] text-accent-cyan">Social links</p>
                <div className="mt-6 space-y-3">
                  {Object.entries(person.socialLinks ?? {}).map(([key, value]) =>
                    value ? (
                      <Link
                        className="block text-text-primary transition hover:text-accent-cyan"
                        href={value}
                        key={key}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {key}
                      </Link>
                    ) : null
                  )}
                </div>
              </Card>
            </div>
          </div>
          </div>
        </section>
      </div>
    </>
  );
}
