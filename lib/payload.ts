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

function posterUrl(posterPath: string | null | undefined): string {
  if (!posterPath) return "";
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
}

type CinefillMediaType = "movie" | "tv" | "tv_season";

function canonicalMediaType(mediaType: string): "movie" | "tv" {
  return mediaType === "movie" ? "movie" : "tv";
}

function diaryKey(item: { mediaType: string; tmdbId: number }): string {
  return `${canonicalMediaType(item.mediaType)}:${item.tmdbId}`;
}

function tmdbUrl(item: { mediaType: string; tmdbId: number }): string {
  return `https://www.themoviedb.org/${canonicalMediaType(item.mediaType)}/${item.tmdbId}`;
}

function imdbSearchUrl(title: string, year: string | null | undefined): string {
  const query = year ? `${title} ${year}` : title;
  return `https://www.imdb.com/find/?q=${encodeURIComponent(query)}`;
}

async function imdbUrl(item: {
  mediaType: CinefillMediaType;
  tmdbId: number;
  title: string;
  year?: string | null;
}): Promise<string> {
  const token = process.env.TMDB_API_READ_ACCESS_TOKEN;
  if (!token) return imdbSearchUrl(item.title, item.year);

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/${canonicalMediaType(item.mediaType)}/${item.tmdbId}/external_ids`,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 60 * 60 * 24 * 7 },
      },
    );

    if (!res.ok) return imdbSearchUrl(item.title, item.year);

    const data = (await res.json()) as { imdb_id?: unknown };
    if (typeof data.imdb_id === "string" && data.imdb_id.length > 0) {
      return `https://www.imdb.com/title/${data.imdb_id}/`;
    }
  } catch {
    return imdbSearchUrl(item.title, item.year);
  }

  return imdbSearchUrl(item.title, item.year);
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
    description: book.description || "",
    imageUrl: book.imageUrl ? decodeURIComponent(book.imageUrl) : "",
    personalReview: (book as { personalReview?: string }).personalReview || "",
    updatedAt: book.updatedAt,
    createdAt: book.createdAt,
    publishedAt: book.publishedAt,
  }));
}

export async function getMedia() {
  const payload = await getPayload({ config });
  const [{ docs: diaryEntries }, { docs: watchlistItems }] = await Promise.all([
    payload.find({
      collection: "cinefill-diary-entries",
      limit: 1000,
      sort: "-clientUpdatedAt",
      where: { clientDeletedAt: { equals: null } },
    }),
    payload.find({
      collection: "cinefill-watchlist-items",
      limit: 1000,
      sort: "-addedAt",
      where: { clientDeletedAt: { equals: null } },
    }),
  ]);

  const loggedKeys = new Set(diaryEntries.map(diaryKey));
  const watched = await Promise.all(
    diaryEntries.map(async (item) => ({
      id: item.syncId,
      title:
        item.mediaType === "tv_season" && item.seasonNumber
          ? `${item.title}: Season ${item.seasonNumber}`
          : item.title,
      type: item.mediaType === "movie" ? "Movie" as const : "Show" as const,
      status: "Watched" as const,
      source: "diary" as const,
      tags: [] as string[],
      description: "",
      imageUrl: posterUrl(item.posterPath),
      tmdbUrl: tmdbUrl(item),
      imdbUrl: await imdbUrl(item),
      rating: item.rating > 0 ? item.rating : null,
      year: item.year || null,
      updatedAt: item.updatedAt,
      createdAt: new Date(item.createdAt).toISOString(),
      personalReview: item.note || "",
      publishedAt: item.watchedDate,
    })),
  );

  const watchlist = await Promise.all(
    watchlistItems
      .filter((item) => !loggedKeys.has(diaryKey(item)))
      .map(async (item) => ({
        id: item.syncId,
        title: item.title,
        type: item.mediaType === "movie" ? "Movie" as const : "Show" as const,
        status: "Want to Watch" as const,
        source: "watchlist" as const,
        tags: [] as string[],
        description: "",
        imageUrl: posterUrl(item.posterPath),
        tmdbUrl: tmdbUrl(item),
        imdbUrl: await imdbUrl(item),
        rating: null,
        year: item.year || null,
        updatedAt: item.updatedAt,
        createdAt: new Date(item.addedAt).toISOString(),
        personalReview: "",
        publishedAt: null,
      })),
  );

  return [...watched, ...watchlist].sort((a, b) => {
    const aTime = new Date(a.publishedAt ?? a.createdAt).getTime();
    const bTime = new Date(b.publishedAt ?? b.createdAt).getTime();
    return bTime - aTime;
  });
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
    createdAt: video.createdAt,
    updatedAt: video.updatedAt,
    publishedAt: video.publishedAt || null,
  }));
}

export type TimelineProject = {
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  image: string;
  badge?: string;
};

export type TimelineCheckpoint = {
  id: number;
  label: string;
  sub: string;
  variant: "hero" | "single" | "stack" | "grid";
  current: boolean;
  projects: TimelineProject[];
};

export async function getTimeline(): Promise<TimelineCheckpoint[]> {
  const payload = await getPayload({ config });

  const [{ docs: checkpoints }, { docs: projects }] = await Promise.all([
    payload.find({ collection: "timeline-checkpoints", limit: 100, sort: "order" }),
    payload.find({ collection: "projects", limit: 100, sort: "timelineOrder" }),
  ]);

  return checkpoints.map((cp) => ({
    id: cp.id,
    label: cp.label,
    sub: cp.sub,
    variant: cp.variant,
    current: Boolean(cp.current),
    projects: projects
      .filter((p) => {
        const ref = p.timelineCheckpoint;
        if (!ref) return false;
        const refId = typeof ref === "object" ? ref.id : ref;
        return refId === cp.id;
      })
      .map((p) => ({
        title: p.title,
        description: extractTextFromRichText(p.description),
        linkText: p.linkText || "Learn More",
        linkUrl: p.linkUrl,
        image: p.imageUrl || "",
        badge: p.timelineBadge || undefined,
      })),
  }));
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
    content: post.content,
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
