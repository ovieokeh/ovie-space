const BASE_URL = "https://ovie.dev";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ovie Okeh",
    url: BASE_URL,
    jobTitle: "Software Engineer",
    description:
      "Software engineer building products end-to-end across TypeScript, Swift, and Rust. Based in the Netherlands. Available for contract and architect engagements.",
    knowsAbout: [
      "Software Engineering",
      "Full-Stack Development",
      "TypeScript",
      "Swift",
      "Rust",
      "React",
      "Next.js",
      "Node.js",
      "PostgreSQL",
      "AI Tooling",
      "LLM Agents",
      "Product Development",
      "Spec-First Development",
      "End-to-End Product Delivery",
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Software Engineer",
      occupationLocation: {
        "@type": "Country",
        name: "Netherlands",
      },
      skills:
        "TypeScript, Swift, Rust, React, Next.js, Node.js, PostgreSQL, AI tooling, end-to-end product delivery, spec-first development",
    },
    sameAs: [
      "https://github.com/ovieokeh",
      "https://linkedin.com/in/ovieokeh",
      "https://pusher.com/author/ovie-okeh",
      "https://blog.logrocket.com/author/ovieokeh/",
      "https://blog.openreplay.com/authors/ovie-okeh/",
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "NL",
    },
  };
}

export function webSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ovie.dev",
    url: BASE_URL,
    author: {
      "@type": "Person",
      name: "Ovie Okeh",
    },
  };
}

export function blogPostingJsonLd(post: {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string | null;
  lastUpdatedAt: string | null;
  coverImageUrl?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `${BASE_URL}/blog/${post.slug}`,
    author: {
      "@type": "Person",
      name: "Ovie Okeh",
      url: BASE_URL,
    },
    ...(post.publishedAt && { datePublished: post.publishedAt }),
    ...(post.lastUpdatedAt && { dateModified: post.lastUpdatedAt }),
    ...(post.coverImageUrl && {
      image: post.coverImageUrl.startsWith("http") ? post.coverImageUrl : `${BASE_URL}${post.coverImageUrl}`,
    }),
    publisher: {
      "@type": "Person",
      name: "Ovie Okeh",
      url: BASE_URL,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
