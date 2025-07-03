"use client";
import { motion } from "framer-motion";
import { VideoItem } from "@/types";
import Image from "next/image";
import { cardVariants } from "@/styling/variants";
import { Clapperboard } from "lucide-react";

interface VideoCardProps {
  video: VideoItem;
}
export const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <motion.div variants={cardVariants} className="flex flex-col group">
      <a
        href={video.videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block bg-slate-800 rounded-lg overflow-hidden mb-4 relative"
      >
        <Image
          src={video.thumbnailUrl}
          alt={`Thumbnail for ${video.title}`}
          width={1280}
          height={720}
          className="w-full object-cover aspect-video transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/1280x720/0f172a/e0e0e0?text=Image+Error";
          }}
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Clapperboard className="text-white/80" size={64} />
        </div>
      </a>
      <div>
        <h3 className="text-lg font-semibold text-white mb-2 leading-tight group-hover:text-cyan-400 transition-colors duration-300">
          <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
            {video.title}
          </a>
        </h3>
        <p className="text-slate-400 text-sm mb-3 leading-relaxed">{video.description}</p>
        <div className="flex flex-wrap gap-2">
          {video.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-2 py-1 rounded-full bg-slate-700 text-slate-300 capitalize"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
