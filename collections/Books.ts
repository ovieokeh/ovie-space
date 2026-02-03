import type { CollectionConfig } from "payload";
import { timestamps } from "./shared/timestamps";

export const Books: CollectionConfig = {
  slug: "books",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "status"],
  },
  fields: [
    {
      name: "isbn",
      type: "text",
      admin: {
        description: "ISBN-10 or ISBN-13 to autopopulate book details",
        components: {
          Field: "@/components/admin/ISBNField#ISBNField",
        },
      },
    },
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
    {
      name: "personalReview",
      type: "textarea",
      admin: {
        description: "Your personal thoughts and review of the book",
      },
    },
    ...timestamps,
  ],
};
