"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LinkPreviewImage } from "@/components/previews/LinkPreview";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import type { TimelineCheckpoint, TimelineProject } from "@/lib/payload";

export interface WorkTimelineProps {
  checkpoints: TimelineCheckpoint[];
}

export function WorkTimeline({ checkpoints }: WorkTimelineProps) {
  return (
    <div className="relative max-w-5xl mx-auto">
      {checkpoints.map((c, i) => (
        <Checkpoint key={c.id} checkpoint={c} isLast={i === checkpoints.length - 1} />
      ))}
    </div>
  );
}

function Checkpoint({ checkpoint, isLast }: { checkpoint: TimelineCheckpoint; isLast: boolean }) {
  const { label, sub, current, variant, projects } = checkpoint;
  if (projects.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="relative grid grid-cols-[3.5rem_1fr] md:grid-cols-[9rem_1fr] gap-3 md:gap-8"
    >
      <div className="pt-5 text-right">
        <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
          {label}
        </div>
        <div
          className={`mt-1 text-sm md:text-base font-semibold tracking-tight ${
            current ? "text-foreground" : "text-foreground/70"
          }`}
        >
          {sub}
        </div>
      </div>

      <div className={`relative ${isLast ? "pb-0" : "pb-14 md:pb-20"}`}>
        {!isLast && (
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 top-7 bottom-0 w-px bg-linear-to-b from-foreground/40 via-border to-border/40"
          />
        )}

        <span
          aria-hidden
          className={`absolute top-6 -left-[4px] h-[9px] w-[9px] rounded-full ring-4 ${
            current ? "bg-foreground ring-foreground/10" : "bg-foreground/70 ring-background"
          }`}
        />
        {current && (
          <span
            aria-hidden
            className="pointer-events-none absolute top-6 -left-[4px] h-[9px] w-[9px] rounded-full bg-foreground/60 animate-ping"
          />
        )}

        <div className="pl-6 md:pl-10">
          {variant === "hero" && <HeroItem item={projects[0]} />}
          {variant === "single" && <SingleItem item={projects[0]} />}
          {variant === "stack" && <StackedItems items={projects} />}
          {variant === "grid" && <GridItems items={projects} />}
        </div>
      </div>
    </motion.div>
  );
}

function Thumbnail({ item, className = "h-16 w-16" }: { item: TimelineProject; className?: string }) {
  return (
    <div className={`relative shrink-0 overflow-hidden rounded-md border border-border ${className}`}>
      <LinkPreviewImage
        url={item.linkUrl}
        src={item.image || undefined}
        className="size-full object-cover"
      />
    </div>
  );
}

function ItemLink({ item, size = 16 }: { item: TimelineProject; size?: number }) {
  return (
    <Button
      variant="link"
      asChild
      className="p-0 h-auto font-semibold text-foreground hover:no-underline group justify-start"
    >
      <a href={item.linkUrl}>
        {item.linkText}
        <ArrowUpRight
          className="ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
          size={size}
        />
      </a>
    </Button>
  );
}

function HeroItem({ item }: { item: TimelineProject }) {
  return (
    <GlassCard hoverEffect={false} className="overflow-hidden p-0">
      <div className="grid md:grid-cols-5">
        <div className="md:col-span-3 relative aspect-video">
          <LinkPreviewImage url={item.linkUrl} src={item.image || undefined} className="size-full object-cover" />
        </div>
        <div className="md:col-span-2 p-6 md:p-8 flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{item.title}</h3>
          <p className="text-muted-foreground leading-relaxed mb-5">{item.description}</p>
          <ItemLink item={item} size={18} />
        </div>
      </div>
    </GlassCard>
  );
}

function SingleItem({ item }: { item: TimelineProject }) {
  return (
    <GlassCard hoverEffect className="p-5 md:p-6 flow-root">
      <Thumbnail item={item} className="float-left h-16 w-16 mr-4 md:mr-5 mb-2" />
      {item.badge && (
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
          {item.badge}
        </div>
      )}
      <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2">{item.title}</h3>
      <p className="text-muted-foreground leading-relaxed mb-4">{item.description}</p>
      <div className="clear-left">
        <ItemLink item={item} />
      </div>
    </GlassCard>
  );
}

function StackedItems({ items }: { items: TimelineProject[] }) {
  return (
    <GlassCard hoverEffect={false} className="p-0 overflow-hidden">
      {items.map((item, i) => (
        <div key={item.title} className={`p-5 md:p-6 flow-root ${i > 0 ? "border-t border-border" : ""}`}>
          <Thumbnail item={item} className="float-left h-16 w-16 mr-4 md:mr-5 mb-2" />
          {item.badge && (
            <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
              {item.badge}
            </div>
          )}
          <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-2">{item.title}</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">{item.description}</p>
          <div className="clear-left">
            <ItemLink item={item} />
          </div>
        </div>
      ))}
    </GlassCard>
  );
}

function GridItems({ items }: { items: TimelineProject[] }) {
  return (
    <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
      {items.map((item) => (
        <GlassCard key={item.title} hoverEffect className="p-4 flow-root">
          <Thumbnail item={item} className="float-left h-12 w-12 mr-3 mb-1.5" />
          <h3 className="text-base md:text-lg font-bold tracking-tight mb-1.5">{item.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.description}</p>
          <div className="clear-left">
            <ItemLink item={item} size={14} />
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
