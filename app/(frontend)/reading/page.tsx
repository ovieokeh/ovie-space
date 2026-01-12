import { getBooks } from "@/lib/payload";
import { ReadingPageClient } from "./ReadingPageClient";

// Static page content (not in CMS)
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

export default async function ReadingPage() {
  const books = await getBooks();

  return <ReadingPageClient books={books} header={pageContent.header} publications={pageContent.publications} />;
}
