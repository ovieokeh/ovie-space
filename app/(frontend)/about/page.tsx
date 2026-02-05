import type { Metadata } from "next";
import { breadcrumbJsonLd, personJsonLd } from "@/lib/structured-data";
import { AboutPageClient } from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "Ovie Okeh is a full-stack developer and product designer based in the Netherlands, with experience at Bird and Eurail. Building business applications, travel tech, and community platforms.",
  alternates: {
    canonical: "https://ovie.dev/about",
  },
  openGraph: {
    title: "About Ovie Okeh",
    description:
      "Full-stack developer and product designer based in the Netherlands. Building business applications, travel tech, and community platforms with React, Next.js, and TypeScript.",
    url: "https://ovie.dev/about",
  },
};

export default function AboutPage() {
  const jsonLd = [
    personJsonLd(),
    breadcrumbJsonLd([
      { name: "Home", url: "https://ovie.dev" },
      { name: "About", url: "https://ovie.dev/about" },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <AboutPageClient />
    </>
  );
}
