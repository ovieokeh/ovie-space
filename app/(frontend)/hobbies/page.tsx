import { getVideos } from "@/lib/payload";
import { HobbiesPageClient } from "./HobbiesPageClient";

// Static page content (not in CMS)
const pageContent = {
  header: {
    title: "Hobbies & Creations",
    description:
      "A feed of things I'm working on and enjoying in my free time. From the piano to the basketball court.",
  },
};

export default async function HobbiesPage() {
  const videos = await getVideos();

  return <HobbiesPageClient videos={videos} header={pageContent.header} />;
}
