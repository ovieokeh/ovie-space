import type { Field } from "payload";

export const timestamps: Field[] = [
  {
    name: "publishedAt",
    type: "date",
    admin: {
      position: "sidebar",
      description: "When this item was published/completed",
      date: {
        pickerAppearance: "dayOnly",
      },
    },
    custom: {
      key: "publishedAt",
    },
  },
  {
    name: "createdAt",
    type: "date",
    admin: {
      position: "sidebar",
      date: {
        pickerAppearance: "dayAndTime",
      },
    },
  },
  {
    name: "updatedAt",
    type: "date",
    admin: {
      position: "sidebar",
      date: {
        pickerAppearance: "dayAndTime",
      },
    },
  },
];
