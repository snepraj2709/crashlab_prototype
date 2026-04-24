import { TeamGrid, TrustSignalsSection } from "@/components/sections";
import { getTeamProfiles, getTrustSection } from "@/lib/content/site";

export const revalidate = 86400;

export default async function PeoplePage(): Promise<React.ReactElement> {
  const profiles = await getTeamProfiles();
  const trustSection = getTrustSection();

  return (
    <>
      <section>
        <TeamGrid profiles={profiles} />
      </section>
    </>
  );
}
