import { getPayload } from "payload";
import config from "../payload.config";

async function main() {
  const payload = await getPayload({ config });

  const [{ docs: cps }, { docs: projs }] = await Promise.all([
    payload.find({ collection: "timeline-checkpoints", where: { sub: { equals: "Now" } }, limit: 1 }),
    payload.find({ collection: "projects", where: { title: { equals: "SoundDojo" } }, limit: 1 }),
  ]);

  const cp = cps[0];
  const proj = projs[0];
  if (!cp || !proj) {
    console.error(`Missing: cp=${Boolean(cp)} proj=${Boolean(proj)}`);
    process.exit(1);
  }

  await payload.update({
    collection: "projects",
    id: proj.id,
    data: { timelineCheckpoint: cp.id, timelineOrder: 0 },
  });
  console.log(`  → linked ${proj.title} to "${cp.sub}" [cp=${cp.id}, proj=${proj.id}]`);
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
