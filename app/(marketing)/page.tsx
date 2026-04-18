import { SectionErrorBoundary } from "@/components/layout/SectionErrorBoundary";
import {
  CapabilitiesSection,
  CollaborateSection,
  HeroSection,
  ProblemStrip,
  ProofSection,
  RadLESection,
  TrustSignalsSection,
} from "@/components/sections";
import { getTrustSection } from "@/lib/content/site";

export const revalidate = 300;

export default async function HomePage(): Promise<React.ReactElement> {
  const trustSection = getTrustSection();

  return (
    <>
      <SectionErrorBoundary fallbackTitle="Hero unavailable">
        <HeroSection />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallbackTitle="Trust signals unavailable">
        <TrustSignalsSection section={trustSection} variant="slideshow" />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallbackTitle="Problem strip unavailable">
        <ProblemStrip />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallbackTitle="Capabilities unavailable">
        <CapabilitiesSection />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallbackTitle="RadLE benchmark unavailable">
        <RadLESection />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallbackTitle="Proof of work unavailable">
        <ProofSection />
      </SectionErrorBoundary>
      <SectionErrorBoundary fallbackTitle="Collaborate unavailable">
        <CollaborateSection />
      </SectionErrorBoundary>
    </>
  );
}
