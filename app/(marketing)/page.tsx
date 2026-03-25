import { Suspense } from "react";

import { SectionErrorBoundary } from "@/components/layout/SectionErrorBoundary";
import {
  BlogPreview,
  FeaturedProject,
  HeroSection,
  ImpactStrip,
  ProblemCards,
  TrustSignalsSection,
  ThreeWayCTA
} from "@/components/sections";
import { Skeleton } from "@/components/ui";
import { getFeaturedProject, getPosts, getProjects, getTrustSection } from "@/lib/content/site";

export const revalidate = 300;

export default async function HomePage(): Promise<React.ReactElement> {
  const [projects, featuredProject, posts] = await Promise.all([
    getProjects(),
    getFeaturedProject(),
    getPosts()
  ]);
  const trustSection = getTrustSection();

  return (
    <>
      <SectionErrorBoundary fallbackTitle="Hero unavailable">
        <HeroSection />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallbackTitle="Trust signals unavailable">
        <TrustSignalsSection section={trustSection} variant="featured" />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallbackTitle="Research overview unavailable">
        <ProblemCards projects={projects} />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallbackTitle="Impact metrics unavailable">
        <ImpactStrip />
      </SectionErrorBoundary>
      {featuredProject ? (
        <SectionErrorBoundary fallbackTitle="Featured project unavailable">
          <FeaturedProject project={featuredProject} />
        </SectionErrorBoundary>
      ) : null}
      <SectionErrorBoundary fallbackTitle="Audience pathways unavailable">
        <ThreeWayCTA />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallbackTitle="Blog preview unavailable">
        <Suspense fallback={<div className="px-6 py-24 lg:px-8"><Skeleton className="mx-auto h-72 max-w-7xl" /></div>}>
          <BlogPreview posts={posts} />
        </Suspense>
      </SectionErrorBoundary>
    </>
  );
}
