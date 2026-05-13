"use client";
import { motion } from "framer-motion";
import { ReactNode, useMemo } from "react";
import { AntennaMarker } from "@/components/media/AntennaMarker";

export interface TimelineItem {
  id: string;
  content: ReactNode;
  date: Date;
  className?: string;
}

export type TimelineVariant = "default" | "editorial";

interface VerticalTimelineProps {
  items: TimelineItem[];
  className?: string;
  variant?: TimelineVariant;
  sortDirection?: "desc" | "asc";
}

interface TimelineGroup {
  label: string;
  monthKey: string;
  items: TimelineItem[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const rowVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const dotVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

function formatMonthLabel(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function getMonthKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function VerticalTimeline({
  items,
  className = "",
  variant = "default",
  sortDirection = "desc",
}: VerticalTimelineProps) {
  const defaultItemClassName = "w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]";
  const isEditorial = variant === "editorial";

  // Group items by month
  const groupedItems = useMemo(() => {
    const sorted = [...items].sort((a, b) =>
      sortDirection === "asc" ? a.date.getTime() - b.date.getTime() : b.date.getTime() - a.date.getTime(),
    );
    const groups: TimelineGroup[] = [];
    const groupMap = new Map<string, TimelineGroup>();

    sorted.forEach((item) => {
      const monthKey = getMonthKey(item.date);

      if (groupMap.has(monthKey)) {
        groupMap.get(monthKey)!.items.push(item);
      } else {
        const group: TimelineGroup = {
          label: formatMonthLabel(item.date),
          monthKey,
          items: [item],
        };
        groupMap.set(monthKey, group);
        groups.push(group);
      }
    });

    return groups;
  }, [items, sortDirection]);

  return (
    <motion.div
      className={`relative ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Timeline line */}
      <div
        className={
          isEditorial
            ? "absolute left-5 md:left-7 top-0 bottom-0 w-px bg-gradient-to-b from-cinefill-amber/60 via-border/50 to-transparent"
            : "absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-border via-border/50 to-transparent"
        }
      />

      <div className={isEditorial ? "space-y-12" : "space-y-10"}>
        {groupedItems.map((group, groupIndex) => (
          <motion.div
            key={group.monthKey}
            variants={rowVariants}
            className={isEditorial ? "relative pl-14 md:pl-20" : "relative pl-12 md:pl-16"}
          >
            {isEditorial ? (
              <>
                {/* Cinefill antenna+cabinet marker — sits left of the vertical line with breathing room */}
                <motion.div
                  variants={dotVariants}
                  className="absolute left-[-8px] md:left-[-2px] top-0 h-7 w-6 text-foreground/70"
                >
                  <AntennaMarker className="h-full w-full" active={groupIndex === 0} />
                </motion.div>
                <div className="absolute left-7 md:left-9 top-4 w-6 md:w-9 h-px bg-border" />
                <div className="mb-5 flex items-baseline gap-3">
                  <h3 className="font-display text-3xl italic leading-none text-foreground sm:text-4xl">
                    {group.label}
                  </h3>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {group.items.length} {group.items.length === 1 ? "entry" : "entries"}
                  </span>
                </div>
              </>
            ) : (
              <>
                {/* Default dot marker */}
                <motion.div
                  variants={dotVariants}
                  className="absolute left-2 md:left-4 top-1 w-4 h-4 rounded-full bg-secondary border-2 border-border shadow-sm"
                >
                  <motion.div
                    className="absolute inset-1 rounded-full bg-foreground/20"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: groupIndex * 0.2,
                    }}
                  />
                </motion.div>
                <div className="absolute left-6 md:left-8 top-3 w-6 md:w-8 h-px bg-border" />
                <h3 className="text-lg font-semibold text-foreground mb-4">{group.label}</h3>
              </>
            )}

            <div className={isEditorial ? "flex flex-row flex-wrap gap-4 md:gap-5" : "flex flex-row flex-wrap gap-4"}>
              {group.items.map((item) => (
                <motion.div
                  key={item.id}
                  className={item.className ?? defaultItemClassName}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                >
                  {item.content}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
