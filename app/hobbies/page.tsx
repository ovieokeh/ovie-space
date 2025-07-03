"use client";
import React from "react";
import { motion } from "framer-motion";
import { hobbiesData } from "@/content/hobbies";
import { VideoCard } from "@/components/cards/VideoCard";
import { sectionVariants } from "@/styling/variants";

export default function HobbiesPage() {
  return (
    <div className="bg-slate-900 text-slate-300 font-sans antialiased">
      <main>
        <section className="container mx-auto px-6 pt-24 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tighter">
              {hobbiesData.header.title}
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">{hobbiesData.header.description}</p>
          </motion.div>
        </section>

        <motion.section
          id="hobbies-feed"
          className="container mx-auto px-6 pb-20 md:pb-28"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {hobbiesData.videos.map((video) => (
              <VideoCard key={video.title} video={video} />
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
