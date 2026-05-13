"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { MediaItem } from "@/types";
import { TVFrame } from "./TVFrame";

interface CurrentlyObsessedProps {
  items: MediaItem[];
}

export function CurrentlyObsessed({ items }: CurrentlyObsessedProps) {
  const featured = items
    .filter((item) => item.status === "Watched" && item.rating !== null && item.imageUrl)
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
    .slice(0, 5);

  if (featured.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35, ease: "easeOut" }}
      className="mb-14"
    >
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="font-display text-2xl italic text-foreground sm:text-3xl">
          Tuned in lately
        </h2>
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Highest rated
        </span>
      </div>

      <TVFrame label="Now showing">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-5">
          {featured.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.imdbUrl}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.07 }}
              className="group relative block overflow-hidden rounded-md border border-white/10 bg-cinefill-ink"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={`Poster for ${item.title}`}
                  fill
                  sizes="(min-width: 768px) 180px, (min-width: 640px) 30vw, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cinefill-ink via-cinefill-ink/20 to-transparent opacity-90" />
                <div className="absolute inset-x-2 bottom-2">
                  <p className="font-display text-sm italic leading-tight text-white line-clamp-2">
                    {item.title}
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-cinefill-amber">
                    <Star size={10} strokeWidth={2.5} fill="currentColor" />
                    <span className="font-mono text-[10px] font-semibold tabular-nums">
                      {item.rating?.toFixed(1)}
                    </span>
                    <span className="ml-1 text-[9px] uppercase tracking-[0.2em] text-white/60">
                      {item.year ?? item.type}
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </TVFrame>
    </motion.section>
  );
}
