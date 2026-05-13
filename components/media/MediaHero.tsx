"use client";
import { motion } from "framer-motion";
import { Tv } from "lucide-react";

interface MediaHeroProps {
  watchedCount: number;
}

export function MediaHero({ watchedCount }: MediaHeroProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative mb-14"
    >
      <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground backdrop-blur-sm">
        <Tv size={12} strokeWidth={2} className="text-cinefill-amber" />
        Cinefill log
        <span className="ml-1 inline-flex items-center gap-1 text-cinefill-amber">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cinefill-amber" />
          {watchedCount} watched
        </span>
      </div>

      <h1 className="font-display text-[clamp(3rem,9vw,7rem)] leading-[0.95] tracking-tight text-foreground">
        <span className="italic">On stor</span>
        <span data-i className="italic">i</span>
        <span className="italic">es</span>
        <span className="text-cinefill-amber">.</span>
      </h1>

      <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
        A living log of films and shows that have rewired me — synced from{" "}
        <a
          href="https://github.com/ovieokeh/cinefill"
          target="_blank"
          rel="noreferrer"
          className="font-medium text-foreground underline decoration-cinefill-amber decoration-2 underline-offset-4 transition hover:text-cinefill-amber"
        >
          cinefill
        </a>
        , my offline-first watch diary. Ratings, half-formed notes, watchlist whims — the way they
        actually land.
      </p>
    </motion.header>
  );
}
