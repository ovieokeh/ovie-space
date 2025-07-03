import { Linkedin, Github, Music, BookOpen, Film } from "lucide-react";

export const homepageContent = {
  hero: {
    id: "hero",
    subheading: "OVIE | DEVELOPER & DESIGNER | NETHERLANDS",
    heading: "Software Developer + Piano Enthusiast + Obsessive Mind + . . .",
    description: "Hi, I'm Ovie and welcome to my space. Hopefully, you'll find something here that resonates with you.",
    buttons: {
      primary: "See My Work",
      secondary: "Get in Touch",
    },
  },
  work: {
    id: "work",
    title: "Work & Projects",
    description: `A bit biased since I'm a developer but I believe technology, when used thoughtfully, can essentially cure most natural human problems.
    
    Here's a glimpse into some of my recent projects and explorations.
    `,
    featured: {
      tag: "Featured Project",
      title: "Kindling",
      description:
        "A platform for guided, community-driven routines. It's my main exploration into how shared practices can help people grow.",
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
        description: `As most developers, I have a lot of side projects and experiments that I work on in my spare time, from crude Solana trading bots, to AI meeting transcribing tools, to a personal WhatsApp assistant. You can find some of them on my GitHub profile.`,
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
      // {
      //   icon: Music,
      //   title: "Piano",
      //   text: `I started learning the piano in 2023 and it's been a wonderful (albeit challenging) journey.

      //   I appreciate the piano for giving me something to focus on outside of work and how it allows me to reach a state of flow.

      //   My neighbors might not love it as much though!
      //   `,
      //   linkText: "Watch My Piano Videos",
      //   linkUrl: "/piano",
      // },
      // {
      //   icon: Film,
      //   title: "Media & Film",
      //   text: `I used to watch a lot more movies and TV shows when I was younger, but these days, I probably visit the cinema once every few months.

      //   I still enjoy a good story though, whether it's a mind-breaking plot twist like in "Incendies" or a painfully sweet story like "Eternal Sunshine of the Spotless Mind".
      //   `,
      //   linkText: "See My Media List",
      //   linkUrl: "/media",
      // },
    ],
  },
  connect: {
    id: "connect",
    title: "Let's Connect",
    description:
      "I'm always open to talking with other builders, thinkers, and potential collaborators. If my work or interests resonates with you, feel free to reach out.",
    button: "Say Hello",
    buttonUrl: "mailto:kevinokeh@gmail.com",
    socials: [
      { href: "https://github.com/ovieokeh", icon: Github },
      { href: "https://linkedin.com/in/ovieokeh", icon: Linkedin },
    ],
  },
};
