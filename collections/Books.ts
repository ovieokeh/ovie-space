import type { CollectionConfig } from "payload";
import axios from "axios";

export const Books: CollectionConfig = {
  slug: "books",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "status"],
  },
  hooks: {
    beforeValidate: [
      async ({ data }) => {
        if (data?.isbn && (!data.title || !data.author || !data.description)) {
          try {
            const response = await axios.get(`https://openlibrary.org/isbn/${data.isbn}.json`);
            const book = response.data;
            if (book) {
              data.title = data.title || book.title;
              data.author = data.author || (book.authors ? book.authors.map((a: any) => a.name).join(", ") : "");
              if (!data.description && book.description) {
                const descText = typeof book.description === "string" ? book.description : book.description.value || "";
                data.description = {
                  root: {
                    type: "root",
                    children: [
                      {
                        type: "paragraph",
                        children: [{ type: "text", text: descText }],
                        version: 1,
                      },
                    ],
                    direction: "ltr",
                    format: "",
                    indent: 0,
                    version: 1,
                  },
                };
              }
              if (!data.imageUrl && book.covers && book.covers.length > 0) {
                data.imageUrl = `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`;
              }
            }
          } catch (error) {
            console.error("Error fetching book data from Open Library:", error);
          }
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "isbn",
      type: "text",
      admin: {
        description: "ISBN-10 or ISBN-13 to autopopulate book details",
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
  ],
};
