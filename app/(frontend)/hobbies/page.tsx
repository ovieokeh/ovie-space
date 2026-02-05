import type { Metadata } from "next";
import { getVideos } from "@/lib/payload";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { HobbiesPageClient } from "./HobbiesPageClient";

const pageContent = {
  header: {
    title: "Hobbies & Creations",
    description:
      "A feed of things I'm working on and enjoying in my free time. From the piano to the basketball court.",
  },
};

export const metadata: Metadata = {
  title: "Hobbies & Creations",
  description:
    "Ovie Okeh's creative side — piano performances, electronics tinkering, vlogs, and other personal projects.",
  alternates: {
    canonical: "https://ovie.dev/hobbies",
  },
  openGraph: {
    title: "Hobbies & Creations",
    description:
      "Ovie Okeh's creative side — piano performances, electronics tinkering, vlogs, and other personal projects.",
    url: "https://ovie.dev/hobbies",
  },
};

export default async function HobbiesPage() {
  const videos = await getVideos();

  const jsonLd = breadcrumbJsonLd([
    { name: "Home", url: "https://ovie.dev" },
    { name: "Hobbies & Creations", url: "https://ovie.dev/hobbies" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HobbiesPageClient videos={videos} header={pageContent.header} />
    </>
  );
}
