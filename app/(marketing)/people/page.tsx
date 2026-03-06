import { TeamGrid } from "@/components/sections";
import { getPeople } from "@/lib/content/site";

export const revalidate = 86400;

export default async function PeoplePage(): Promise<React.ReactElement> {
  const people = await getPeople();

  return (
    <section className="pt-32">
      <TeamGrid people={people} />
    </section>
  );
}
