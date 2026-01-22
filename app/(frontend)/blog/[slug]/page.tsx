import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/payload";
import { PostPageClient } from "./PostPageClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return <PostPageClient post={post} />;
}
