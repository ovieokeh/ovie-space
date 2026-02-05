const BASE_URL = "https://ovie.dev";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ovie Okeh",
    url: BASE_URL,
    jobTitle: "Developer & Designer",
    knowsAbout: [
      "Full-Stack Web Development",
      "Product Design",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Travel Technology",
      "Business Applications",
    ],
    sameAs: [
      "https://github.com/ovieokeh",
      "https://linkedin.com/in/ovieokeh",
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
