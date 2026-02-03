import { hobbiesData } from "./content/hobbies";
import { mediaData } from "./content/media";
import { readingData } from "./content/reading";

export interface LinkPreviewData {
  title: string;
  description: string;
  image: string; // absolute URL or empty string
  url: string;
}

export type BookItem = (typeof readingData.library)[number] & {
  personalReview?: string;
};

export type MediaItem = (typeof mediaData.library)[number];

export type VideoItem = (typeof hobbiesData.videos)[number];
