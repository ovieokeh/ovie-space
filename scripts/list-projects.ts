import { getPayload } from "payload";
import config from "../payload.config";

async function main() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({ collection: "projects", limit: 100, sort: "order" });

  console.log(`Found ${docs.length} project(s):\n`);
  for (const p of docs) {
    console.log(`— ${p.title} [order=${p.order ?? "—"}, featured=${p.isFeatured}, id=${p.id}]`);
    console.log(`  linkUrl: ${p.linkUrl}`);
    console.log(`  imageUrl: ${p.imageUrl || "(none)"}`);
    const txt = extractText(p.description);
    console.log(`  description: ${txt.slice(0, 200)}${txt.length > 200 ? "…" : ""}`);
    console.log("");
  }
  process.exit(0);
}

function extractText(rt: unknown): string {
  if (!rt || typeof rt !== "object") return "";
  const root = (rt as { root?: { children?: unknown[] } }).root;
  if (!root?.children) return "";
  const walk = (nodes: unknown[]): string =>
    nodes
      .map((n) => {
        const node = n as { type?: string; text?: string; children?: unknown[] };
        if (node.type === "text") return node.text ?? "";
        if (node.children) return walk(node.children);
        return "";
      })
      .join(" ");
  return walk(root.children).trim();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
