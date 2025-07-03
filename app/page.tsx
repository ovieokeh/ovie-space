"use client";
import React from "react";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { homepageContent } from "@/content/homepage";
import { MultilineText } from "@/components/core/MultilineText";
import { cardVariants, sectionVariants } from "@/styling/variants";
import { LinkPreviewImage } from "@/components/previews/LinkPreview";

interface SocialLinkProps {
  href: string;
  icon: React.ComponentType<{ size?: number }>;
}
const SocialLink = ({ href, icon: Icon }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-slate-400 hover:text-cyan-400 transition-colors duration-300"
  >
    <Icon size={24} />
  </a>
);

export default function App() {
  return (
    <div className="bg-slate-900 text-slate-300 font-sans antialiased">
      <main className="pt-24 sm:pt-32">
        {/* --- Hero Section --- */}
        <section
          id={homepageContent.hero.id}
          className="container mx-auto px-6 py-20 md:py-32 text-center overflow-hidden"
        >
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-cyan-400 font-medium mb-4">{homepageContent.hero.subheading}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tighter">
              {homepageContent.hero.heading}
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              {homepageContent.hero.description}
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="#work"
                className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-3 px-8 rounded-lg transition-transform duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                {homepageContent.hero.buttons.primary}
              </a>
              <a
                href="#connect"
                className="bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 flex items-center gap-2"
              >
                {homepageContent.hero.buttons.secondary}
              </a>
            </div>
          </motion.div>
        </section>

        {/* --- Work Section --- */}
        <motion.section
          id={homepageContent.work.id}
          className="bg-slate-900/70 py-20 md:py-28"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="container mx-auto px-6 space-y-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{homepageContent.work.title}</h2>
              <p className="text-lg text-slate-400 max-w-3xl mx-auto">
                <MultilineText text={homepageContent.work.description} />
              </p>
            </div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-slate-800/50 border border-slate-700/50 rounded-xl overflow-hidden max-w-6xl mx-auto grid md:grid-cols-5 gap-8 items-center p-8 backdrop-blur-sm"
            >
              <div className="md:col-span-3">
                <div className="relative aspect-video">
                  <LinkPreviewImage
                    url={homepageContent.work.featured.linkUrl}
                    className="w-full h-full rounded-lg object-cover shadow-2xl"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-cyan-400 font-semibold mb-2">{homepageContent.work.featured.tag}</p>
                <h3 className="text-3xl font-bold text-white mb-4">{homepageContent.work.featured.title}</h3>
                <p className="text-slate-400 mb-6">{homepageContent.work.featured.description}</p>
                <a
                  href={homepageContent.work.featured.linkUrl}
                  className="text-cyan-400 font-semibold inline-flex items-center gap-2 group"
                >
                  {homepageContent.work.featured.linkText}
                  <ArrowUpRight
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    size={20}
                  />
                </a>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
              {homepageContent.work.others.map((project, i) => (
                <motion.div
                  key={project.title}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-slate-800/50 p-8 rounded-xl border border-slate-700/50 backdrop-blur-sm"
                >
                  <div className="relative aspect-video mb-6">
                    <LinkPreviewImage
                      url={project.linkUrl}
                      className="rounded-lg object-cover w-full h-full shadow-2xl"
                    />
                  </div>
                  {/* <img src={project.image} alt={project.title} className="rounded-md mb-6 w-full" /> */}
                  <h4 className="text-2xl font-bold text-white mb-2">{project.title}</h4>
                  <p className="text-slate-400 mb-4">
                    <MultilineText text={project.description} />
                  </p>
                  <a
                    href={project.linkUrl}
                    className="text-cyan-400 font-semibold inline-flex items-center gap-2 group"
                  >
                    {project.linkText}
                    <ArrowUpRight
                      className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      size={20}
                    />
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* --- Interests Section --- */}
        <motion.section
          id={homepageContent.interests.id}
          className="container mx-auto px-6 py-20 md:py-28"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{homepageContent.interests.title}</h2>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto">{homepageContent.interests.description}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {homepageContent.interests.items.map((item, i) => (
              <motion.div
                key={item.title}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.15 }}
                className="bg-slate-800/50 p-6 rounded-lg border border-slate-700/50 backdrop-blur-sm flex flex-col"
              >
                <div className="flex items-center gap-4 mb-3">
                  <item.icon className="text-cyan-400" size={28} />
                  <h3 className="text-xl font-semibold text-slate-100">{item.title}</h3>
                </div>
                <p className="text-slate-400 leading-relaxed">
                  <MultilineText text={item.text} />
                </p>

                <a href={item.linkUrl} className="text-cyan-400 font-semibold inline-flex items-center gap-2 mt-auto">
                  {item.linkText}
                  <ArrowUpRight
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    size={20}
                  />
                </a>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* --- Connect Section --- */}
        <motion.section
          id={homepageContent.connect.id}
          className="container mx-auto px-6 py-20 md:py-32"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{homepageContent.connect.title}</h2>
            <p className="text-lg text-slate-400 mb-8">{homepageContent.connect.description}</p>
            <a
              href={homepageContent.connect.buttonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-900 font-bold py-4 px-10 rounded-lg transition-transform duration-300 transform hover:scale-105 inline-block text-lg"
            >
              {homepageContent.connect.button}
            </a>
            <div className="mt-12 flex justify-center gap-8">
              {homepageContent.connect.socials.map((social, i) => (
                <SocialLink key={i} href={social.href} icon={social.icon} />
              ))}
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}
