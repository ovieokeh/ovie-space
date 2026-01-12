"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface LinkPreviewImageProps {
  /** The target page we want to preview */
  url: string;
  /** Extra classes for sizing / styling (eg. rounded-lg …) */
  className?: string;
  /** Fallback placeholder while loading / erroring */
  placeholderSrc?: string;
}

export function LinkPreviewImage({
  url,
  className = "",
  placeholderSrc = "https://placehold.co/800x600/0f172a/94a3b8?text=Loading…",
}: LinkPreviewImageProps) {
  const [data, setData] = useState<LinkPreviewData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/link-preview?url=${encodeURIComponent(url)}`);
        if (!res.ok) throw new Error(`status ${res.status}`);
        const json: LinkPreviewData = await res.json();
        if (!cancelled) setData(json);
      } catch (err) {
        console.error("LinkPreview fetch failed:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [url]);

  const imgSrc = data?.image || placeholderSrc;
  const altText = data?.title || "Website preview";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35 }}
      className={`relative w-full h-full ${className}`}
    >
      {/* Next.js will lazy‑load & optimize the remote image automatically if the domain is whitelisted in next.config.js */}
      <Image
        src={imgSrc}
        alt={altText}
        fill
        sizes="(max-width: 768px) 100vw, 800px"
        className="object-cover shadow-2xl rounded-lg"
        placeholder={loading ? "blur" : undefined}
        blurDataURL={placeholderSrc}
        priority={false}
      />
    </motion.div>
  );
}

//---------------------------------------------
// 2) <LinkPreviewCard> — drop‑in replacement for your snippet
//---------------------------------------------
// Pass the same homepageContent data you already have.  The image column is now
// driven by <LinkPreviewImage>.
//---------------------------------------------

import { ArrowUpRight } from "lucide-react";
import { LinkPreviewData } from "@/types";
import { cardVariants } from "@/styling/variants";

type Featured = {
  tag: string;
  title: string;
  description: string;
  linkUrl: string;
  linkText: string;
};

interface LinkPreviewCardProps {
  featured: Featured;
}

export function LinkPreviewCard({ featured }: LinkPreviewCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden max-w-6xl mx-auto grid md:grid-cols-5 gap-8 items-center p-8 backdrop-blur-sm"
    >
      <div className="md:col-span-3 relative aspect-video">
        <LinkPreviewImage url={featured.linkUrl} className="w-full h-full" />
      </div>

      <div className="md:col-span-2">
        <p className="text-cyan-400 font-semibold mb-2">{featured.tag}</p>
        <h3 className="text-3xl font-bold text-white mb-4">{featured.title}</h3>
        <p className="text-slate-400 mb-6">{featured.description}</p>
        <a href={featured.linkUrl} className="text-cyan-400 font-semibold inline-flex items-center gap-2 group">
          {featured.linkText}
          <ArrowUpRight
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            size={20}
          />
        </a>
      </div>
    </motion.div>
  );
}
