"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  maxWidth?: "default" | "narrow" | "wide";
}

export function PageLayout({ children, title, description, maxWidth = "default" }: PageLayoutProps) {
  const maxWidthClass = {
    narrow: "max-w-3xl",
    default: "max-w-5xl",
    wide: "max-w-6xl",
  }[maxWidth];

  return (
    <div className="bg-background text-foreground font-sans antialiased min-h-screen">
      <main className="pt-24 sm:pt-32 pb-20">
        <div className={`container mx-auto px-6 ${maxWidthClass}`}>
          {/* Page Header */}
          <motion.header
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              {title}
            </h1>
            {description && (
              <p className="text-lg text-muted-foreground">{description}</p>
            )}
          </motion.header>

          {/* Page Content */}
          {children}
        </div>
      </main>
    </div>
  );
}
