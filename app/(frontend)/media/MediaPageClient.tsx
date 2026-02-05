"use client";
import { motion } from "framer-motion";
import { MediaCard } from "@/components/cards/MediaCard";
import { PageLayout } from "@/components/layout/PageLayout";
import { VerticalTimeline } from "@/components/layout/VerticalTimeline";
import { sectionVariants } from "@/styling/variants";
import { MediaItem } from "@/types";

interface MediaPageClientProps {
  media: MediaItem[];
  header: {
    title: string;
    description: string;
  };
}

export function MediaPageClient({ media, header }: MediaPageClientProps) {
  const timelineItems = media.map((item) => ({
    id: item.title,
    date: new Date(item.publishedAt ?? item.createdAt),
    content: <MediaCard media={item} />,
  }));

  const movieCount = media.filter((m) => m.type === "Movie").length;
  const showCount = media.filter((m) => m.type === "Show").length;

  return (
    <PageLayout title={header.title} description={header.description} maxWidth="wide">
      {/* Prose Introduction */}
      <motion.section
        className="mb-12 prose prose-lg dark:prose-invert max-w-none"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <p className="text-foreground/90 leading-relaxed">
          I love a good story, whether it's a mind-bending plot twist, a quiet character study, or an emotional journey
          that stays with you long after the credits roll. Films like <em>Incendies</em>, <em>Past Lives</em>, and{" "}
          <em>Eternal Sunshine of the Spotless Mind</em> are the kind that resonate with me most.
        </p>
        <p className="text-foreground/90 leading-relaxed">
          This is my media log—{media.length} titles including {movieCount} movies and {showCount} shows. I try to add
          personal reviews and thoughts where I can, capturing what made each piece memorable.
        </p>
      </motion.section>

      {/* Media Timeline */}
      <motion.section id="media-library" variants={sectionVariants} initial="hidden" animate="visible">
        <VerticalTimeline items={timelineItems} />
      </motion.section>
    </PageLayout>
  );
}
