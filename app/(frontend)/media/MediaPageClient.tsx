"use client";
import { motion } from "framer-motion";
import { MediaCard } from "@/components/cards/MediaCard";
import { PageLayout } from "@/components/layout/PageLayout";
import { VerticalTimeline } from "@/components/layout/VerticalTimeline";
import { sectionVariants } from "@/styling/variants";

interface MediaItem {
  title: string;
  type: string;
  status: string;
  tags: string[];
  description: string;
  imageUrl: string;
  updatedAt: string;
  createdAt: string;
}

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
    date: new Date(item.updatedAt),
    content: <MediaCard media={item} />,
  }));

  return (
    <PageLayout title={header.title} description={header.description} maxWidth="wide">
      <motion.section
        id="media-library"
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <VerticalTimeline items={timelineItems} />
      </motion.section>
    </PageLayout>
  );
}
