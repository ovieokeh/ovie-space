import { getTimeline } from "@/lib/payload";
import { HomePageClient } from "./HomePageClient";

export default async function HomePage() {
  const timeline = await getTimeline();

  return <HomePageClient timeline={timeline} />;
}
