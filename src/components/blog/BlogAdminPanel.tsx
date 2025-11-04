"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";
import {
  createPost,
  deletePost,
  updatePost,
  createTeamMember,
  deleteTeamMember,
  updateTeamMember,
} from "@/app/blog/admin/actions";
import { BlogPost } from "@/types/blog";
import { TeamMember } from "@/types/team";

const emptyForm: Partial<BlogPost> = {
  title: "",
  description: "",
  date: "",
  image: "",
  content: "",
};

const emptyTeamForm: Partial<TeamMember> = {
  name: "",
  designation: "",
  quote: "",
  image: "",
};

type BlogAdminPanelProps = {
  posts: BlogPost[];
  teamMembers: TeamMember[];
};

type Message = {
  type: "success" | "error";
  text: string;
};

export default function BlogAdminPanel({ posts, teamMembers }: BlogAdminPanelProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<Message | null>(null);
  const [draft, setDraft] = useState<Partial<BlogPost>>(emptyForm);
  const [teamDraft, setTeamDraft] = useState<Partial<TeamMember>>(emptyTeamForm);
  const [pending, startTransition] = useTransition();

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [posts]
  );

  const sortedTeam = useMemo(
    () => [...teamMembers],
    [teamMembers]
  );

  function injectCredentials(formData: FormData) {
    formData.set("username", username);
    formData.set("password", password);
  }

  function handleCreateSubmit(formData: FormData) {
    injectCredentials(formData);
    startTransition(async () => {
      try {
        await createPost(formData);
        setDraft(emptyForm);
        setMessage({ type: "success", text: "Post created successfully." });
      } catch (error) {
        setMessage({
          type: "error",
          text: error instanceof Error ? error.message : "Failed to create post.",
        });
      }
    });
  }

  function handleUpdateSubmit(postId: string, formData: FormData) {
    injectCredentials(formData);
    formData.set("id", postId);
    startTransition(async () => {
      try {
        await updatePost(formData);
        setMessage({ type: "success", text: "Post updated successfully." });
      } catch (error) {
        setMessage({
          type: "error",
          text: error instanceof Error ? error.message : "Failed to update post.",
        });
      }
    });
  }

  function handleDelete(postId: string) {
    const formData = new FormData();
    formData.set("password", password);
    formData.set("id", postId);

    startTransition(async () => {
      try {
        await deletePost(formData);
        setMessage({ type: "success", text: "Post deleted successfully." });
      } catch (error) {
        setMessage({
          type: "error",
          text: error instanceof Error ? error.message : "Failed to delete post.",
        });
      }
    });
  }

  function onDraftChange(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const data = new FormData(form);
    setDraft({
      title: String(data.get("title") ?? ""),
      description: String(data.get("description") ?? ""),
      date: String(data.get("date") ?? ""),
      image: String(data.get("image") ?? ""),
      content: String(data.get("content") ?? ""),
    });
  }

  function onTeamDraftChange(event: FormEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const data = new FormData(form);
    setTeamDraft({
      name: String(data.get("name") ?? ""),
      designation: String(data.get("designation") ?? ""),
      quote: String(data.get("quote") ?? ""),
      image: String(data.get("image") ?? ""),
    });
  }

  function handleTeamCreate(formData: FormData) {
    injectCredentials(formData);
    startTransition(async () => {
      try {
        await createTeamMember(formData);
        setTeamDraft(emptyTeamForm);
        setMessage({ type: "success", text: "Team member added successfully." });
      } catch (error) {
        setMessage({
          type: "error",
          text: error instanceof Error ? error.message : "Failed to add team member.",
        });
      }
    });
  }

  function handleTeamUpdate(memberId: string, formData: FormData) {
    injectCredentials(formData);
    formData.set("id", memberId);
    startTransition(async () => {
      try {
        await updateTeamMember(formData);
        setMessage({ type: "success", text: "Team member updated successfully." });
      } catch (error) {
        setMessage({
          type: "error",
          text: error instanceof Error ? error.message : "Failed to update team member.",
        });
      }
    });
  }

  function handleTeamDelete(memberId: string) {
    const formData = new FormData();
    injectCredentials(formData);
    formData.set("id", memberId);

    startTransition(async () => {
      try {
        await deleteTeamMember(formData);
        setMessage({ type: "success", text: "Team member removed." });
      } catch (error) {
        setMessage({
          type: "error",
          text: error instanceof Error ? error.message : "Failed to delete team member.",
        });
      }
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16">
      <div className="max-w-5xl mx-auto px-4 space-y-10">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Blog Admin
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Provide your admin credentials to manage site content. Changes are saved to
            <code className="mx-1 rounded bg-neutral-200 px-1 py-0.5 text-sm dark:bg-neutral-800">
              src/data/blog-posts.json
            </code>
            and
            <code className="mx-1 rounded bg-neutral-200 px-1 py-0.5 text-sm dark:bg-neutral-800">
              src/data/team-members.json
            </code>
            and will require committing updates to GitHub.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Username
              </span>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                placeholder="admin username"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Password
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                placeholder="Enter password"
              />
            </label>
          </div>
          {message ? (
            <div
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                message.type === "success"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200"
                  : "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-200"
              }`}
            >
              {message.text}
            </div>
          ) : null}
        </header>

        <section className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Create a new post
          </h2>
          <form
            className="mt-6 space-y-4"
            action={handleCreateSubmit}
            onChange={onDraftChange}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Title
                </label>
                <input
                  name="title"
                  value={draft.title ?? ""}
                  onChange={() => {}}
                  className="w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                  placeholder="Post title"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={draft.date ?? ""}
                  onChange={() => {}}
                  className="w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Description
                </label>
                <textarea
                  name="description"
                  value={draft.description ?? ""}
                  onChange={() => {}}
                  className="w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                  rows={2}
                  placeholder="Short summary"
                  required
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Featured image URL
                </label>
                <input
                  name="image"
                  value={draft.image ?? ""}
                  onChange={() => {}}
                  className="w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                  placeholder="https://"
                  required
                />
              </div>
              <div className="space-y-1 sm:col-span-2">
                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Content
                </label>
                <textarea
                  name="content"
                  value={draft.content ?? ""}
                  onChange={() => {}}
                  className="w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                  rows={6}
                  placeholder="Markdown-like paragraphs separated by blank lines"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center rounded bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 disabled:opacity-50"
              disabled={pending || !password || !username}
            >
              {pending ? "Saving..." : "Create post"}
            </button>
          </form>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Existing posts
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Edit or remove posts below. Remember to commit JSON changes to GitHub
            after updates.
          </p>

          <div className="space-y-6">
            {sortedPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {post.title}
                  </h3>
                  <div className="text-sm text-neutral-500 dark:text-neutral-400">
                    {post.date}
                  </div>
                </div>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
                  {post.description}
                </p>

                <form
                  className="mt-4 space-y-4"
                  action={(formData) => handleUpdateSubmit(post.id, formData)}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      <span>Title</span>
                      <input
                        name="title"
                        defaultValue={post.title}
                        className="w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                        required
                      />
                    </label>
                    <label className="space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      <span>Date</span>
                      <input
                        type="date"
                        name="date"
                        defaultValue={post.date}
                        className="w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                      />
                    </label>
                    <label className="space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:col-span-2">
                      <span>Description</span>
                      <textarea
                        name="description"
                        defaultValue={post.description}
                        className="w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                        rows={2}
                        required
                      />
                    </label>
                    <label className="space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:col-span-2">
                      <span>Featured image URL</span>
                      <input
                        name="image"
                        defaultValue={post.image}
                        className="w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                        required
                      />
                    </label>
                    <label className="space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:col-span-2">
                      <span>Content</span>
                      <textarea
                        name="content"
                        defaultValue={post.content}
                        className="w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                        rows={6}
                        required
                      />
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50"
                      disabled={pending || !password || !username}
                    >
                      {pending ? "Saving..." : "Save changes"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(post.id)}
                      className="inline-flex items-center rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 disabled:opacity-50"
                      disabled={pending || !password || !username}
                    >
                      {pending ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </form>
              </article>
            ))}

            {sortedPosts.length === 0 ? (
              <div className="rounded border border-dashed border-neutral-300 p-8 text-center text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                No posts yet. Create your first article using the form above.
              </div>
            ) : null}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
            Manage team
          </h2>
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
            <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Add a team member
            </h3>
            <form
              className="mt-4 space-y-4"
              action={handleTeamCreate}
              onChange={onTeamDraftChange}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  <span>Name</span>
                  <input
                    name="name"
                    value={teamDraft.name ?? ""}
                    onChange={() => {}}
                    className="w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                    placeholder="Team member name"
                    required
                  />
                </label>
                <label className="space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  <span>Designation</span>
                  <input
                    name="designation"
                    value={teamDraft.designation ?? ""}
                    onChange={() => {}}
                    className="w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                    placeholder="Practice area"
                    required
                  />
                </label>
                <label className="space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:col-span-2">
                  <span>Profile image URL</span>
                  <input
                    name="image"
                    value={teamDraft.image ?? ""}
                    onChange={() => {}}
                    className="w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                    placeholder="https://"
                    required
                  />
                </label>
                <label className="space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:col-span-2">
                  <span>Quote</span>
                  <textarea
                    name="quote"
                    value={teamDraft.quote ?? ""}
                    onChange={() => {}}
                    className="w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                    rows={3}
                    placeholder="Short bio or focus area"
                    required
                  />
                </label>
              </div>
              <button
                type="submit"
                className="inline-flex items-center rounded bg-teal-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 disabled:opacity-50"
                disabled={pending || !password || !username}
              >
                {pending ? "Saving..." : "Add member"}
              </button>
            </form>
          </div>

          <div className="space-y-6">
            {sortedTeam.map((member) => (
              <article
                key={member.id}
                className="rounded-xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                      {member.name}
                    </h3>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">
                      {member.designation}
                    </p>
                  </div>
                </div>
                <form
                  className="mt-4 space-y-4"
                  action={(formData) => handleTeamUpdate(member.id, formData)}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      <span>Name</span>
                      <input
                        name="name"
                        defaultValue={member.name}
                        className="w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                        required
                      />
                    </label>
                    <label className="space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      <span>Designation</span>
                      <input
                        name="designation"
                        defaultValue={member.designation}
                        className="w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                        required
                      />
                    </label>
                    <label className="space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:col-span-2">
                      <span>Profile image URL</span>
                      <input
                        name="image"
                        defaultValue={member.image}
                        className="w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                        required
                      />
                    </label>
                    <label className="space-y-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:col-span-2">
                      <span>Quote</span>
                      <textarea
                        name="quote"
                        defaultValue={member.quote}
                        className="w-full rounded border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-200 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                        rows={3}
                        required
                      />
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50"
                      disabled={pending || !password || !username}
                    >
                      {pending ? "Saving..." : "Save changes"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleTeamDelete(member.id)}
                      className="inline-flex items-center rounded bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 disabled:opacity-50"
                      disabled={pending || !password || !username}
                    >
                      {pending ? "Deleting..." : "Remove"}
                    </button>
                  </div>
                </form>
              </article>
            ))}

            {sortedTeam.length === 0 ? (
              <div className="rounded border border-dashed border-neutral-300 p-8 text-center text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
                No team members yet. Use the form above to add your first profile.
              </div>
            ) : null}
          </div>
        </section>
      </div>
    </div>
  );
}
