"use client";

import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowLeft, Menu, X } from "lucide-react";

import { globalContent } from "@/content/global";
import { readingData } from "@/content/reading";
import Link from "next/link";

//------------------------------------------------------------
// Types
//------------------------------------------------------------
interface NavLink {
  name: string;
  href: string;
}

interface NavConfig {
  /** Brand / site name */
  name: string;
  /** Top‑level nav links */
  links: NavLink[];
  /** The primary action in the top‑right */
  action: {
    href: string;
    label: string;
    icon: React.FunctionComponent<{ size?: number }>;
  } | null;
}

//------------------------------------------------------------
// Helper — pick the right nav for the current pathname
//------------------------------------------------------------
function getNavConfig(pathname: string): NavConfig {
  // 1) Reading sub‑app
  if (pathname.startsWith("/reading")) {
    return {
      name: readingData.nav.name,
      links: readingData.nav.links,
      action: {
        href: "/",
        label: "Back to Home",
        icon: ArrowLeft,
      },
    };
  }

  // 2) Fallback to the global site nav
  return {
    name: globalContent.nav.name,
    links: globalContent.nav.links,
    action: {
      href: "/#connect",
      label: "Contact",
      icon: Mail,
    },
  };
}

//------------------------------------------------------------
// Component
//------------------------------------------------------------
export function Header() {
  const pathname = usePathname(); // Next.js 14 hook
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const nav = useMemo(() => getNavConfig(pathname), [pathname]);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-slate-900 backdrop-blur-lg border-b border-slate-800">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold text-white tracking-tighter">
          {nav.name}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.links.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`${
                  isActive ? "text-cyan-300" : "text-slate-200"
                } hover:text-cyan-400 transition-colors duration-300`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action Button */}
        {nav.action && (
          <div className="hidden md:block">
            <Link
              href={nav.action.href}
              className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300 flex items-center gap-2"
            >
              {nav.action.label} {<nav.action.icon size={16} />}
            </Link>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white z-10 relative">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900 overflow-hidden"
          >
            <nav className="flex flex-col items-center gap-6 py-8">
              {nav.links.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`${isActive ? "text-cyan-400" : "text-slate-300"} hover:text-cyan-400 text-lg`}
                  >
                    {link.name}
                  </Link>
                );
              })}
              {nav.action && (
                <Link
                  href={nav.action.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2"
                >
                  {nav.action.label} {<nav.action.icon size={16} />}
                </Link>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
