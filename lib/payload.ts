import { getPayload } from "payload";
import config from "@/payload.config";

// Helper to extract plain text from Lexical rich text
function extractTextFromRichText(richText: unknown): string {
  if (!richText || typeof richText !== "object") return "";
  const root = (richText as { root?: { children?: unknown[] } }).root;
  if (!root || !root.children) return "";

  return root.children
    .map((node: unknown) => {
      const n = node as { children?: { text?: string }[] };
      if (n.children) {
        return n.children.map((c) => c.text || "").join("");
      }
      return "";
    })
    .join("\n");
}

// Helper to extract tags from Payload array format
function extractTags(tags: unknown): string[] {
  if (!Array.isArray(tags)) return [];
  return tags.map((t) => (t as { tag?: string }).tag || "").filter(Boolean);
}

export async function getBooks() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "books",
    limit: 100,
  });

  return docs.map((book) => ({
    title: book.title,
    author: book.author,
    status: book.status,
    tags: extractTags(book.tags),
    description: extractTextFromRichText(book.description),
    imageUrl: book.imageUrl ? decodeURIComponent(book.imageUrl) : "",
    personalReview: (book as any).personalReview || "",
  }));
}

export async function getMedia() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "media",
    limit: 100,
  });

  return docs.map((item) => ({
    title: item.title,
    type: item.type,
    status: item.status,
    tags: extractTags(item.tags),
    description: extractTextFromRichText(item.description),
    imageUrl: item.imageUrl ? decodeURIComponent(item.imageUrl) : "",
  }));
}

export async function getVideos() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "videos",
    limit: 100,
  });

  return docs.map((video) => ({
    title: video.title,
    description: extractTextFromRichText(video.description),
    tags: extractTags(video.tags),
    thumbnailUrl: video.thumbnailUrl || "",
    videoUrl: video.videoUrl,
  }));
}

export async function getProjects() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "projects",
    limit: 100,
    sort: "order",
  });

  const featured = docs.find((p) => p.isFeatured);
  const others = docs.filter((p) => !p.isFeatured);

  return {
    featured: featured
      ? {
          tag: "Featured Project",
          title: featured.title,
          description: extractTextFromRichText(featured.description),
          linkText: featured.linkText || "Learn More",
          linkUrl: featured.linkUrl,
        }
      : null,
    others: others.map((project) => ({
      image: project.imageUrl || "",
      title: project.title,
      description: extractTextFromRichText(project.description),
      linkText: project.linkText || "Learn More",
      linkUrl: project.linkUrl,
    })),
  };
}

export async function getPosts() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    limit: 100,
    sort: "-publishedAt",
    where: {
      status: {
        equals: "published",
      },
    },
  });

  return docs.map((post) => ({
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || "",
    publishedAt: post.publishedAt || null,
    lastUpdatedAt: post.lastUpdatedAt || null,
    coverImage: post.coverImage,
  }));
}

export async function getPost(slug: string) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: "published",
      },
    },
  });

  if (docs.length === 0) return null;

  const post = docs[0];
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || "",
    content: post.content,
    publishedAt: post.publishedAt || null,
    lastUpdatedAt: post.lastUpdatedAt || null,
    coverImage: post.coverImage,
  };
}
