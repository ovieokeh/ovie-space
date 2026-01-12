"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import { globalContent } from "@/content/global";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="glass-panel border-b-0 border-x-0 border-t-0 bg-background/70 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Brand */}
          <Link href="/" className="text-xl font-semibold tracking-tight hover:opacity-80 transition-opacity">
            {globalContent.nav.name}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {globalContent.nav.links.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200",
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pl-2 border-l border-border ml-2">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-foreground focus:outline-none">
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-border overflow-hidden"
          >
            <nav className="flex flex-col items-center gap-6 py-8">
              {globalContent.nav.links.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn("text-sm font-medium", isActive ? "text-foreground" : "text-muted-foreground")}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
