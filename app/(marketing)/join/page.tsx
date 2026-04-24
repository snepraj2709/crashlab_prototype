import type { Metadata } from "next";
import { JoinInterestForm } from "@/components/sections";
import { getProjects } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Apply to Join CRASH Lab",
  description:
    "Interested in working on responsible healthcare AI? Submit your interest to join CRASH Lab at Ashoka University.",
  openGraph: {
    title: "Apply to Join CRASH Lab",
    description:
      "Work on clinically grounded AI research with a credible path to publication. Submit your interest in joining CRASH Lab.",
    images: [{ url: "/og/default.svg", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply to Join CRASH Lab",
    description: "Work on responsible healthcare AI research. Submit your interest."
  }
};

const benefits = [
  "Publication Venues: RSNA / MICCAI / NeurIPS",
  "Clinical Data Access",
  "Mentorship Network",
  "Ashoka Affiliation"
];

export default async function JoinPage(): Promise<React.ReactElement> {
  const projects = await getProjects();
  const interests = Array.from(new Set(projects.flatMap((project) => project.tags)));

  return (
    <div className="pt-16">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-18">

        {/* Header */}
        <h1 className="mt-6 max-w-4xl font-display text-5xl text-text-primary lg:text-6xl">
          Work on problems that matter. In a lab that ships.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-text-secondary">
          CRASH Lab is built for researchers who want fast-moving, clinically grounded work with
          a credible path to publication and real-world impact.
        </p>

        {/* Who thrives + What you'll get */}
        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-text-primary">Who thrives here</h2>
            <p className="mt-6 text-lg leading-8 text-text-secondary">
              You&apos;re comfortable with ambiguity. You&apos;ve seen a clinical setting or
              desperately want to. You think evaluating AI is more interesting than building it.
              You want your research to be used, not just cited. You read arXiv and NEJM in the
              same week.
            </p>
          </div>

          <div className="border-t border-border pt-6">
            <h2 className="font-display text-3xl text-text-primary">What you&apos;ll get</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  className="border-t border-border py-4 text-base text-text-primary"
                  key={benefit}
                >
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="mt-16 border-t border-border-default pt-16">
          <h2 className="font-display text-3xl text-text-primary">Interest Form</h2>
          <p className="mt-3 text-text-secondary">
            Tell us a bit about yourself and we&apos;ll be in touch.
          </p>
          <div className="mt-8">
            <JoinInterestForm interests={interests} />
          </div>
        </div>

      </div>
    </div>
  );
}
