"use client";
import Image from "next/image";
import { motion } from "framer-motion";

import { cardVariants } from "@/styling/variants";
import { MediaItem } from "@/types";
import Markdown from "react-markdown";
import { markdownComponents } from "./shared";

interface MediaCardProps {
  media: MediaItem;
}

export const MediaCard = ({ media }: MediaCardProps) => {
  const statusColor = "bg-blue-400/10 text-blue-600 dark:text-blue-300";

  return (
    <motion.div
      variants={cardVariants}
      className="bg-secondary rounded-lg overflow-hidden border border-border flex flex-col"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Image
        src={media.imageUrl}
        alt={`Poster for ${media.title}`}
        height={400}
        width={400}
        className="w-full h-64 object-cover"
        onError={(e) => {
          e.currentTarget.src = "https://placehold.co/400x600/0f172a/e0e0e0?text=Image+Error";
        }}
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-foreground mb-1">{media.title}</h3>
        <p className="text-muted-foreground mb-4 text-sm font-medium">{media.type}</p>
        <div className="flex items-center flex-wrap gap-2 mb-4">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor}`}>{media.status}</span>
          {media.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2 py-1 rounded-full bg-secondary border border-border text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-muted-foreground leading-relaxed text-sm flex-grow">{media.description}</p>
        {media.personalReview && (
          <div className="mt-4 pt-4 border-t border-border">
            <h4 className="text-sm font-semibold text-foreground mb-2">Personal Review</h4>
            <Markdown components={markdownComponents}>{media.personalReview}</Markdown>
          </div>
        )}
      </div>
    </motion.div>
  );
};
