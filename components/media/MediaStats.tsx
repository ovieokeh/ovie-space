"use client";
import { motion } from "framer-motion";

interface MediaStatsProps {
  watchedCount: number;
  watchlistCount: number;
  movieCount: number;
  showCount: number;
  averageRating: number | null;
}

interface Stat {
  label: string;
  value: string;
  accent?: boolean;
}

export function MediaStats({
  watchedCount,
  watchlistCount,
  movieCount,
  showCount,
  averageRating,
}: MediaStatsProps) {
  const stats: Stat[] = [
    { label: "Watched", value: String(watchedCount), accent: true },
    { label: "Watchlist", value: String(watchlistCount) },
    { label: "Movies", value: String(movieCount) },
    { label: "Shows", value: String(showCount) },
    {
      label: "Avg rating",
      value: averageRating === null ? "—" : averageRating.toFixed(2),
    },
  ];

  return (
    <motion.dl
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
      className="mb-12 grid grid-cols-2 divide-x divide-y divide-border border border-border bg-secondary/30 sm:grid-cols-5 sm:divide-y-0"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1 px-4 py-4 sm:px-5 sm:py-5">
          <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {stat.label}
          </dt>
          <dd
            className={`font-mono text-2xl tabular-nums sm:text-3xl ${
              stat.accent ? "text-cinefill-amber" : "text-foreground"
            }`}
          >
            {stat.value}
          </dd>
        </div>
      ))}
    </motion.dl>
  );
}
