import type { Metadata } from "next";
import { getBooks } from "@/lib/payload";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { ReadingPageClient } from "./ReadingPageClient";

const pageContent = {
  header: {
    title: "Library",
    description: "A collection of books that have shaped my thinking and publications I've written.",
  },
  publications: {
    title: "Paid Publications",
    description: "These are all technical articles that I published through third parties.",
    items: [
      { name: "LogRocket Blog & Ovie Okeh", href: "https://blog.logrocket.com/author/ovieokeh/" },
      { name: "OpenReplay Blog & Ovie Okeh", href: "https://blog.openreplay.com/authors/ovie-okeh/" },
    ],
  },
};

export const metadata: Metadata = {
  title: "Library",
  description:
    "Books that have shaped Ovie Okeh's thinking — from sci-fi and philosophy to biographies — plus technical publications.",
  alternates: {
    canonical: "https://ovie.dev/reading",
  },
  openGraph: {
    title: "Library",
    description:
      "Books that have shaped Ovie Okeh's thinking — from sci-fi and philosophy to biographies — plus technical publications.",
    url: "https://ovie.dev/reading",
  },
};

export default async function ReadingPage() {
  const books = await getBooks();

  const jsonLd = breadcrumbJsonLd([
    { name: "Home", url: "https://ovie.dev" },
    { name: "Library", url: "https://ovie.dev/reading" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ReadingPageClient books={books} header={pageContent.header} publications={pageContent.publications} />
    </>
  );
}
