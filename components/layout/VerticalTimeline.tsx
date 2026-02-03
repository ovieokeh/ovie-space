"use client";
import { motion } from "framer-motion";
import { ReactNode, useMemo } from "react";

export interface TimelineItem {
  id: string;
  content: ReactNode;
  date: Date;
}

interface VerticalTimelineProps {
  items: TimelineItem[];
  className?: string;
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

export function VerticalTimeline({ items, className = "" }: VerticalTimelineProps) {
  // Group items by month, sorted by date descending (newest first)
  const groupedItems = useMemo(() => {
    const sorted = [...items].sort((a, b) => b.date.getTime() - a.date.getTime());
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
  }, [items]);

  return (
    <motion.div
      className={`relative ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Timeline line */}
      <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-border via-border/50 to-transparent" />

      <div className="space-y-10">
        {groupedItems.map((group, groupIndex) => (
          <motion.div
            key={group.monthKey}
            variants={rowVariants}
            className="relative pl-12 md:pl-16"
          >
            {/* Timeline dot */}
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

            {/* Connector line from dot to content */}
            <div className="absolute left-6 md:left-8 top-3 w-6 md:w-8 h-px bg-border" />

            {/* Month label */}
            <h3 className="text-lg font-semibold text-foreground mb-4">{group.label}</h3>

            {/* Content - flex row wrap for items in same month */}
            <div className="flex flex-row flex-wrap gap-4">
              {group.items.map((item) => (
                <motion.div
                  key={item.id}
                  className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.75rem)]"
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
