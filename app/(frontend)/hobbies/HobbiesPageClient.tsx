"use client";
import { motion } from "framer-motion";
import { VideoCard } from "@/components/cards/VideoCard";
import { PageLayout } from "@/components/layout/PageLayout";
import { VerticalTimeline } from "@/components/layout/VerticalTimeline";
import { sectionVariants } from "@/styling/variants";

interface VideoItem {
  title: string;
  description: string;
  tags: string[];
  date: string;
  thumbnailUrl: string;
  videoUrl: string;
  updatedAt: string;
  createdAt: string;
}

interface HobbiesPageClientProps {
  videos: VideoItem[];
  header: {
    title: string;
    description: string;
  };
}

export function HobbiesPageClient({ videos, header }: HobbiesPageClientProps) {
  const timelineItems = videos.map((video) => ({
    id: video.title,
    date: new Date(video.updatedAt),
    content: <VideoCard video={video} />,
  }));

  return (
    <PageLayout title={header.title} description={header.description} maxWidth="wide">
      <motion.section id="hobbies-feed" variants={sectionVariants} initial="hidden" animate="visible">
        <VerticalTimeline items={timelineItems} />
      </motion.section>
    </PageLayout>
  );
}
