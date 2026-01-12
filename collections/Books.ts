import type { CollectionConfig } from "payload";

export const Books: CollectionConfig = {
  slug: "books",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "status"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "author",
      type: "text",
      required: true,
    },
    {
      name: "status",
      type: "select",
      required: true,
      options: [
        { label: "Reading", value: "Reading" },
        { label: "Finished", value: "Finished" },
        { label: "Want to Read", value: "Want to Read" },
      ],
      defaultValue: "Want to Read",
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
        description: "URL to the book cover image",
      },
    },
  ],
};
