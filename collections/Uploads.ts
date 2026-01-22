import type { CollectionConfig } from "payload";

export const Uploads: CollectionConfig = {
  slug: "uploads",
  admin: {
    useAsTitle: "filename",
  },
  upload: {
    staticDir: "public/uploads",
    mimeTypes: ["image/*"],
  },
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
