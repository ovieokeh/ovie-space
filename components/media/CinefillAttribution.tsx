"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function CinefillAttribution() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className="mt-24 border-t border-border pt-12"
    >
      <div className="flex flex-col items-center gap-5 text-center">
        <span className="text-[10px] font-semibold uppercase tracking-[0.32em] text-muted-foreground">
          Powered by
        </span>

        <a
          href="https://github.com/ovieokeh/cinefill"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center transition hover:opacity-90"
          aria-label="Cinefill on GitHub"
        >
          <Image
            src="/images/cinefill/hybridmark.png"
            alt="cinefill"
            width={210}
            height={70}
            className="h-14 w-auto dark:hidden"
          />
          <Image
            src="/images/cinefill/hybridmark-light.png"
            alt="cinefill"
            width={210}
            height={70}
            className="hidden h-14 w-auto dark:block"
          />
        </a>

        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
          An offline-first watch diary. Ratings, reviews, watchlists, and episode standouts that
          live on your phone first, then sync to the web.
        </p>

        <a
          href="https://github.com/ovieokeh/cinefill"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-foreground transition"
        >
          <span className="border-b border-cinefill-amber/0 pb-0.5 transition group-hover:border-cinefill-amber">
            View on GitHub
          </span>
          <ArrowUpRight
            size={13}
            strokeWidth={2.5}
            className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-cinefill-amber"
          />
        </a>
      </div>
    </motion.section>
  );
}
