"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { BlogPost } from "@/types/blog";
import { TeamMember } from "@/types/team";
import {
  readBlogPosts,
  saveBlogPost,
  getBlogPost,
  deleteBlogPost,
} from "@/lib/blog-data";
import {
  readTeamMembers,
  saveTeamMember,
  getTeamMember,
  removeTeamMember,
} from "@/lib/team-data";

import { assertAdminSession, destroyAdminSession } from "@/lib/admin-session";

export async function createPost(formData: FormData) {
  assertAdminSession();

  const now = new Date();
  const id = `post-${now.getTime()}`;

  const newPost: BlogPost = {
    id,
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    date: String(formData.get("date") ?? now.toISOString().slice(0, 10)),
    image: String(formData.get("image") ?? "").trim(),
    content: String(formData.get("content") ?? "").trim(),
  };

  if (!newPost.title || !newPost.description || !newPost.content) {
    throw new Error("Title, description, and content are required.");
  }

  await saveBlogPost(newPost);
  revalidatePath("/blog");
  revalidatePath("/blog/admin");
}

export async function createTeamMember(formData: FormData) {
  assertAdminSession();

  const newMember: TeamMember = {
    id: `team-${Date.now()}`,
    name: String(formData.get("name") ?? "").trim(),
    designation: String(formData.get("designation") ?? "").trim(),
    quote: String(formData.get("quote") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
  };

  if (!newMember.name || !newMember.designation || !newMember.quote || !newMember.image) {
    throw new Error("All team member fields are required.");
  }

  await saveTeamMember(newMember);
  await Promise.all([
    revalidatePath("/our-team"),
    revalidatePath("/"),
    revalidateTag("team-members"),
    revalidatePath("/blog/admin"),
  ]);
}

export async function updateTeamMember(formData: FormData) {
  assertAdminSession();

  const memberId = String(formData.get("id"));
  const existing = await getTeamMember(memberId);

  if (!existing) {
    throw new Error("Team member not found");
  }

  const updated: TeamMember = {
    ...existing,
    name: String(formData.get("name") ?? existing.name).trim(),
    designation: String(formData.get("designation") ?? existing.designation).trim(),
    quote: String(formData.get("quote") ?? existing.quote).trim(),
    image: String(formData.get("image") ?? existing.image).trim(),
  };

  if (!updated.name || !updated.designation || !updated.quote || !updated.image) {
    throw new Error("All team member fields are required.");
  }

  await saveTeamMember(updated);
  await Promise.all([
    revalidatePath("/our-team"),
    revalidatePath("/"),
    revalidateTag("team-members"),
    revalidatePath("/blog/admin"),
  ]);
}

export async function deleteTeamMember(formData: FormData) {
  assertAdminSession();

  const id = String(formData.get("id"));
  const existing = await getTeamMember(id);

  if (!existing) {
    throw new Error("Team member not found");
  }

  await removeTeamMember(id);
  await Promise.all([
    revalidatePath("/our-team"),
    revalidatePath("/"),
    revalidateTag("team-members"),
    revalidatePath("/blog/admin"),
  ]);
}

export async function updatePost(formData: FormData) {
  assertAdminSession();

  const postId = String(formData.get("id"));
  const existing = await getBlogPost(postId);

  if (!existing) {
    throw new Error("Post not found");
  }

  const updated: BlogPost = {
    ...existing,
    title: String(formData.get("title") ?? existing.title).trim(),
    description: String(formData.get("description") ?? existing.description).trim(),
    date: String(formData.get("date") ?? existing.date),
    image: String(formData.get("image") ?? existing.image).trim(),
    content: String(formData.get("content") ?? existing.content).trim(),
  };

  if (!updated.title || !updated.description || !updated.content) {
    throw new Error("Title, description, and content are required.");
  }

  await saveBlogPost(updated);
  revalidatePath("/blog");
  revalidatePath("/blog/admin");
}

export async function deletePost(formData: FormData) {
  assertAdminSession();

  const id = String(formData.get("id"));
  const existing = await getBlogPost(id);

  if (!existing) {
    throw new Error("Post not found");
  }

  await deleteBlogPost(id);
  revalidatePath("/blog");
  revalidatePath("/blog/admin");
}

export async function logout(returnTo?: string) {
  destroyAdminSession();
  redirect(returnTo && returnTo.startsWith("/") ? returnTo : "/blog/admin/login");
}
