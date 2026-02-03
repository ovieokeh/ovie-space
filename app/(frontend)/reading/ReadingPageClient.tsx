"use client";
import { motion } from "framer-motion";
import { BookCard } from "@/components/cards/BookCard";
import { PageLayout } from "@/components/layout/PageLayout";
import { VerticalTimeline } from "@/components/layout/VerticalTimeline";
import { sectionVariants } from "@/styling/variants";
import { BookItem } from "@/types";

interface ReadingPageClientProps {
  books: BookItem[];
  header: {
    title: string;
    description: string;
  };
  publications: {
    title: string;
    description: string;
    items: { name: string; href: string }[];
  };
}

export function ReadingPageClient({ books, header, publications }: ReadingPageClientProps) {
  const timelineItems = books.map((book) => ({
    id: book.title,
    date: new Date(book.publishedAt ?? book.createdAt),
    content: <BookCard book={book} />,
  }));

  return (
    <PageLayout title={header.title} description={header.description} maxWidth="wide">
      {/* Book Timeline */}
      <motion.section id="library" className="mb-16" variants={sectionVariants} initial="hidden" animate="visible">
        <VerticalTimeline items={timelineItems} />
      </motion.section>

      {/* Publications Section */}
      <motion.section
        id="publications"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="text-3xl font-bold text-foreground mb-2">{publications.title}</h2>
        <p className="text-muted-foreground mb-8">{publications.description}</p>
        <div className="space-y-4">
          {publications.items.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className="flex items-center justify-between p-4 bg-secondary border border-border rounded-lg hover:bg-secondary/80 transition-colors duration-300"
            >
              <span className="text-lg text-foreground">
                {i + 1}. {item.name}
              </span>
              <span className="text-foreground/80 text-sm">Read Article &rarr;</span>
            </a>
          ))}
        </div>
      </motion.section>
    </PageLayout>
  );
}
