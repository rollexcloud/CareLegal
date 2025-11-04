import BlogList from "@/components/newsreport";
import { readBlogPosts } from "@/lib/blog-data";

export default async function BlogPage() {
  const posts = await readBlogPosts();
  return <BlogList posts={posts} />;
}
