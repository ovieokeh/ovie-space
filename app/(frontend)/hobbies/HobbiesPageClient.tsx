"use client";
import { motion } from "framer-motion";
import { VideoCard } from "@/components/cards/VideoCard";
import { PageLayout } from "@/components/layout/PageLayout";
import { VerticalTimeline } from "@/components/layout/VerticalTimeline";
import { sectionVariants } from "@/styling/variants";
import { VideoItem } from "@/types";

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
    date: new Date(video.publishedAt ?? video.createdAt),
    content: <VideoCard video={video} />,
  }));

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
          Beyond coding, I spend my time exploring creative outlets and learning new skills. Playing the piano is a
          major part of this—I'm drawn to classical pieces by Beethoven and contemporary works by Ludovico Einaudi.
          There's something meditative about practicing a difficult passage until it finally clicks.
        </p>
        <p className="text-foreground/90 leading-relaxed">
          This feed documents my creative journey: piano performances, vlogs, electronics projects, and other things I'm
          working on. It's a way to track my progress and hopefully inspire myself whenever I feel stuck. If any of it
          resonates with you, I'd love to hear about it.
        </p>
      </motion.section>

      {/* Hobbies Timeline */}
      <motion.section id="hobbies-feed" variants={sectionVariants} initial="hidden" animate="visible">
        <VerticalTimeline items={timelineItems} />
      </motion.section>
    </PageLayout>
  );
}
