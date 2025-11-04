import fs from "fs/promises";
import path from "path";
import { BlogPost } from "@/types/blog";

const BLOG_DATA_PATH = path.join(process.cwd(), "src", "data", "blog-posts.json");

export async function readBlogPosts(): Promise<BlogPost[]> {
  const raw = await fs.readFile(BLOG_DATA_PATH, "utf-8");
  const posts: BlogPost[] = JSON.parse(raw);
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function writeBlogPosts(posts: BlogPost[]): Promise<void> {
  await fs.writeFile(BLOG_DATA_PATH, JSON.stringify(posts, null, 2) + "\n", "utf-8");
}
