"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";
import {
  createPost,
  deletePost,
  updatePost,
  createTeamMember,
  deleteTeamMember,
  updateTeamMember,
  logout,
} from "@/app/blog/admin/actions";
import { BlogPost } from "@/types/blog";
import { TeamMember } from "@/types/team";
import { uploadToCloudinary } from "@/lib/cloudinary-client";

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

type AdminModalState =
  | { kind: "create-blog" }
  | { kind: "edit-blog"; post: BlogPost }
  | { kind: "create-team" }
  | { kind: "edit-team"; member: TeamMember };

const DASHBOARD_BG =
  "https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=1920&dpr=1";

export default function BlogAdminPanel({ posts, teamMembers }: BlogAdminPanelProps) {
  const [message, setMessage] = useState<Message | null>(null);
  const [draft, setDraft] = useState<Partial<BlogPost>>(emptyForm);
  const [teamDraft, setTeamDraft] = useState<Partial<TeamMember>>(emptyTeamForm);
  const [modal, setModal] = useState<AdminModalState | null>(null);
  const [activeSection, setActiveSection] = useState<"blog" | "team">("blog");
  const [pending, startTransition] = useTransition();
  const [uploadState, setUploadState] = useState<{ status: "idle" | "uploading"; message?: string }>({ status: "idle" });

  const sortedPosts = useMemo(
    () => [...posts].sort((a, b) => (a.date < b.date ? 1 : -1)),
    [posts]
  );

  const sortedTeam = useMemo(
    () => [...teamMembers],
    [teamMembers]
  );

  const navItems: { key: "blog" | "team"; label: string; description: string }[] = [
    {
      key: "blog",
      label: "Insights Management",
      description: "Create new articles and maintain published insights.",
    },
    {
      key: "team",
      label: "Team Profiles",
      description: "Update attorney biographies and add new experts.",
    },
  ];

  function closeModal() {
    setModal(null);
    setDraft(emptyForm);
    setTeamDraft(emptyTeamForm);
  }

  function openCreateBlogModal() {
    setDraft(emptyForm);
    setModal({ kind: "create-blog" });
  }

  function openEditBlogModal(post: BlogPost) {
    setDraft({
      title: post.title,
      description: post.description,
      date: post.date,
      image: post.image,
      content: post.content,
    });
    setModal({ kind: "edit-blog", post });
  }

  function openCreateTeamModal() {
    setTeamDraft(emptyTeamForm);
    setModal({ kind: "create-team" });
  }

  function openEditTeamModal(member: TeamMember) {
    setTeamDraft({
      name: member.name,
      designation: member.designation,
      quote: member.quote,
      image: member.image,
    });
    setModal({ kind: "edit-team", member });
  }

  function truncate(text: string, maxLength = 160) {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength - 1)}…`;
  }

  async function handleImageUpload({
    file,
    onSuccess,
  }: {
    file: File | null;
    onSuccess: (url: string) => void;
  }) {
    if (!file) {
      return;
    }
    try {
      setUploadState({ status: "uploading" });
      const uploadedUrl = await uploadToCloudinary(file, "care-legal" );
      onSuccess(uploadedUrl);
      setUploadState({ status: "idle", message: "Image uploaded successfully." });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Image upload failed.";
      setUploadState({ status: "idle", message });
      setMessage({ type: "error", text: message });
    }
  }

  function handleCreateSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        await createPost(formData);
        setDraft(emptyForm);
        setMessage({ type: "success", text: "Post created successfully." });
        closeModal();
      } catch (error) {
        setMessage({
          type: "error",
          text: error instanceof Error ? error.message : "Failed to create post.",
        });
      }
    });
  }

  function handleUpdateSubmit(postId: string, formData: FormData) {
    formData.set("id", postId);
    startTransition(async () => {
      try {
        await updatePost(formData);
        setMessage({ type: "success", text: "Post updated successfully." });
        closeModal();
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
    startTransition(async () => {
      try {
        await createTeamMember(formData);
        setTeamDraft(emptyTeamForm);
        setMessage({ type: "success", text: "Team member added successfully." });
        closeModal();
      } catch (error) {
        setMessage({
          type: "error",
          text: error instanceof Error ? error.message : "Failed to add team member.",
        });
      }
    });
  }

  function handleTeamUpdate(memberId: string, formData: FormData) {
    formData.set("id", memberId);
    startTransition(async () => {
      try {
        await updateTeamMember(formData);
        setMessage({ type: "success", text: "Team member updated successfully." });
        closeModal();
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

  const logoutAction = logout.bind(null, "/blog/admin/login");
  const stats = [
    { label: "Published Articles", value: posts.length.toString() },
    { label: "Legal Experts", value: teamMembers.length.toString() },
    { label: "Pending Tasks", value: pending ? "1" : "0" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080809] py-20">
      <div className="absolute inset-0 bg-cover bg-center opacity-[0.18]" style={{ backgroundImage: `url(${DASHBOARD_BG})` }} aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-[#111012]/92 to-[#1d1914]/88" aria-hidden />

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-4 sm:px-6">
        <header className="space-y-6 text-white">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#e5c777]">Care Legal Admin</p>
              <h1 className="text-[36px] font-semibold leading-tight sm:text-[44px]">Editorial & Team Operations</h1>
              <p className="max-w-2xl text-[15px] leading-[1.9] text-white/70">
                Manage published insights, update attorney profiles, and keep your public pages aligned with the firms brand voice.
                All changes sync directly with Firestore.
              </p>
            </div>
            <form action={logoutAction} className="shrink-0">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full border border-[#e5c777]/60 bg-[#c7a24a] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-[#1c170a] transition hover:bg-[#e5c777]"
              >
                Log Out
              </button>
            </form>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {stats.map(({ label, value }) => (
              <div key={label} className="border border-white/10 bg-white/5 px-6 py-5 text-center shadow-[0_18px_45px_rgba(0,0,0,0.45)]">
                <p className="text-[32px] font-semibold text-[#e5c777]">{value}</p>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.35em] text-white/65">{label}</p>
              </div>
            ))}
          </div>
        </header>
        {message ? (
          <div
            className={`rounded border px-4 py-3 text-[13px] font-medium text-white shadow-[0_18px_45px_rgba(0,0,0,0.35)] ${
              message.type === "success"
                ? "border-[#1f5132] bg-[#133522] text-[#9fe2b0]"
                : "border-[#5c1f1f] bg-[#371414] text-[#f1a2a2]"
            }`}
          >
            {message.text}
          </div>
        ) : null}

        <div className="flex flex-col gap-10 lg:flex-row">
          <aside className="flex shrink-0 flex-col gap-4 rounded-[24px] border border-white/10 bg-white/5 p-8 text-white shadow-[0_28px_70px_rgba(0,0,0,0.45)] backdrop-blur-sm lg:w-[320px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#e5c777]">Admin Console</p>
            <nav className="flex flex-col gap-3">
              {navItems.map(({ key, label, description }) => {
                const isActive = activeSection === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveSection(key)}
                    className={`rounded-[18px] border px-5 py-4 text-left transition ${
                      isActive
                        ? "border-[#c7a24a] bg-[#c7a24a]/15 text-white shadow-[0_20px_45px_rgba(0,0,0,0.45)]"
                        : "border-white/10 bg-white/5 text-white/80 hover:border-[#c7a24a]/40 hover:bg-[#c7a24a]/10 hover:text-white"
                    }`}
                  >
                    <span className="text-[14px] font-semibold">{label}</span>
                    <p className="mt-1 text-[12px] leading-relaxed text-white/65">{description}</p>
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="flex-1 space-y-12">
            {activeSection === "blog" ? (
              <>
                <section className="rounded-[24px] border border-white/10 bg-white/5 px-8 py-8 text-white shadow-[0_32px_90px_rgba(0,0,0,0.55)] backdrop-blur-sm">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-3">
                      <h2 className="text-[24px] font-semibold">Insights Library</h2>
                      <p className="text-[13px] leading-[1.8] text-white/70">
                        Build credibility by keeping your thought leadership timely and on-brand. Quickly draft or revise articles below.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={openCreateBlogModal}
                      className="inline-flex items-center rounded-full bg-[#c7a24a] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-[#1c170a] transition hover:bg-[#e5c777]"
                    >
                      New Insight
                    </button>
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="space-y-4">
                    {sortedPosts.map((post) => (
                      <article
                        key={post.id}
                        className="rounded-[24px] border border-white/10 bg-white/5 p-7 text-white shadow-[0_28px_70px_rgba(0,0,0,0.45)] backdrop-blur-sm"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="text-[18px] font-semibold text-white">{post.title}</h3>
                              {post.date ? (
                                <span className="rounded-full border border-[#c7a24a]/40 bg-[#c7a24a]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e5c777]">
                                  {post.date}
                                </span>
                              ) : null}
                            </div>
                            <p className="text-[13px] leading-[1.8] text-white/70">{truncate(post.description ?? "", 160)}</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <button
                              type="button"
                              onClick={() => openEditBlogModal(post)}
                              className="inline-flex items-center rounded-full bg-[#c7a24a] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#1c170a] transition hover:bg-[#e5c777]"
                              disabled={pending}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(post.id)}
                              className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/10 disabled:opacity-40"
                              disabled={pending}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div className="mt-3 text-[12px] leading-[1.8] text-white/55">{truncate(post.content ?? "", 200)}</div>
                      </article>
                    ))}
                    {sortedPosts.length === 0 ? (
                      <div className="rounded border border-dashed border-white/30 bg-white/5 p-8 text-center text-[13px] text-white/70">
                        No posts yet. Create your first article using the button above.
                      </div>
                    ) : null}
                  </div>
                </section>
              </>
            ) : (
              <>
                <section className="rounded-[24px] border border-white/10 bg-white/5 px-8 py-8 text-white shadow-[0_32px_90px_rgba(0,0,0,0.55)] backdrop-blur-sm">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-3">
                      <h2 className="text-[24px] font-semibold">Team Directory</h2>
                      <p className="text-[13px] leading-[1.8] text-white/70">
                        Keep attorney bios and imagery current to maintain trust on the public site.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={openCreateTeamModal}
                      className="inline-flex items-center rounded-full bg-[#c7a24a] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-[#1c170a] transition hover:bg-[#e5c777]"
                    >
                      Add Member
                    </button>
                  </div>
                </section>

                <section className="space-y-4">
                  <div className="space-y-4">
                    {sortedTeam.map((member) => (
                      <article
                        key={member.id}
                        className="rounded-[24px] border border-white/10 bg-white/5 p-7 text-white shadow-[0_28px_70px_rgba(0,0,0,0.45)] backdrop-blur-sm"
                      >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                          <div className="space-y-2">
                            <h4 className="text-[18px] font-semibold text-white">{member.name}</h4>
                            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-[#e5c777]">{member.designation}</p>
                            <p className="text-[13px] leading-[1.8] text-white/70">{truncate(member.quote ?? "", 160)}</p>
                          </div>
                          <div className="flex flex-wrap items-center gap-3">
                            <button
                              type="button"
                              onClick={() => openEditTeamModal(member)}
                              className="inline-flex items-center rounded-full bg-[#c7a24a] px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#1c170a] transition hover:bg-[#e5c777]"
                              disabled={pending}
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleTeamDelete(member.id)}
                              className="inline-flex items-center rounded-full border border-white/20 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/10 disabled:opacity-40"
                              disabled={pending}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                    {sortedTeam.length === 0 ? (
                      <div className="rounded border border-dashed border-white/30 bg-white/5 p-8 text-center text-[13px] text-white/70">
                        No team members yet. Use the button above to add your first profile.
                      </div>
                    ) : null}
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
      {modal ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur-md"
          onClick={(event) => {
            if (event.currentTarget === event.target) {
              closeModal();
            }
          }}
        >
          <div className="relative w-full max-w-3xl rounded-[28px] border border-white/15 bg-[#0d0d0f]/95 p-8 text-white shadow-[0_45px_120px_rgba(0,0,0,0.65)]">
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-[20px] text-white transition hover:border-white/30 hover:bg-white/10"
              aria-label="Close"
            >
              ×
            </button>

            {modal.kind === "create-blog" || modal.kind === "edit-blog" ? (
              <div className="space-y-6">
                <div className="pr-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#e5c777]">
                    {modal.kind === "create-blog" ? "Draft Insight" : "Update Insight"}
                  </p>
                  <h2 className="mt-3 text-[28px] font-semibold">
                    {modal.kind === "create-blog" ? "Create New Thought Leadership" : "Edit Published Insight"}
                  </h2>
                  <p className="mt-3 text-[13px] leading-[1.8] text-white/70">
                    {modal.kind === "create-blog"
                      ? "Bring a fresh perspective to your clients. Provide a clear title, descriptive summary, and the full write-up below."
                      : "Ensure this article stays current. Adjust headline, imagery, or body copy and publish instantly."}
                  </p>
                </div>

                <form
                  className="space-y-5"
                  action={
                    modal.kind === "create-blog"
                      ? handleCreateSubmit
                      : (formData) => handleUpdateSubmit(modal.post.id, formData)
                  }
                  onChange={onDraftChange}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#e5c777]">
                      <span>Title</span>
                      <input
                        name="title"
                        value={draft.title ?? ""}
                        onChange={() => {}}
                        className="w-full rounded-[14px] border border-[#dfd3bb] bg-[#f8f3e8] px-4 py-3 text-[14px] text-[#1c170a] outline-none transition focus:border-[#c7a24a] focus:ring-2 focus:ring-[#c7a24a]/35"
                        placeholder="Post title"
                        required
                      />
                    </label>
                    <label className="space-y-2 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#e5c777]">
                      <span>Date</span>
                      <input
                        type="date"
                        name="date"
                        value={draft.date ?? ""}
                        onChange={() => {}}
                        className="w-full rounded-[14px] border border-[#dfd3bb] bg-[#f8f3e8] px-4 py-3 text-[14px] text-[#1c170a] outline-none transition focus:border-[#c7a24a] focus:ring-2 focus:ring-[#c7a24a]/35"
                      />
                    </label>
                    <label className="space-y-2 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#e5c777] sm:col-span-2">
                      <span>Description</span>
                      <textarea
                        name="description"
                        value={draft.description ?? ""}
                        onChange={() => {}}
                        className="w-full rounded-[14px] border border-[#dfd3bb] bg-[#f8f3e8] px-4 py-3 text-[14px] text-[#1c170a] outline-none transition focus:border-[#c7a24a] focus:ring-2 focus:ring-[#c7a24a]/35"
                        rows={3}
                        placeholder="Short executive summary"
                        required
                      />
                    </label>
                    <label className="space-y-2 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#e5c777] sm:col-span-2">
                      <span>Featured image URL</span>
                      <input
                        name="image"
                        value={draft.image ?? ""}
                        onChange={() => {}}
                        className="w-full rounded-[14px] border border-[#dfd3bb] bg-[#f8f3e8] px-4 py-3 text-[14px] text-[#1c170a] outline-none transition focus:border-[#c7a24a] focus:ring-2 focus:ring-[#c7a24a]/35"
                        placeholder="https://"
                        required
                      />
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            const file = event.target.files?.[0] ?? null;
                            handleImageUpload({
                              file,
                              onSuccess: (url) => setDraft((prev) => ({ ...prev, image: url })),
                            });
                          }}
                          className="text-[12px] text-[#1c170a]"
                        />
                        {uploadState.status === "uploading" ? (
                          <span className="text-[11px] uppercase tracking-[0.3em] text-[#b4975a]">Uploading…</span>
                        ) : null}
                      </div>
                    </label>
                    <label className="space-y-2 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#e5c777] sm:col-span-2">
                      <span>Content</span>
                      <textarea
                        name="content"
                        value={draft.content ?? ""}
                        onChange={() => {}}
                        className="w-full rounded-[14px] border border-[#dfd3bb] bg-[#f8f3e8] px-4 py-3 text-[14px] text-[#1c170a] outline-none transition focus:border-[#c7a24a] focus:ring-2 focus:ring-[#c7a24a]/35"
                        rows={7}
                        placeholder="Markdown-like paragraphs separated by blank lines"
                        required
                      />
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center rounded-full bg-[#c7a24a] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-[#1c170a] transition hover:bg-[#e5c777] disabled:opacity-60"
                      disabled={pending}
                    >
                      {pending
                        ? "Saving..."
                        : modal.kind === "create-blog"
                        ? "Create Insight"
                        : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/10"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : null}

            {modal.kind === "create-team" || modal.kind === "edit-team" ? (
              <div className="space-y-6">
                <div className="pr-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#e5c777]">
                    {modal.kind === "create-team" ? "Add Attorney" : "Update Profile"}
                  </p>
                  <h2 className="mt-3 text-[28px] font-semibold">
                    {modal.kind === "create-team" ? "Onboard a New Team Member" : "Edit Team Member Profile"}
                  </h2>
                  <p className="mt-3 text-[13px] leading-[1.8] text-white/70">
                    {modal.kind === "create-team"
                      ? "Highlight the expertise joining your practice. Complete the bio details below."
                      : "Refresh credentials, quotes, or imagery to keep this biography accurate."}
                  </p>
                </div>

                <form
                  className="space-y-5"
                  action={
                    modal.kind === "create-team"
                      ? handleTeamCreate
                      : (formData) => handleTeamUpdate(modal.member.id, formData)
                  }
                  onChange={onTeamDraftChange}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="space-y-2 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#e5c777]">
                      <span>Name</span>
                      <input
                        name="name"
                        value={teamDraft.name ?? ""}
                        onChange={() => {}}
                        className="w-full rounded-[14px] border border-[#dfd3bb] bg-[#f8f3e8] px-4 py-3 text-[14px] text-[#1c170a] outline-none transition focus:border-[#c7a24a] focus:ring-2 focus:ring-[#c7a24a]/35"
                        placeholder="Team member name"
                        required
                      />
                    </label>
                    <label className="space-y-2 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#e5c777]">
                      <span>Designation</span>
                      <input
                        name="designation"
                        value={teamDraft.designation ?? ""}
                        onChange={() => {}}
                        className="w-full rounded-[14px] border border-[#dfd3bb] bg-[#f8f3e8] px-4 py-3 text-[14px] text-[#1c170a] outline-none transition focus:border-[#c7a24a] focus:ring-2 focus:ring-[#c7a24a]/35"
                        placeholder="Practice area"
                        required
                      />
                    </label>
                    <label className="space-y-2 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#e5c777] sm:col-span-2">
                      <span>Profile image URL</span>
                      <input
                        name="image"
                        value={teamDraft.image ?? ""}
                        onChange={() => {}}
                        className="w-full rounded-[14px] border border-[#dfd3bb] bg-[#f8f3e8] px-4 py-3 text-[14px] text-[#1c170a] outline-none transition focus:border-[#c7a24a] focus:ring-2 focus:ring-[#c7a24a]/35"
                        placeholder="https://"
                        required
                      />
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(event) => {
                            const file = event.target.files?.[0] ?? null;
                            handleImageUpload({
                              file,
                              onSuccess: (url) => setTeamDraft((prev) => ({ ...prev, image: url })),
                            });
                          }}
                          className="text-[12px] text-[#1c170a]"
                        />
                        {uploadState.status === "uploading" ? (
                          <span className="text-[11px] uppercase tracking-[0.3em] text-[#b4975a]">Uploading…</span>
                        ) : null}
                      </div>
                    </label>
                    <label className="space-y-2 text-[12px] font-semibold uppercase tracking-[0.3em] text-[#e5c777] sm:col-span-2">
                      <span>Quote</span>
                      <textarea
                        name="quote"
                        value={teamDraft.quote ?? ""}
                        onChange={() => {}}
                        className="w-full rounded-[14px] border border-[#dfd3bb] bg-[#f8f3e8] px-4 py-3 text-[14px] text-[#1c170a] outline-none transition focus:border-[#c7a24a] focus:ring-2 focus:ring-[#c7a24a]/35"
                        rows={4}
                        placeholder="Short bio or focus area"
                        required
                      />
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      className="inline-flex items-center rounded-full bg-[#c7a24a] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-[#1c170a] transition hover:bg-[#e5c777] disabled:opacity-60"
                      disabled={pending}
                    >
                      {pending
                        ? "Saving..."
                        : modal.kind === "create-team"
                        ? "Add Member"
                        : "Save Changes"}
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="inline-flex items-center rounded-full border border-white/20 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-white/10"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
