"use client";
import React from "react";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { homepageContent } from "@/content/homepage";
import { MultilineText } from "@/components/core/MultilineText";
import { cardVariants, sectionVariants } from "@/styling/variants";
import { LinkPreviewImage } from "@/components/previews/LinkPreview";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

interface SocialLinkProps {
  href: string;
  icon: React.ComponentType<{ size?: number }>;
}
const SocialLink = ({ href, icon: Icon }: SocialLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-muted-foreground hover:text-foreground transition-colors duration-300"
  >
    <Icon size={24} />
  </a>
);

export default function App() {
  return (
    <div className="bg-background text-foreground font-sans antialiased min-h-screen">
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
            <p className="text-foreground font-medium mb-4 opacity-80">{homepageContent.hero.subheading}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 leading-tight tracking-tighter">
              {homepageContent.hero.heading}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              {homepageContent.hero.description}
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="rounded-full px-8 text-base">
                <a href="#work">{homepageContent.hero.buttons.primary}</a>
              </Button>
              <Button asChild variant="secondary" size="lg" className="rounded-full px-8 text-base">
                <a href="#connect">{homepageContent.hero.buttons.secondary}</a>
              </Button>
            </div>
          </motion.div>
        </section>

        {/* --- Work Section --- */}
        <motion.section
          id={homepageContent.work.id}
          className="py-20 md:py-28"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="container mx-auto px-6 space-y-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
                {homepageContent.work.title}
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                <MultilineText text={homepageContent.work.description} />
              </p>
            </div>

            <GlassCard hoverEffect={false} className="max-w-6xl mx-auto grid md:grid-cols-5 gap-8 items-center p-8">
              <div className="md:col-span-3">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <LinkPreviewImage
                    url={homepageContent.work.featured.linkUrl}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <p className="text-foreground/80 font-medium mb-2 text-sm uppercase tracking-wide">
                  {homepageContent.work.featured.tag}
                </p>
                <h3 className="text-3xl font-bold text-foreground mb-4">{homepageContent.work.featured.title}</h3>
                <p className="text-muted-foreground mb-6">{homepageContent.work.featured.description}</p>
                <Button
                  variant="link"
                  asChild
                  className="p-0 h-auto text-foreground font-semibold hover:no-underline group"
                >
                  <a href={homepageContent.work.featured.linkUrl}>
                    {homepageContent.work.featured.linkText}
                    <ArrowUpRight
                      className="ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                      size={18}
                    />
                  </a>
                </Button>
              </div>
            </GlassCard>

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-12">
              {homepageContent.work.others.map((project, i) => (
                <motion.div
                  key={project.title}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: i * 0.15 }}
                >
                  <GlassCard hoverEffect className="h-full p-8 flex flex-col">
                    <div className="relative aspect-video mb-6 rounded-lg overflow-hidden border border-border">
                      <LinkPreviewImage url={project.linkUrl} className="object-cover w-full h-full" />
                    </div>
                    <h4 className="text-2xl font-bold text-foreground mb-2">{project.title}</h4>
                    <p className="text-muted-foreground mb-4 flex-grow">
                      <MultilineText text={project.description} />
                    </p>
                    <Button
                      variant="link"
                      asChild
                      className="p-0 h-auto text-foreground font-semibold hover:no-underline group justify-start"
                    >
                      <a href={project.linkUrl}>
                        {project.linkText}
                        <ArrowUpRight
                          className="ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                          size={18}
                        />
                      </a>
                    </Button>
                  </GlassCard>
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              {homepageContent.interests.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{homepageContent.interests.description}</p>
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
              >
                <GlassCard hoverEffect className="p-6 h-full flex flex-col">
                  <div className="flex items-center gap-4 mb-3">
                    <item.icon className="text-foreground" size={28} />
                    <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed flex-grow">
                    <MultilineText text={item.text} />
                  </p>

                  <Button
                    variant="link"
                    asChild
                    className="mt-4 p-0 h-auto text-foreground font-semibold hover:no-underline group justify-start"
                  >
                    <a href={item.linkUrl}>
                      {item.linkText}
                      <ArrowUpRight
                        className="ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        size={18}
                      />
                    </a>
                  </Button>
                </GlassCard>
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              {homepageContent.connect.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">{homepageContent.connect.description}</p>
            <Button asChild size="lg" className="rounded-full px-10 py-6 text-lg">
              <a href={homepageContent.connect.buttonUrl} target="_blank" rel="noopener noreferrer">
                {homepageContent.connect.button}
              </a>
            </Button>
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
