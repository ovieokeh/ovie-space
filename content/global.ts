import { homepageContent } from "./homepage";

export const globalContent = {
  nav: {
    name: "Ovie.",
    links: [
      { name: "About", href: `/#${homepageContent.hero.id}` },
      { name: "Work", href: `/#${homepageContent.work.id}` },
      { name: "Interests", href: `/#${homepageContent.interests.id}` },
    ],
  },
  footer: {
    copyright: `© ${new Date().getFullYear()} Ovie. All rights reserved.`,
    location: "Crafted with intention in the Netherlands.",
  },
};
