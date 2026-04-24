import type { CollectionConfig } from "payload";
import { timestamps } from "./shared/timestamps";

export const TimelineCheckpoints: CollectionConfig = {
  slug: "timeline-checkpoints",
  admin: {
    useAsTitle: "sub",
    defaultColumns: ["sub", "label", "variant", "order", "current"],
  },
  fields: [
    {
      name: "label",
      type: "text",
      required: true,
      admin: { description: 'Date label shown in the left column (e.g. "2026", "2022 — 2025").' },
    },
    {
      name: "sub",
      type: "text",
      required: true,
      admin: { description: 'Name shown below the date (e.g. "Now", "Bird", "Eurail").' },
    },
    {
      name: "variant",
      type: "select",
      required: true,
      defaultValue: "single",
      options: [
        { label: "Hero (big card, with image)", value: "hero" },
        { label: "Single (one project, standard card)", value: "single" },
        { label: "Stack (multiple projects in one card, divided)", value: "stack" },
        { label: "Grid (multiple projects side-by-side)", value: "grid" },
      ],
    },
    {
      name: "current",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Mark this checkpoint as current (pulsing node, emphasised styling)." },
    },
    {
      name: "order",
      type: "number",
      admin: { description: "Display order (lower numbers appear first / top)." },
    },
    ...timestamps,
  ],
};
