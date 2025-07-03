import type { NextRequest } from "next/server";
import { load } from "cheerio";
import { LinkPreviewData } from "@/types";

// export const runtime = "edge"; // Fast & cold‑start friendly
// export const revalidate = 60 * 60 * 6; // 6 hours – tweak as needed

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("url");
  if (!targetUrl) {
    return new Response(JSON.stringify({ error: 'Missing "url" query param' }), { status: 400 });
  }

  console.log("[link-preview] Fetching:", targetUrl);

  try {
    // 1) Fetch the remote HTML
    const res = await fetch(targetUrl, {});

    console.log("[link-preview] Upstream response:", res.status, res.statusText);

    if (!res.ok) throw new Error(`Upstream responded with ${res.status}`);

    const html = await res.text();

    // 2) Parse with Cheerio (≈ jQuery for servers)
    const $ = load(html);
    const og = (prop: string) =>
      $(`meta[property="${prop}"]`).attr("content") || $(`meta[name="${prop}"]`).attr("content") || "";

    const data: LinkPreviewData = {
      url: targetUrl,
      title: og("og:title") || $("title").text() || targetUrl,
      description: og("og:description") || $('meta[name="description"]').attr("content") || "",
      image: og("og:image") || og("twitter:image") || "",
    };

    return new Response(JSON.stringify(data), {
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    console.error("[link-preview] Scrape failed:", err);
    return new Response(JSON.stringify({ error: "Scrape failed" }), { status: 500 });
  }
}
