"use client";
import { motion } from "framer-motion";
import { MediaCard } from "@/components/cards/MediaCard";
import { sectionVariants } from "@/styling/variants";

interface MediaItem {
  title: string;
  type: string;
  status: string;
  tags: string[];
  description: string;
  imageUrl: string;
}

interface MediaPageClientProps {
  media: MediaItem[];
  header: {
    title: string;
    description: string;
  };
}

export function MediaPageClient({ media, header }: MediaPageClientProps) {
  return (
    <div className="bg-background text-foreground font-sans antialiased min-h-screen">
      <main>
        <section className="container mx-auto px-6 pt-24 pb-16 text-center">
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
          id="media-library"
          className="container mx-auto px-6 pb-20 md:pb-28"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {media.map((item) => (
              <MediaCard key={item.title} media={item} />
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
