import { getMedia } from "@/lib/payload";
import { MediaPageClient } from "./MediaPageClient";

// Static page content (not in CMS)
const pageContent = {
  header: {
    title: "Media",
    description: "A log of movies and shows I've enjoyed recently. A reflection of stories that have captivated me.",
  },
};

export default async function MediaPage() {
  const media = await getMedia();

  return <MediaPageClient media={media} header={pageContent.header} />;
}
