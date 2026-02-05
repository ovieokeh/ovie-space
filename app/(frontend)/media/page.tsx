import type { Metadata } from "next";
import { getMedia } from "@/lib/payload";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { MediaPageClient } from "./MediaPageClient";

const pageContent = {
  header: {
    title: "Media",
    description: "A log of movies and shows I've enjoyed recently. A reflection of stories that have captivated me.",
  },
};

export const metadata: Metadata = {
  title: "Media",
  description:
    "Movies and shows that Ovie Okeh has watched and reviewed — from thoughtful dramas to mind-bending cinema.",
  alternates: {
    canonical: "https://ovie.dev/media",
  },
  openGraph: {
    title: "Media",
    description:
      "Movies and shows that Ovie Okeh has watched and reviewed — from thoughtful dramas to mind-bending cinema.",
    url: "https://ovie.dev/media",
  },
};

export default async function MediaPage() {
  const media = await getMedia();

  const jsonLd = breadcrumbJsonLd([
    { name: "Home", url: "https://ovie.dev" },
    { name: "Media", url: "https://ovie.dev/media" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <MediaPageClient media={media} header={pageContent.header} />
    </>
  );
}
