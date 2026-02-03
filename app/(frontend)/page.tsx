import { getProjects } from "@/lib/payload";
import { HomePageClient } from "./HomePageClient";

export default async function HomePage() {
  const projects = await getProjects();

  return <HomePageClient projects={projects} />;
}
