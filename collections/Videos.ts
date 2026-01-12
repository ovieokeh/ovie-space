import type { CollectionConfig } from "payload";

export const Videos: CollectionConfig = {
  slug: "videos",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "videoUrl"],
  },
  labels: {
    singular: "Video",
    plural: "Videos",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "richText",
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
      name: "thumbnailUrl",
      type: "text",
      admin: {
        description: "URL to the video thumbnail",
      },
    },
    {
      name: "videoUrl",
      type: "text",
      required: true,
      admin: {
        description: "YouTube or other video URL",
      },
    },
  ],
};
