"use client";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export type MediaFilter = "all" | "watched" | "watchlist" | "movies" | "shows";
export type MediaSort = "recent" | "highest" | "oldest";

interface MediaFilterBarProps {
  filter: MediaFilter;
  onFilterChange: (value: MediaFilter) => void;
  sort: MediaSort;
  onSortChange: (value: MediaSort) => void;
  total: number;
}

const FILTER_OPTIONS: { value: MediaFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "watched", label: "Watched" },
  { value: "watchlist", label: "Watchlist" },
  { value: "movies", label: "Movies" },
  { value: "shows", label: "Shows" },
];

const SORT_LABELS: Record<MediaSort, string> = {
  recent: "Recent",
  highest: "Highest rated",
  oldest: "Oldest",
};

export function MediaFilterBar({
  filter,
  onFilterChange,
  sort,
  onSortChange,
  total,
}: MediaFilterBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div
        role="tablist"
        aria-label="Filter media"
        className="flex flex-wrap gap-2"
      >
        {FILTER_OPTIONS.map((option) => {
          const active = filter === option.value;
          return (
            <button
              key={option.value}
              role="tab"
              aria-selected={active}
              type="button"
              onClick={() => onFilterChange(option.value)}
              className={`relative inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] transition ${
                active
                  ? "border-cinefill-amber bg-cinefill-amber text-cinefill-ink shadow-sm"
                  : "border-border bg-background text-muted-foreground hover:border-cinefill-amber/60 hover:text-foreground"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] tabular-nums uppercase tracking-[0.2em] text-muted-foreground">
          {total} {total === 1 ? "item" : "items"}
        </span>
        <label className="relative inline-flex items-center gap-2">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Sort
          </span>
          <span className="relative">
            <select
              value={sort}
              onChange={(event) => onSortChange(event.target.value as MediaSort)}
              className="appearance-none rounded-full border border-border bg-background py-1.5 pl-3 pr-8 text-xs font-semibold uppercase tracking-[0.16em] text-foreground transition hover:border-cinefill-amber/60 focus:border-cinefill-amber focus:outline-none"
            >
              {(Object.keys(SORT_LABELS) as MediaSort[]).map((value) => (
                <option key={value} value={value}>
                  {SORT_LABELS[value]}
                </option>
              ))}
            </select>
            <ChevronDown
              size={12}
              strokeWidth={2.5}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
          </span>
        </label>
      </div>
    </motion.div>
  );
}
