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
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
    },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "imageUrl",
      type: "text",
      admin: {
        description: "URL to the movie/show poster",
      },
    },
    ...timestamps,
  ],
};
