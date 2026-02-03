import type { NextRequest } from "next/server";
import axios from "axios";

export interface BookLookupResponse {
  success: boolean;
  data?: {
    title: string;
    author: string;
    description: string;
    imageUrl: string;
  };
  error?: string;
}

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const isbn = searchParams.get("isbn");

  if (!isbn) {
    return Response.json({ success: false, error: 'Missing "isbn" query param' } satisfies BookLookupResponse, {
      status: 400,
    });
  }

  // Clean up ISBN - remove dashes and spaces
  const cleanIsbn = isbn.replace(/[-\s]/g, "");

  console.log("[book-lookup] Fetching ISBN:", cleanIsbn);

  try {
    // Fetch from Open Library
    const response = await axios.get(`https://openlibrary.org/isbn/${cleanIsbn}.json`);
    const book = response.data;

    if (!book) {
      return Response.json({ success: false, error: "Book not found" } satisfies BookLookupResponse, { status: 404 });
    }

    // Fetch author details if available
    let authorName = "";
    if (book.authors && book.authors.length > 0) {
      try {
        const authorPromises = book.authors.map(async (author: { key: string }) => {
          const authorResponse = await axios.get(`https://openlibrary.org${author.key}.json`);
          return authorResponse.data.name || "";
        });
        const authorNames = await Promise.all(authorPromises);
        authorName = authorNames.filter(Boolean).join(", ");
      } catch {
        console.log("[book-lookup] Could not fetch author details");
      }
    }

    // Extract description
    let description = "";
    if (book.description) {
      description = typeof book.description === "string" ? book.description : book.description.value || "";
    }

    // Get cover image URL
    let imageUrl = "";
    if (book.covers && book.covers.length > 0) {
      imageUrl = `https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`;
    }

    const result: BookLookupResponse = {
      success: true,
      data: {
        title: book.title || "",
        author: authorName,
        description,
        imageUrl,
      },
    };

    console.log("[book-lookup] Success:", result.data?.title);

    return Response.json(result);
  } catch (error) {
    console.error("[book-lookup] Fetch failed:", error);

    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return Response.json({ success: false, error: "Book not found for this ISBN" } satisfies BookLookupResponse, {
        status: 404,
      });
    }

    return Response.json({ success: false, error: "Failed to fetch book data" } satisfies BookLookupResponse, {
      status: 500,
    });
  }
}
