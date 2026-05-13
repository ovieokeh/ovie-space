import { getPayload } from "payload";
import config from "../payload.config";

// Import existing content
import { readingData } from "../content/reading";
import { hobbiesData } from "../content/hobbies";
import { homepageContent } from "../content/homepage";

async function seed() {
  console.log("🌱 Starting seed...");

  const payload = await getPayload({ config });

  // Seed Books
  console.log("📚 Seeding books...");
  for (const book of readingData.library) {
    try {
      await payload.create({
        collection: "books",
        data: {
          title: book.title,
          author: book.author,
          status: book.status as "Reading" | "Finished" | "Want to Read",
          tags: book.tags.map((tag) => ({ tag })),
          description: book.description,
          imageUrl: book.imageUrl,
        },
      });
      console.log(`  ✓ Created book: ${book.title}`);
    } catch (error) {
      console.error(`  ✗ Failed to create book: ${book.title}`, error);
    }
  }

  // Seed Videos (Hobbies)
  console.log("🎥 Seeding videos...");
  for (const video of hobbiesData.videos) {
    try {
      await payload.create({
        collection: "videos",
        data: {
          title: video.title,
          tags: video.tags.map((tag) => ({ tag })),
          description: {
            root: {
              type: "root",
              children: [
                {
                  type: "paragraph",
                  children: [{ type: "text", text: video.description }],
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              version: 1,
            },
          },
          thumbnailUrl: video.thumbnailUrl,
          videoUrl: video.videoUrl,
        },
      });
      console.log(`  ✓ Created video: ${video.title}`);
    } catch (error) {
      console.error(`  ✗ Failed to create video: ${video.title}`, error);
    }
  }

  // Seed Projects
  console.log("💼 Seeding projects...");

  // Featured project
  const featured = homepageContent.work.featured;
  try {
    await payload.create({
      collection: "projects",
      data: {
        title: featured.title,
        description: {
          root: {
            type: "root",
            children: [
              {
                type: "paragraph",
                children: [{ type: "text", text: featured.description }],
                version: 1,
              },
            ],
            direction: "ltr",
            format: "",
            indent: 0,
            version: 1,
          },
        },
        linkText: featured.linkText,
        linkUrl: featured.linkUrl,
        order: 0,
      },
    });
    console.log(`  ✓ Created featured project: ${featured.title}`);
  } catch (error) {
    console.error(`  ✗ Failed to create featured project: ${featured.title}`, error);
  }

  // Other projects
  for (let i = 0; i < homepageContent.work.others.length; i++) {
    const project = homepageContent.work.others[i];
    try {
      await payload.create({
        collection: "projects",
        data: {
          title: project.title,
          description: {
            root: {
              type: "root",
              children: [
                {
                  type: "paragraph",
                  children: [{ type: "text", text: project.description }],
                  version: 1,
                },
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              version: 1,
            },
          },
          imageUrl: project.image,
          linkText: project.linkText,
          linkUrl: project.linkUrl,
          order: i + 1,
        },
      });
      console.log(`  ✓ Created project: ${project.title}`);
    } catch (error) {
      console.error(`  ✗ Failed to create project: ${project.title}`, error);
    }
  }

  console.log("✅ Seed complete!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
