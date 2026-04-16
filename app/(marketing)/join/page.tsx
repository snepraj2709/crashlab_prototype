import { SectionLabel } from "@/components/ui";
import { JoinInterestForm, ProjectCard } from "@/components/sections";
import { getProjects, getTrustSection } from "@/lib/content/site";

export default async function JoinPage(): Promise<React.ReactElement> {
  const projects = await getProjects();
  const trustSection = getTrustSection();
  const activeProjects = projects.filter((project) => project.seekingCollaborators).slice(0, 3);
  const interests = Array.from(new Set(projects.flatMap((project) => project.tags)));

  const benefits = [
    "Publication Venues: RSNA / MICCAI / NeurIPS",
    "Clinical Data Access",
    "Mentorship Network",
    "Ashoka Affiliation"
  ];
  const roles = ["Intern", "RA", "PhD", "Postdoc", "Clinician-Researcher"];

  return (
    <div className="pt-32">
      <section className="py-8 lg:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionLabel number="01" text="Join" />
        <h1 className="mt-6 max-w-4xl font-display text-5xl text-text-primary lg:text-6xl">
          Work on problems that matter. In a lab that ships.
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-text-secondary">
          CRASH Lab is built for researchers who want fast-moving, clinically grounded work with a
          credible path to publication and real-world impact.
        </p>

        <div className="mt-16">
          <h2 className="font-display text-4xl text-text-primary">What we&apos;re working on</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {activeProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} showMetadata />
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-token-md border border-border bg-bg-surface p-8">
            <h2 className="font-display text-4xl text-text-primary">Who thrives here</h2>
            <p className="mt-6 text-lg leading-8 text-text-secondary">
              You&apos;re comfortable with ambiguity. You&apos;ve seen a clinical setting or desperately
              want to. You think evaluating AI is more interesting than building it. You want your
              research to be used, not just cited. You read arXiv and NEJM in the same week.
            </p>
          </div>
          <div className="rounded-token-md border border-border bg-bg-surface p-8">
            <h2 className="font-display text-4xl text-text-primary">What you&apos;ll get</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {benefits.map((benefit) => (
                <div className="rounded-token-sm border border-border bg-bg-surface p-5" key={benefit}>
                  <p className="text-base text-text-primary">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 rounded-token-md border border-border bg-bg-surface p-8">
          <h2 className="font-display text-4xl text-text-primary">Open roles</h2>
          <div className="mt-8 flex flex-wrap gap-4">
            {roles.map((role) => (
              <div className="rounded-full border border-border px-5 py-3 text-text-primary" key={role}>
                {role}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <JoinInterestForm interests={interests} />
        </div>
        </div>
      </section>
    </div>
  );
}
