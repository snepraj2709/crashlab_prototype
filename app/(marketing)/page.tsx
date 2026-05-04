import { SectionErrorBoundary } from "@/components/layout/SectionErrorBoundary";
import {
  CollaborateSection,
  HeroSection,
  ProblemStrip,
  RadLESection,
  SocialProofSection,
  TrustSlidesSection,
} from "@/components/sections";

export const revalidate = 300;

export default async function HomePage(): Promise<React.ReactElement> {
  return (
    <>
      <SectionErrorBoundary fallbackTitle="Hero unavailable">
        <HeroSection />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallbackTitle="Trust signals unavailable">
        <TrustSlidesSection />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallbackTitle="RadLE benchmark unavailable">
        <RadLESection />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallbackTitle="Social proof unavailable">
        <SocialProofSection />
      </SectionErrorBoundary>
      {/* <SectionErrorBoundary fallbackTitle="Problem strip unavailable">
        <ProblemStrip />
      </SectionErrorBoundary> */}
      <SectionErrorBoundary fallbackTitle="Collaborate unavailable">
        <CollaborateSection />
      </SectionErrorBoundary>
    </>
  );
}
