import { AnnouncementBanner } from "@/components/layout/AnnouncementBanner";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { getActiveAnnouncement } from "@/lib/content/site";

export default async function MarketingLayout({
  children
}: Readonly<{ children: React.ReactNode }>): Promise<React.ReactElement> {
  const announcement = await getActiveAnnouncement();

  return (
    <>
      <AnnouncementBanner announcement={announcement} />
      <Navbar hasBanner={Boolean(announcement)} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
