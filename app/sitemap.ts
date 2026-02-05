import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/payload";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();

  const blogPosts: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `https://ovie.dev/blog/${post.slug}`,
    lastModified: post.lastUpdatedAt || post.publishedAt || undefined,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: "https://ovie.dev",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://ovie.dev/about",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://ovie.dev/blog",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: "https://ovie.dev/reading",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://ovie.dev/media",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://ovie.dev/hobbies",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    ...blogPosts,
  ];
}
