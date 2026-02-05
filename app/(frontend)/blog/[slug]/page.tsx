import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/payload";
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/structured-data";
import { PostPageClient } from "./PostPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const coverImageUrl =
    post.coverImage && typeof post.coverImage === "object" && "url" in post.coverImage
      ? (post.coverImage as { url: string }).url
      : null;

  return {
    title: post.title,
    description: post.excerpt || `${post.title} — a blog post by Ovie Okeh.`,
    alternates: {
      canonical: `https://ovie.dev/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt || `${post.title} — a blog post by Ovie Okeh.`,
      url: `https://ovie.dev/blog/${post.slug}`,
      ...(coverImageUrl && { images: [{ url: coverImageUrl }] }),
      ...(post.publishedAt && { publishedTime: post.publishedAt }),
      ...(post.lastUpdatedAt && { modifiedTime: post.lastUpdatedAt }),
      authors: ["Ovie Okeh"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || `${post.title} — a blog post by Ovie Okeh.`,
      ...(coverImageUrl && { images: [coverImageUrl] }),
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const coverImageUrl =
    post.coverImage && typeof post.coverImage === "object" && "url" in post.coverImage
      ? (post.coverImage as { url: string }).url
      : null;

  const jsonLd = [
    blogPostingJsonLd({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      lastUpdatedAt: post.lastUpdatedAt,
      coverImageUrl,
    }),
    breadcrumbJsonLd([
      { name: "Home", url: "https://ovie.dev" },
      { name: "Blog", url: "https://ovie.dev/blog" },
      { name: post.title, url: `https://ovie.dev/blog/${post.slug}` },
    ]),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PostPageClient post={post} />
    </>
  );
}
