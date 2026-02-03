"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { PageLayout } from "@/components/layout/PageLayout";
import { cardVariants, sectionVariants } from "@/styling/variants";
import { PostItem } from "@/types";

interface BlogPageClientProps {
  posts: PostItem[];
  header: {
    title: string;
    description: string;
  };
}

function formatDate(dateString: string | null): string {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BlogPageClient({ posts, header }: BlogPageClientProps) {
  return (
    <PageLayout title={header.title} description={header.description} maxWidth="default">
      <motion.section variants={sectionVariants} initial="hidden" animate="visible">
        {posts.length === 0 ? (
          <GlassCard className="text-center py-16">
            <p className="text-muted-foreground text-lg">No posts yet. Check back soon!</p>
          </GlassCard>
        ) : (
          <div className="grid gap-6">
            {posts.map((post, i) => (
              <motion.div
                key={post.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: i * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <GlassCard hoverEffect className="p-6 group cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-foreground/80 transition-colors">
                          {post.title}
                        </h2>
                        {post.excerpt && <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar size={14} />
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                      <ArrowUpRight
                        className="text-muted-foreground group-hover:text-foreground transition-all group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0 mt-1"
                        size={20}
                      />
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>
    </PageLayout>
  );
}
