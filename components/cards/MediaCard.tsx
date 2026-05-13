"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Star, StarHalf, StickyNote, X } from "lucide-react";
import { useState } from "react";

import { cardVariants } from "@/styling/variants";
import { MediaItem } from "@/types";
import Markdown from "react-markdown";
import { markdownComponents } from "./shared";

interface MediaCardProps {
  media: MediaItem;
}

const fallbackImage = "https://placehold.co/400x600/0f172a/e0e0e0?text=No+Poster";

function formatRating(rating: number): string {
  return Number.isInteger(rating) ? `${rating}/5` : `${rating.toFixed(1)}/5`;
}

function RatingPill({ rating }: { rating: number }) {
  return (
    <div
      className="inline-flex items-center gap-1 rounded-full bg-cinefill-ink/85 px-2 py-1 backdrop-blur-sm"
      aria-label={`${formatRating(rating)} stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = Math.max(0, Math.min(1, rating - index));
        const Icon = filled > 0 && filled < 1 ? StarHalf : Star;
        return (
          <Icon
            key={index}
            size={11}
            strokeWidth={2}
            className={filled > 0 ? "text-cinefill-amber" : "text-white/25"}
            fill={filled > 0 ? "currentColor" : "none"}
          />
        );
      })}
      <span className="ml-1 text-[10px] font-semibold tracking-wide text-cinefill-amber">
        {formatRating(rating)}
      </span>
    </div>
  );
}

export const MediaCard = ({ media }: MediaCardProps) => {
  const isWatchlist = media.status === "Want to Watch";
  const [noteOpen, setNoteOpen] = useState(false);
  const hasOverlay = Boolean(media.personalReview || media.description);

  if (isWatchlist) {
    return (
      <motion.div
        variants={cardVariants}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-secondary/60 transition-colors hover:border-cinefill-amber/40"
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden bg-secondary">
          <Image
            src={media.imageUrl || fallbackImage}
            alt={`Poster for ${media.title}`}
            fill
            sizes="(min-width: 1024px) 220px, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            onError={(event) => {
              event.currentTarget.src = fallbackImage;
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-cinefill-ink/60 to-transparent" />
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-cinefill-ink/85 px-2 py-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-cinefill-amber">
            <span className="h-1 w-1 rounded-full bg-cinefill-amber" />
            On the list
          </span>
          <a
            href={media.imdbUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Open on IMDb"
            className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-cinefill-ink/85 text-white/80 transition hover:bg-cinefill-amber hover:text-cinefill-ink"
          >
            <ExternalLink size={11} strokeWidth={2.5} />
          </a>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-1 px-3 py-3">
          <h3 className="font-display text-[17px] italic leading-tight text-foreground line-clamp-2">
            {media.title}
          </h3>
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
            {media.type}
            {media.year ? ` · ${media.year}` : ""}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-secondary transition-colors hover:border-cinefill-amber/50"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-cinefill-ink">
        <Image
          src={media.imageUrl || fallbackImage}
          alt={`Poster for ${media.title}`}
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          onError={(event) => {
            event.currentTarget.src = fallbackImage;
          }}
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cinefill-ink/55 to-transparent" />

        {media.rating ? (
          <div className="absolute left-3 top-3 z-10">
            <RatingPill rating={media.rating} />
          </div>
        ) : null}

        <a
          href={media.imdbUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Open on IMDb"
          className="absolute right-3 top-3 z-10 inline-flex h-7 w-7 items-center justify-center rounded-full bg-cinefill-ink/85 text-white/80 transition hover:bg-cinefill-amber hover:text-cinefill-ink"
        >
          <ExternalLink size={13} strokeWidth={2.5} />
        </a>

        {hasOverlay ? (
          <button
            type="button"
            onClick={() => setNoteOpen((open) => !open)}
            aria-expanded={noteOpen}
            aria-label={noteOpen ? "Hide note" : "Show note"}
            className="absolute bottom-3 right-3 z-30 inline-flex items-center gap-1 rounded-full bg-cinefill-amber px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cinefill-ink shadow-md transition hover:scale-105"
          >
            {noteOpen ? (
              <>
                <X size={11} strokeWidth={2.5} />
                Close
              </>
            ) : (
              <>
                <StickyNote size={11} strokeWidth={2.5} />
                Note
              </>
            )}
          </button>
        ) : null}

        {hasOverlay ? (
          <div
            aria-hidden={!noteOpen}
            className={`absolute inset-x-0 bottom-0 z-20 max-h-[88%] translate-y-full overflow-y-auto bg-gradient-to-t from-cinefill-ink via-cinefill-ink/95 to-cinefill-ink/80 p-5 pb-12 text-white transition-transform duration-500 ease-out group-hover:translate-y-0 ${
              noteOpen ? "!translate-y-0" : ""
            }`}
          >
            {media.description ? (
              <p className="text-[13px] leading-relaxed text-white/85">
                {media.description}
              </p>
            ) : null}
            {media.personalReview ? (
              <div className={media.description ? "mt-3 border-t border-white/15 pt-3" : ""}>
                <h4 className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cinefill-amber">
                  Personal note
                </h4>
                <div className="text-[13px] text-white/85 [&_a]:underline [&_p]:my-2 [&_p]:leading-relaxed">
                  <Markdown components={markdownComponents}>{media.personalReview}</Markdown>
                </div>
              </div>
            ) : null}
            {media.tags.length ? (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {media.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/70"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col justify-between gap-1 px-4 py-3">
        <h3 className="font-display text-[20px] italic leading-tight text-foreground line-clamp-2">
          {media.title}
        </h3>
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {media.type}
          {media.year ? ` · ${media.year}` : ""}
        </p>
      </div>
    </motion.div>
  );
};
