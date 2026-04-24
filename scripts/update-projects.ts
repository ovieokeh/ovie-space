import { getPayload } from "payload";
import config from "../payload.config";

type Spec = {
  title: string;
  description: string;
  linkText: string;
  linkUrl: string;
  order: number;
  imageUrl?: string;
};

const specs: Spec[] = [
  {
    title: "sounddojo",
    description:
      "Native Swift app for piano practice — spec‑first gameplay model, built ground‑up. Current main build.",
    linkText: "Open sounddojo",
    linkUrl: "https://sounddojo.app",
    order: 0,
  },
  {
    title: "Bird Box",
    description:
      "Bird's all‑in‑one app for running a small business — invoicing, CRM, projects, payroll, messaging, all in one place. Worked on it full‑stack for three years until June 2025, shipping features end‑to‑end across the web app and the platform underneath.",
    linkText: "See Bird",
    linkUrl: "https://bird.com",
    order: 1,
  },
  {
    title: "Eurail",
    description:
      "Built timetable and trip‑planner features on eurail.com, the site a lot of Europe uses to plan rail travel. Frontend‑focused role in a large distributed team. My first job in the European market.",
    linkText: "See Eurail",
    linkUrl: "https://eurail.com",
    order: 2,
  },
  {
    title: "Pusher",
    description:
      "Front‑end at Pusher — realtime APIs for chat, presence, and live data. Early developer‑experience work and four published tutorials. Pusher was later acquired by MessageBird, which became Bird, where I ended up working years later. Small world.",
    linkText: "See on Pusher",
    linkUrl: "https://pusher.com/author/ovie-okeh",
    order: 3,
  },
  {
    title: "Kindling",
    description:
      "An experiment in whether community and structure can help people actually stick to their goals. Platform for shared, guided routines — you join, show up, see others show up.",
    linkText: "Visit Kindling",
    linkUrl: "https://www.getkindling.app/en",
    order: 4,
  },
  {
    title: "BigPerspective",
    description:
      "Tool for tracking how critical assets — oil, metals, grain, chips — flow between countries, and when those flows come under pressure. I built it because understanding squeezed supply chains explains a lot of what nation‑states actually do.",
    linkText: "Open BigPerspective",
    linkUrl: "https://bigperspective.ovie.dev",
    order: 5,
  },
  {
    title: "ChatWrapped",
    description:
      "Your WhatsApp, as a story — turn a chat export into shareable stats on reply speed, night‑owl energy, and who starts the chaos.",
    linkText: "Try it",
    linkUrl: "https://chatwrapped.ovie.dev",
    order: 6,
  },
  {
    title: "Explorations",
    description:
      "The public workshop — open‑source experiments, tutorials, and half‑finished ideas. Currently a mix of Solana trading bots, AI meeting tools, and personal automation.",
    linkText: "See my GitHub",
    linkUrl: "https://github.com/ovieokeh",
    order: 7,
  },
];

function toLexical(text: string) {
  return {
    root: {
      type: "root",
      children: [
        {
          type: "paragraph",
          children: [{ type: "text", text, version: 1 }],
          version: 1,
        },
      ],
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      version: 1,
    },
  };
}

async function main() {
  const payload = await getPayload({ config });
  const existing = await payload.find({ collection: "projects", limit: 100 });
  const byTitle = new Map(existing.docs.map((d) => [d.title, d]));

  for (const s of specs) {
    const found = byTitle.get(s.title);
    const data = {
      title: s.title,
      description: toLexical(s.description),
      linkText: s.linkText,
      linkUrl: s.linkUrl,

      order: s.order,
      ...(s.imageUrl !== undefined ? { imageUrl: s.imageUrl } : {}),
    };

    if (found) {
      await payload.update({ collection: "projects", id: found.id, data });
      console.log(`  ↻ updated: ${s.title} (order=${s.order})`);
    } else {
      await payload.create({ collection: "projects", data });
      console.log(`  + created: ${s.title} (order=${s.order})`);
    }
  }

  const seenTitles = new Set(specs.map((s) => s.title));
  for (const doc of existing.docs) {
    if (!seenTitles.has(doc.title)) {
      console.log(`  ! untouched (not in spec): ${doc.title} [id=${doc.id}]`);
    }
  }

  console.log("\nDone.");
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
