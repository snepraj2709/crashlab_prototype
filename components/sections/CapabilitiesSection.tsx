import { PillarsSection } from "@/components/sections/PillarsSection";

export function CapabilitiesSection(): React.ReactElement {
  return (
    <PillarsSection
      cta={{
        href: "/research",
        label: "See the full research agenda"
      }}
      headline="Four pillars. One clock."
      id="research"
      variant="interactive"
    />
  );
}
