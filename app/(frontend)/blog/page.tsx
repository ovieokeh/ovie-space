import type { Metadata } from "next";
import { getPosts } from "@/lib/payload";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { BlogPageClient } from "./BlogPageClient";

const pageContent = {
  header: {
    title: "Blog",
    description: "Musings, thoughts, and explorations on tech, life, and everything in between.",
  },
};

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles and thoughts on full-stack development, product design, and technology by Ovie Okeh.",
  alternates: {
    canonical: "https://ovie.dev/blog",
  },
  openGraph: {
    title: "Blog",
    description:
      "Articles and thoughts on full-stack development, product design, and technology by Ovie Okeh.",
    url: "https://ovie.dev/blog",
  },
};

export default async function BlogPage() {
  const posts = await getPosts();

  const jsonLd = breadcrumbJsonLd([
    { name: "Home", url: "https://ovie.dev" },
    { name: "Blog", url: "https://ovie.dev/blog" },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BlogPageClient posts={posts} header={pageContent.header} />
    </>
  );
}
