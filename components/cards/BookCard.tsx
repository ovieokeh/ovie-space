"use client";
import { cardVariants } from "@/styling/variants";
import { BookItem } from "@/types";
import { motion } from "framer-motion";
import Image from "next/image";
import Markdown, { Components } from "react-markdown";

interface BookCardProps {
  book: BookItem;
}

const markdownComponents = {
  p: ({ ...props }) => <p {...props} className="text-slate-200 leading-relaxed text-sm my-2" />,
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      {...props}
      className="text-cyan-300 hover:text-cyan-600 transition-colors duration-200"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
} satisfies Components;

export const BookCard = ({ book }: BookCardProps) => {
  const statusColor = book.status === "Reading" ? "bg-yellow-400/10 text-yellow-300" : "bg-green-400/10 text-green-300";

  return (
    <motion.div
      variants={cardVariants}
      className="bg-slate-800/50 rounded-lg overflow-hidden border border-slate-700/50 flex flex-col"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <Image
        src={book.imageUrl}
        alt={`Cover of ${book.title}`}
        height={400}
        width={400}
        className="w-full h-60 object-cover"
        onError={(e) => {
          e.currentTarget.src = "https://placehold.co/400x600/0f172a/e0e0e0?text=Image+Error";
        }}
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-1">{book.title}</h3>
        <p className="text-slate-400 mb-4 text-sm">{book.author}</p>
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusColor}`}>{book.status}</span>
          {book.tags.map((tag) => (
            <span key={tag} className="text-xs font-medium px-2 py-1 rounded-full bg-slate-700 text-slate-300">
              {tag}
            </span>
          ))}
        </div>
        <Markdown components={markdownComponents}>{book.description}</Markdown>
      </div>
    </motion.div>
  );
};
