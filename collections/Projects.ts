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
      name: "order",
      type: "number",
      admin: {
        description: "Display order (lower numbers appear first)",
      },
    },
    {
      name: "timelineCheckpoint",
      type: "relationship",
      relationTo: "timeline-checkpoints",
      admin: {
        description: "Which timeline checkpoint this project belongs to. Leave empty to hide from timeline.",
      },
    },
    {
      name: "timelineBadge",
      type: "text",
      admin: {
        description: 'Badge shown inside a stacked checkpoint (e.g. "2022 — 2025", "Earlier"). Optional.',
      },
    },
    {
      name: "timelineOrder",
      type: "number",
      admin: {
        description: "Order within the timeline checkpoint (for stack / grid variants).",
      },
    },
    ...timestamps,
  ],
};
