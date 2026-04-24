import { getPayload } from "payload";
import config from "../payload.config";

type CheckpointSpec = {
  label: string;
  sub: string;
  variant: "hero" | "single" | "stack" | "grid";
  current: boolean;
  order: number;
};

type ProjectLink = {
  title: string;
  checkpointSub: string;
  timelineOrder?: number;
  timelineBadge?: string;
};

const checkpoints: CheckpointSpec[] = [
  { label: "2026", sub: "Now", variant: "hero", current: true, order: 0 },
  { label: "2025 →", sub: "In parallel", variant: "grid", current: false, order: 1 },
  { label: "2022 — 2025", sub: "Bird", variant: "stack", current: false, order: 2 },
  { label: "2020 — 2022", sub: "Eurail", variant: "single", current: false, order: 3 },
  { label: "Ongoing", sub: "Workshop", variant: "single", current: false, order: 4 },
];

const links: ProjectLink[] = [
  { title: "SoundDojo", checkpointSub: "Now" },
  { title: "BigPerspective", checkpointSub: "In parallel", timelineOrder: 0 },
  { title: "Kindling", checkpointSub: "In parallel", timelineOrder: 1 },
  { title: "ChatWrapped", checkpointSub: "In parallel", timelineOrder: 2 },
  { title: "Bird Box", checkpointSub: "Bird", timelineOrder: 0, timelineBadge: "2022 — 2025" },
  { title: "Pusher", checkpointSub: "Bird", timelineOrder: 1, timelineBadge: "Earlier" },
  { title: "Eurail", checkpointSub: "Eurail" },
  { title: "Explorations", checkpointSub: "Workshop" },
];

async function main() {
  const payload = await getPayload({ config });

  // Upsert checkpoints by `sub`
  const existingCps = await payload.find({ collection: "timeline-checkpoints", limit: 100 });
  const cpBySub = new Map(existingCps.docs.map((d) => [d.sub, d]));
  const cpIdBySub = new Map<string, number>();

  for (const c of checkpoints) {
    const found = cpBySub.get(c.sub);
    if (found) {
      const updated = await payload.update({
        collection: "timeline-checkpoints",
        id: found.id,
        data: c,
      });
      cpIdBySub.set(c.sub, updated.id);
      console.log(`  ↻ updated checkpoint: ${c.sub} [id=${updated.id}]`);
    } else {
      const created = await payload.create({ collection: "timeline-checkpoints", data: c });
      cpIdBySub.set(c.sub, created.id);
      console.log(`  + created checkpoint: ${c.sub} [id=${created.id}]`);
    }
  }

  // Link projects
  const projects = await payload.find({ collection: "projects", limit: 100 });
  const projByTitle = new Map(projects.docs.map((d) => [d.title, d]));

  for (const l of links) {
    const proj = projByTitle.get(l.title);
    if (!proj) {
      console.log(`  ! project not found: ${l.title}`);
      continue;
    }
    const cpId = cpIdBySub.get(l.checkpointSub);
    if (cpId === undefined) {
      console.log(`  ! checkpoint not found for: ${l.title} → ${l.checkpointSub}`);
      continue;
    }
    await payload.update({
      collection: "projects",
      id: proj.id,
      data: {
        timelineCheckpoint: cpId,
        timelineOrder: l.timelineOrder ?? 0,
        timelineBadge: l.timelineBadge ?? null,
      },
    });
    console.log(`  → linked ${l.title} to "${l.checkpointSub}"${l.timelineBadge ? ` (${l.timelineBadge})` : ""}`);
  }

  console.log("\nDone.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
