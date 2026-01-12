import type { CollectionConfig } from "payload";

export const Uploads: CollectionConfig = {
  slug: "uploads",
  admin: {
    useAsTitle: "filename",
  },
  upload: true,
  fields: [
    {
      name: "alt",
      type: "text",
      admin: {
        description: "Alternative text for accessibility",
      },
    },
  ],
};
