"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { RichText } from "@/components/core/RichText";
import { GlassCard } from "@/components/ui/GlassCard";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: SerializedEditorState | null;
  publishedAt: string | null;
  lastUpdatedAt: string | null;
  coverImage: unknown;
}

interface PostPageClientProps {
  post: Post;
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function estimateReadingTime(content: SerializedEditorState | null): number {
  if (!content || !content.root || !content.root.children) return 1;

  // Rough estimation: count text nodes and estimate words
  const countText = (node: unknown): number => {
    if (!node || typeof node !== "object") return 0;
    const n = node as { text?: string; children?: unknown[] };
    if (n.text) return n.text.split(/\s+/).length;
    if (n.children) return n.children.reduce<number>((acc, child) => acc + countText(child), 0);
    return 0;
  };

  const wordCount = content.root.children.reduce<number>((acc, child) => acc + countText(child), 0);
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function PostPageClient({ post }: PostPageClientProps) {
  const readingTime = estimateReadingTime(post.content);

  return (
    <div className="bg-background text-foreground font-sans antialiased min-h-screen">
      <main className="pt-24 sm:pt-32 pb-20">
        <article className="container mx-auto px-6 max-w-3xl">
          {/* Back Link */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Header */}
          <motion.header
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {post.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock size={14} />
                <span>{readingTime} min read</span>
              </div>
              {post.lastUpdatedAt && post.lastUpdatedAt !== post.publishedAt && (
                <span className="text-muted-foreground/70">· Updated {formatDate(post.lastUpdatedAt)}</span>
              )}
            </div>
          </motion.header>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="p-8 md:p-12">
              <RichText content={post.content} />
            </GlassCard>
          </motion.div>
        </article>
      </main>
    </div>
  );
}
