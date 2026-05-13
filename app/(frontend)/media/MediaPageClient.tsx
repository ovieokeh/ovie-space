"use client";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { MediaCard } from "@/components/cards/MediaCard";
import { VerticalTimeline } from "@/components/layout/VerticalTimeline";
import { MediaHero } from "@/components/media/MediaHero";
import { MediaStats } from "@/components/media/MediaStats";
import { CurrentlyObsessed } from "@/components/media/CurrentlyObsessed";
import { MediaFilterBar, MediaFilter, MediaSort } from "@/components/media/MediaFilterBar";
import { CinefillAttribution } from "@/components/media/CinefillAttribution";
import { MediaItem } from "@/types";

interface MediaPageClientProps {
  media: MediaItem[];
}

function getDateKey(item: MediaItem): number {
  return new Date(item.publishedAt ?? item.createdAt).getTime();
}

export function MediaPageClient({ media }: MediaPageClientProps) {
  const [filter, setFilter] = useState<MediaFilter>("all");
  const [sort, setSort] = useState<MediaSort>("recent");

  const movieCount = useMemo(() => media.filter((m) => m.type === "Movie").length, [media]);
  const showCount = useMemo(() => media.filter((m) => m.type === "Show").length, [media]);
  const watchedCount = useMemo(() => media.filter((m) => m.status === "Watched").length, [media]);
  const watchlistCount = useMemo(
    () => media.filter((m) => m.status === "Want to Watch").length,
    [media],
  );
  const averageRating = useMemo(() => {
    const rated = media.filter((m) => typeof m.rating === "number" && m.rating !== null);
    if (rated.length === 0) return null;
    const sum = rated.reduce((acc, item) => acc + (item.rating ?? 0), 0);
    return sum / rated.length;
  }, [media]);

  const filtered = useMemo(() => {
    return media.filter((item) => {
      switch (filter) {
        case "watched":
          return item.status === "Watched";
        case "watchlist":
          return item.status === "Want to Watch";
        case "movies":
          return item.type === "Movie";
        case "shows":
          return item.type === "Show";
        case "all":
        default:
          return true;
      }
    });
  }, [media, filter]);

  const sortedForGrid = useMemo(() => {
    if (sort !== "highest") return filtered;
    return [...filtered].sort((a, b) => {
      const ar = a.rating ?? -1;
      const br = b.rating ?? -1;
      if (br !== ar) return br - ar;
      return getDateKey(b) - getDateKey(a);
    });
  }, [filtered, sort]);

  const timelineItems = useMemo(
    () =>
      filtered.map((item) => ({
        id: item.id,
        date: new Date(item.publishedAt ?? item.createdAt),
        content: <MediaCard media={item} />,
        className:
          item.status === "Want to Watch"
            ? "w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
            : "w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]",
      })),
    [filtered],
  );

  return (
    <div className="grain bg-background text-foreground font-sans antialiased min-h-screen">
      <main className="relative z-[2] pt-24 pb-20 sm:pt-32">
        <div className="container mx-auto max-w-6xl px-6">
          <MediaHero watchedCount={watchedCount} />

          <MediaStats
            watchedCount={watchedCount}
            watchlistCount={watchlistCount}
            movieCount={movieCount}
            showCount={showCount}
            averageRating={averageRating}
          />

          <CurrentlyObsessed items={media} />

          <MediaFilterBar
            filter={filter}
            onFilterChange={setFilter}
            sort={sort}
            onSortChange={setSort}
            total={filtered.length}
          />

          {/* Empty state */}
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl border border-dashed border-border bg-secondary/40 px-6 py-16 text-center"
            >
              <p className="font-display text-2xl italic text-foreground">Nothing in this lane.</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try a different filter or clear it to see the full log.
              </p>
            </motion.div>
          ) : sort === "highest" ? (
            // Ranked flat grid — no month grouping when sorting by rating
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
              }}
              className="flex flex-row flex-wrap gap-4 md:gap-5"
            >
              {sortedForGrid.map((item) => (
                <div
                  key={item.id}
                  className={
                    item.status === "Want to Watch"
                      ? "w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]"
                      : "w-full sm:w-[calc(50%-0.625rem)] lg:w-[calc(33.333%-0.834rem)]"
                  }
                >
                  <MediaCard media={item} />
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.section id="media-library">
              <VerticalTimeline
                items={timelineItems}
                variant="editorial"
                sortDirection={sort === "oldest" ? "asc" : "desc"}
              />
            </motion.section>
          )}

          <CinefillAttribution />
        </div>
      </main>
    </div>
  );
}
