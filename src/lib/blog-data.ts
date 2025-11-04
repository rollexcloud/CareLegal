import { BlogPost } from "@/types/blog";
import { adminDb } from "@/lib/firebase-admin";

const blogCollection = adminDb.collection("blogPosts");

export async function readBlogPosts(): Promise<BlogPost[]> {
  try {
    const snapshot = await blogCollection.orderBy("date", "desc").get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as Omit<BlogPost, "id">) }));
  } catch (error) {
    console.warn("Failed to read blog posts from Firestore; returning empty list.", error);
    return [];
  }
}

export async function getBlogPost(postId: string): Promise<BlogPost | null> {
  const doc = await blogCollection.doc(postId).get();
  if (!doc.exists) {
    return null;
  }

  return { id: doc.id, ...(doc.data() as Omit<BlogPost, "id">) };
}

export async function saveBlogPost(post: BlogPost): Promise<void> {
  await blogCollection.doc(post.id).set(post);
}

export async function deleteBlogPost(postId: string): Promise<void> {
  await blogCollection.doc(postId).delete();
}
