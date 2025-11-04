"use server";

import { revalidatePath } from "next/cache";
import { BlogPost } from "@/types/blog";
import { TeamMember } from "@/types/team";
import { readBlogPosts, writeBlogPosts } from "@/lib/blog-data";
import { readTeamMembers, writeTeamMembers } from "@/lib/team-data";

import { assertAuthorized } from "@/lib/admin-auth";

export async function createPost(formData: FormData) {
  assertAuthorized(formData);

  const posts = await readBlogPosts();
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

  const nextPosts = [newPost, ...posts];
  await writeBlogPosts(nextPosts);
  revalidatePath("/blog");
  revalidatePath("/blog/admin");
}

export async function createTeamMember(formData: FormData) {
  assertAuthorized(formData);

  const members = await readTeamMembers();
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

  const nextMembers = [newMember, ...members];
  await writeTeamMembers(nextMembers);
  revalidatePath("/our-team");
  revalidatePath("/blog/admin");
}

export async function updateTeamMember(formData: FormData) {
  assertAuthorized(formData);

  const memberId = String(formData.get("id"));
  const members = await readTeamMembers();
  const idx = members.findIndex((member) => member.id === memberId);

  if (idx === -1) {
    throw new Error("Team member not found");
  }

  const updated: TeamMember = {
    ...members[idx],
    name: String(formData.get("name") ?? members[idx].name).trim(),
    designation: String(formData.get("designation") ?? members[idx].designation).trim(),
    quote: String(formData.get("quote") ?? members[idx].quote).trim(),
    image: String(formData.get("image") ?? members[idx].image).trim(),
  };

  if (!updated.name || !updated.designation || !updated.quote || !updated.image) {
    throw new Error("All team member fields are required.");
  }

  members[idx] = updated;
  await writeTeamMembers(members);
  revalidatePath("/our-team");
  revalidatePath("/blog/admin");
}

export async function deleteTeamMember(formData: FormData) {
  assertAuthorized(formData);

  const id = String(formData.get("id"));
  const members = await readTeamMembers();
  const nextMembers = members.filter((member) => member.id !== id);

  if (nextMembers.length === members.length) {
    throw new Error("Team member not found");
  }

  await writeTeamMembers(nextMembers);
  revalidatePath("/our-team");
  revalidatePath("/blog/admin");
}

export async function updatePost(formData: FormData) {
  assertAuthorized(formData);

  const postId = String(formData.get("id"));
  const posts = await readBlogPosts();
  const idx = posts.findIndex((p) => p.id === postId);

  if (idx === -1) {
    throw new Error("Post not found");
  }

  const updated: BlogPost = {
    ...posts[idx],
    title: String(formData.get("title") ?? posts[idx].title).trim(),
    description: String(formData.get("description") ?? posts[idx].description).trim(),
    date: String(formData.get("date") ?? posts[idx].date),
    image: String(formData.get("image") ?? posts[idx].image).trim(),
    content: String(formData.get("content") ?? posts[idx].content).trim(),
  };

  if (!updated.title || !updated.description || !updated.content) {
    throw new Error("Title, description, and content are required.");
  }

  posts[idx] = updated;
  await writeBlogPosts(posts);
  revalidatePath("/blog");
  revalidatePath("/blog/admin");
}

export async function deletePost(formData: FormData) {
  assertAuthorized(formData);

  const id = String(formData.get("id"));
  const posts = await readBlogPosts();
  const nextPosts = posts.filter((post) => post.id !== id);

  if (nextPosts.length === posts.length) {
    throw new Error("Post not found");
  }

  await writeBlogPosts(nextPosts);
  revalidatePath("/blog");
  revalidatePath("/blog/admin");
}
