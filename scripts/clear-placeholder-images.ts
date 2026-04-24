import { getPayload } from "payload";
import config from "../payload.config";

async function main() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({ collection: "projects", limit: 100 });

  for (const doc of docs) {
    const img = doc.imageUrl ?? "";
    if (img.includes("placehold.co")) {
      await payload.update({
        collection: "projects",
        id: doc.id,
        data: { imageUrl: "" },
      });
      console.log(`  ↻ cleared placeholder imageUrl on: ${doc.title}`);
    }
  }

  console.log("\nDone.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
