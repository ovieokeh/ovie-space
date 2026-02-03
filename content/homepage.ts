import { Linkedin, Github, Music, BookOpen, Film } from "lucide-react";

export const homepageContent = {
  hero: {
    id: "hero",
    subheading: "DEVELOPER & DESIGNER | NETHERLANDS",
    heading: "Human, Builder, Serial Hobbyist.",
    description: "Hi, I'm Ovie. This is my digital space—a place to share my work and interests",
    buttons: {
      primary: "See My Work",
      secondary: "Get in Touch",
    },
  },
  work: {
    id: "work",
    title: "Work & Projects",
    description: `I believe technology, when wielded with intention, is the most powerful tool for solving human challenges.

Here are a few projects where I've experienced this firsthand, from building complex business management systems to exploring new ways of shared human experiences.
    `,
    featured: {
      tag: "Featured Project",
      title: "Kindling",
      description:
        "The primary application of my philosophy. Kindling is a platform for guided, community-driven routines, designed to explore how shared practices can foster personal growth.",
      linkText: "Learn More",
      linkUrl: "https://www.getkindling.app/en",
    },
    others: [
      {
        image: "https://placehold.co/600x400/0f172a/94a3b8?text=Bird+Box",
        title: "Bird Box",
        description: `"Business in a box. Everything you need, in one app." — This was my main job for about 3 years until June 2025.
        
        It is a comprehensive business management app that helps businesses streamline their operations, from invoicing to project management.
        
        It was a great opportunity to work on a complex, high-impact product with tons of moving parts and a strong engineering team.
        `,
        linkText: "See Bird",
        linkUrl: "https://bird.com",
      },
      {
        image: "https://placehold.co/600x400/0f172a/94a3b8?text=Eurail",
        title: "Eurail",
        description: `"Explore Europe by rail." - This was my first major role in the European tech market.
        
        I worked on the official Eurail website building features like the timetable and trip planner, which helped millions of travelers plan their journeys across Europe.
        
        It was a great experience working with a large, international team and learning about the complexities of travel tech.
        `,
        linkText: "See Eurail",
        linkUrl: "https://eurail.com",
      },
      {
        image: "https://placehold.co/600x400/0f172a/94a3b8?text=Explorations",
        title: "Explorations",
        description: `My curiosity drives me to constantly tinker with new technologies.
        
        My GitHub is a public workshop for these experiments, from crude Solana trading bots and AI-powered meeting assistants to personal automation tools.`,
        linkText: "See My GitHub",
        linkUrl: "https://github.com/ovieokeh",
      },
    ],
  },
  interests: {
    id: "interests",
    title: "Beyond the Screen",
    description:
      "When I'm not coding, I'm usually exploring other interests. Here's a glimpse into what's been on my mind lately.",
    items: [
      {
        icon: BookOpen,
        title: "Books & Reading",
        text: `When I'm able to find the time, I love sinking into a good book.
        
        Books that are able to craft a compelling narrative, that explore different realities, or that provide insights into the human condition are my favorites.
        `,
        linkText: "See My Reading List",
        linkUrl: "/reading",
      },
      {
        icon: Film,
        title: "Media & Film",
        text: `I enjoy a good story, whether it's a mind-breaking plot twist like in "Incendies" or a horror story like "Eternal Sunshine of the Spotless Mind".
        `,
        linkText: "See My Media List",
        linkUrl: "/media",
      },
      {
        icon: Music,
        title: "Hobbies & Creations",
        text: `From tinkering with electronics to playing the piano, I love exploring new hobbies and sharing my creations.
        I want to share more of my creative side here as a way to keep track of my progress and hopefully inspire myself whenever I feel stuck.
        `,
        linkText: "See My Hobbies",
        linkUrl: "/hobbies",
      },
    ],
  },
  connect: {
    id: "connect",
    title: "Let's Connect",
    description:
      "I'm always open to talking with other builders, tinkerers, and potential collaborators. If my work or interests resonates with you, feel free to reach out.",
    button: "Say Hello",
    buttonUrl: "mailto:kevinokeh@gmail.com",
    socials: [
      { href: "https://github.com/ovieokeh", icon: Github },
      { href: "https://linkedin.com/in/ovieokeh", icon: Linkedin },
    ],
  },
};
