import { getPosts } from "@/lib/payload";
import { BlogPageClient } from "./BlogPageClient";

const pageContent = {
  header: {
    title: "Blog",
    description: "Musings, thoughts, and explorations on tech, life, and everything in between.",
  },
};

export default async function BlogPage() {
  const posts = await getPosts();

  return <BlogPageClient posts={posts} header={pageContent.header} />;
}
