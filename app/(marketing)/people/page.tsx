import { TeamGrid, TrustSignalsSection } from "@/components/sections";
import { getPeople, getTrustSection } from "@/lib/content/site";

export const revalidate = 86400;

export default async function PeoplePage(): Promise<React.ReactElement> {
  const people = await getPeople();
  const trustSection = getTrustSection();

  return (
    <>
      <section className="pt-32">
        <TeamGrid people={people} />
      </section>
      <TrustSignalsSection section={trustSection} variant="compact" />
    </>
  );
}
