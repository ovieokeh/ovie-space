import type { CollectionConfig } from "payload";
import { timestamps } from "./shared/timestamps";

// Helper function to generate URL-friendly slug
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
}

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "status", "publishedAt"],
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        // Auto-generate slug from title if slug is empty or contains spaces
        if (data?.title && (!data.slug || data.slug.includes(" "))) {
          data.slug = generateSlug(data.title);
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "URL-friendly identifier (e.g., 'my-first-post')",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      admin: {
        description: "Brief summary for previews and SEO",
      },
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "uploads",
      admin: {
        description: "Optional cover image for the post",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        description: "When this post was first published",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "lastUpdatedAt",
      type: "date",
      admin: {
        description: "When this post was last updated",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    ...timestamps.filter((field) => field.custom?.key !== "publishedAt"),
  ],
};
