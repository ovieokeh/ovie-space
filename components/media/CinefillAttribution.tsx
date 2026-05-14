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
          An offline-first watch diary. Ratings, reviews, watchlists, and episode standouts live on
          your phone first; only items marked public flow through to this page.
        </p>

        <div className="mt-2 flex max-w-xl flex-col items-center gap-3 text-xs leading-relaxed text-muted-foreground/75">
          <Image
            src="/images/tmdb-blue-short.svg"
            alt="The Movie Database (TMDB)"
            width={137}
            height={18}
            className="h-4 w-auto"
          />
          <p>
            This page uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise
            approved by TMDB.
          </p>
        </div>

        <a
          href="https://cinefill.ovie.dev"
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-foreground transition"
        >
          <span className="border-b border-cinefill-amber/0 pb-0.5 transition group-hover:border-cinefill-amber">
            cinefill.ovie.dev
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
