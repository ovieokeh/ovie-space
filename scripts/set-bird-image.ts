import { getPayload } from "payload";
import config from "../payload.config";

async function main() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "projects",
    where: { title: { equals: "Bird Box" } },
    limit: 1,
  });
  const doc = docs[0];
  if (!doc) {
    console.error("Bird Box project not found");
    process.exit(1);
  }

  await payload.update({
    collection: "projects",
    id: doc.id,
    data: { imageUrl: "https://bird.com/assets/marketing/campaigns-hero.webp" },
  });
  console.log("  ↻ set imageUrl on Bird Box");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
