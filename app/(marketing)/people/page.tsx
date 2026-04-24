import { TeamGrid } from "@/components/sections";
import { getTeamProfiles } from "@/lib/content/site";

export const revalidate = 86400;

export default async function PeoplePage(): Promise<React.ReactElement> {
  const profiles = await getTeamProfiles();

  return (
    <>
      <section>
        <TeamGrid profiles={profiles} />
      </section>
    </>
  );
}
