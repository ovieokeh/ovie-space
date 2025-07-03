import { readingData } from "./content/reading";

export interface LinkPreviewData {
  title: string;
  description: string;
  image: string; // absolute URL or empty string
  url: string;
}

export type Book = (typeof readingData.library)[number];
