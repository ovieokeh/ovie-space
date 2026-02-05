"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
import { aboutContent } from "@/content/about";
import { sectionVariants } from "@/styling/variants";

export function AboutPageClient() {
  const { intro, currentFocus, experience, writing, skills, interests, contact } = aboutContent;

  return (
    <div className="bg-background text-foreground font-sans antialiased min-h-screen">
      <main className="pt-24 sm:pt-32 pb-20">
        <article className="container mx-auto px-6 max-w-3xl">
          {/* Header */}
          <motion.header
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
              {aboutContent.header.title}
            </h1>
            <p className="text-xl text-muted-foreground">{aboutContent.header.subtitle}</p>
          </motion.header>

          {/* Intro */}
          <motion.section
            className="mb-12 prose prose-lg dark:prose-invert max-w-none"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
          >
            {intro.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-foreground/90 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </motion.section>

          {/* Current Focus */}
          <motion.section
            className="mb-12"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">{currentFocus.title}</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {currentFocus.content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-foreground/90 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.section>

          {/* Experience */}
          <motion.section
            className="mb-12"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">{experience.title}</h2>
            <div className="space-y-6">
              {experience.roles.map((role, i) => (
                <div key={i} className="border-l-2 border-border pl-6 py-2">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-foreground">{role.company}</h3>
                    <a
                      href={role.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {role.role} · {role.period}
                  </p>
                  <p className="text-foreground/90">{role.description}</p>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Writing */}
          <motion.section
            className="mb-12"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">{writing.title}</h2>
            <p className="text-foreground/90 mb-4">{writing.content}</p>
            <div className="flex flex-wrap gap-3">
              {writing.publications.map((pub, i) => (
                <a
                  key={i}
                  href={pub.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary border border-border rounded-lg hover:bg-secondary/80 transition-colors text-sm"
                >
                  {pub.name}
                  <ExternalLink size={12} />
                </a>
              ))}
            </div>
          </motion.section>

          {/* Skills */}
          <motion.section
            className="mb-12"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">{skills.title}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {skills.categories.map((category, i) => (
                <div key={i}>
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    {category.name}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item, j) => (
                      <li key={j} className="text-foreground/90">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Interests */}
          <motion.section
            className="mb-12"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">{interests.title}</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {interests.content.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-foreground/90 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.section>

          {/* Contact */}
          <motion.section
            className="mb-12 p-8 bg-secondary border border-border rounded-xl"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold text-foreground mb-4">{contact.title}</h2>
            <p className="text-foreground/90 mb-6">{contact.content}</p>
            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors font-medium"
              >
                <Mail size={16} />
                Say Hello
              </a>
              <a
                href={contact.socials.find((s) => s.name === "GitHub")?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                <Github size={16} />
                GitHub
              </a>
              <a
                href={contact.socials.find((s) => s.name === "LinkedIn")?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg hover:bg-secondary transition-colors"
              >
                <Linkedin size={16} />
                LinkedIn
              </a>
            </div>
          </motion.section>

          {/* Back to Home */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              &larr; Back to Home
            </Link>
          </motion.div>
        </article>
      </main>
    </div>
  );
}
