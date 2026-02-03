import { getBooks, getMedia, getPosts, getProjects, getVideos } from "./lib/payload";

export interface LinkPreviewData {
  title: string;
  description: string;
  image: string; // absolute URL or empty string
  url: string;
}

export type BookItems = Awaited<ReturnType<typeof getBooks>>;
export type BookItem = BookItems[number];

export type MediaItems = Awaited<ReturnType<typeof getMedia>>;
export type MediaItem = MediaItems[number];

export type ProjectItems = Awaited<ReturnType<typeof getProjects>>;

export type PostItems = Awaited<ReturnType<typeof getPosts>>;
export type PostItem = PostItems[number];

export type VideoItems = Awaited<ReturnType<typeof getVideos>>;
export type VideoItem = VideoItems[number];
