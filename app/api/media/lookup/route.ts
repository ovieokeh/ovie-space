import type { NextRequest } from "next/server";

export interface MediaSearchResult {
  id: number;
  title: string;
  posterUrl: string | null;
  releaseYear: string;
  type: "Movie" | "Show";
}

export interface MediaSearchResponse {
  success: boolean;
  results?: MediaSearchResult[];
  error?: string;
}

export interface MediaDetailResponse {
  success: boolean;
  data?: {
    title: string;
    description: string;
    imageUrl: string;
    type: "Movie" | "Show";
    genres: string[];
  };
  error?: string;
}

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_API_ACCESS_TOKEN = process.env.TMDB_API_READ_ACCESS_TOKEN;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export async function GET(req: NextRequest): Promise<Response> {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");
  const id = searchParams.get("id");
  const type = searchParams.get("type"); // "movie" or "tv"

  if (!TMDB_API_ACCESS_TOKEN) {
    return Response.json({ success: false, error: "TMDB API key not configured" } satisfies MediaSearchResponse, {
      status: 500,
    });
  }

  // If ID is provided, fetch details for autofill
  if (id && type) {
    return fetchMediaDetails(id, type as "movie" | "tv");
  }

  // Otherwise, search by query
  if (!query) {
    return Response.json({ success: false, error: 'Missing "query" parameter' } satisfies MediaSearchResponse, {
      status: 400,
    });
  }

  return searchMedia(query);
}

async function searchMedia(query: string): Promise<Response> {
  console.log("[media-lookup] Searching for:", query);

  try {
    const response = await fetch(
      `${TMDB_BASE_URL}/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
      {
        headers: {
          Authorization: `Bearer ${TMDB_API_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      console.error("[media-lookup] TMDB API error:", response.status);
      return Response.json({ success: false, error: "Failed to search TMDB" } satisfies MediaSearchResponse, {
        status: 500,
      });
    }

    const data = await response.json();

    // Filter to only movies and TV shows, map to our format
    const results: MediaSearchResult[] = data.results
      .filter((item: any) => item.media_type === "movie" || item.media_type === "tv")
      .slice(0, 10)
      .map((item: any) => ({
        id: item.id,
        title: item.media_type === "movie" ? item.title : item.name,
        posterUrl: item.poster_path ? `${TMDB_IMAGE_BASE}${item.poster_path}` : null,
        releaseYear: extractYear(item.media_type === "movie" ? item.release_date : item.first_air_date),
        type: item.media_type === "movie" ? "Movie" : "Show",
      }));

    console.log("[media-lookup] Found", results.length, "results");

    return Response.json({ success: true, results } satisfies MediaSearchResponse);
  } catch (error) {
    console.error("[media-lookup] Search failed:", error);
    return Response.json({ success: false, error: "Failed to search media" } satisfies MediaSearchResponse, {
      status: 500,
    });
  }
}

async function fetchMediaDetails(id: string, type: "movie" | "tv"): Promise<Response> {
  console.log("[media-lookup] Fetching details for:", type, id);

  try {
    const response = await fetch(`${TMDB_BASE_URL}/${type}/${id}?language=en-US`, {
      headers: {
        Authorization: `Bearer ${TMDB_API_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("[media-lookup] TMDB API error:", response.status);
      return Response.json({ success: false, error: "Failed to fetch media details" } satisfies MediaDetailResponse, {
        status: 500,
      });
    }

    const item = await response.json();

    const result: MediaDetailResponse = {
      success: true,
      data: {
        title: type === "movie" ? item.title : item.name,
        description: item.overview || "",
        imageUrl: item.poster_path ? `${TMDB_IMAGE_BASE}${item.poster_path}` : "",
        type: type === "movie" ? "Movie" : "Show",
        genres: item.genres?.map((g: { name: string }) => g.name) || [],
      },
    };

    console.log("[media-lookup] Found:", result.data?.title);

    return Response.json(result);
  } catch (error) {
    console.error("[media-lookup] Fetch details failed:", error);
    return Response.json({ success: false, error: "Failed to fetch media details" } satisfies MediaDetailResponse, {
      status: 500,
    });
  }
}

function extractYear(dateString: string | undefined): string {
  if (!dateString) return "";
  return dateString.split("-")[0] || "";
}
