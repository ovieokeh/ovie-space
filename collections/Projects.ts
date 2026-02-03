import type { CollectionConfig } from "payload";
import { timestamps } from "./shared/timestamps";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "isFeatured"],
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
      name: "imageUrl",
      type: "text",
      admin: {
        description: "URL to the project image",
      },
    },
    {
      name: "linkText",
      type: "text",
      defaultValue: "Learn More",
    },
    {
      name: "linkUrl",
      type: "text",
      required: true,
    },
    {
      name: "isFeatured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Show this project in the featured section",
      },
    },
    {
      name: "order",
      type: "number",
      admin: {
        description: "Display order (lower numbers appear first)",
      },
    },
    ...timestamps,
  ],
};
