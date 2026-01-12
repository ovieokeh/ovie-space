"use client";
import { motion } from "framer-motion";
import { VideoCard } from "@/components/cards/VideoCard";
import { sectionVariants } from "@/styling/variants";

interface VideoItem {
  title: string;
  description: string;
  tags: string[];
  thumbnailUrl: string;
  videoUrl: string;
}

interface HobbiesPageClientProps {
  videos: VideoItem[];
  header: {
    title: string;
    description: string;
  };
}

export function HobbiesPageClient({ videos, header }: HobbiesPageClientProps) {
  return (
    <div className="bg-background text-foreground font-sans antialiased min-h-screen">
      <main>
        <section className="container mx-auto px-6 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tighter">
              {header.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{header.description}</p>
          </motion.div>
        </section>

        <motion.section
          id="hobbies-feed"
          className="container mx-auto px-6 pb-20 md:pb-28"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {videos.map((video) => (
              <VideoCard key={video.title} video={video} />
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
