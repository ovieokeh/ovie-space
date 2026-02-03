import type { CollectionConfig } from "payload";
import { timestamps } from "./shared/timestamps";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type", "status"],
  },
  fields: [
    {
      name: "tmdbLookup",
      type: "text",
      admin: {
        description: "Search for a movie or TV show to autopopulate details",
        components: {
          Field: "@/components/admin/MediaLookupField#MediaLookupField",
        },
      },
    },
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "Movie", value: "Movie" },
        { label: "Show", value: "Show" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      options: [
        { label: "Watched", value: "Watched" },
        { label: "Watching", value: "Watching" },
        { label: "Want to Watch", value: "Want to Watch" },
      ],
      defaultValue: "Want to Watch",
    },

    {
      name: "description",
      type: "textarea",
    },
    {
      name: "imageUrl",
      type: "text",
      admin: {
        description: "URL to the movie/show poster",
      },
    },
    {
      name: "personalReview",
      type: "textarea",
      admin: {
        description: "Your personal thoughts and review of the movie/show",
      },
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
    ...timestamps,
  ],
};
