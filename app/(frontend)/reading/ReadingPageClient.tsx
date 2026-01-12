"use client";
import { motion } from "framer-motion";
import { BookCard } from "@/components/cards/BookCard";
import { sectionVariants } from "@/styling/variants";

interface Book {
  title: string;
  author: string;
  status: string;
  tags: string[];
  description: string;
  imageUrl: string;
}

interface ReadingPageClientProps {
  books: Book[];
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
  return (
    <div className="bg-background text-foreground font-sans antialiased min-h-screen">
      <main className="sm:pt-32">
        {/* --- Page Header --- */}
        <section className="container mx-auto px-6 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tighter">
              {header.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{header.description}</p>
          </motion.div>
        </section>

        {/* --- Book Grid --- */}
        <motion.section
          id="library"
          className="container mx-auto px-6 pb-20 md:pb-28"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <BookCard key={book.title} book={book} />
            ))}
          </div>
        </motion.section>

        {/* --- Publications Section --- */}
        <section id="publications" className="py-20">
          <div className="container mx-auto px-6 max-w-4xl">
            <motion.div
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
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
