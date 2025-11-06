"use client";

import Image from "next/image";
import { Fragment, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import type { BlogPost } from "@/types/blog";

const FALLBACK_IMAGE = "https://images.pexels.com/photos/442781/pexels-photo-442781.jpeg?auto=compress&cs=tinysrgb&w=1200&dpr=1";

function formatDate(input: string) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }).format(new Date(input));
  } catch (error) {
    return input;
  }
}

type BlogListProps = {
  posts: BlogPost[];
};

function renderContent(raw: string) {
  if (!raw) {
    return null;
  }

  if (/[<>&]/.test(raw)) {
    return (
      <article
        className="space-y-4 text-[15px] leading-[1.9] text-[#3b3527]"
        dangerouslySetInnerHTML={{ __html: raw }}
      />
    );
  }

  const blocks = raw
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <article className="space-y-4 text-[15px] leading-[1.9] text-[#3b3527]">
      {blocks.map((block, index) => {
        const lines = block.split(/\n/);
        return (
          <p key={`paragraph-${index}`}>
            {lines.map((line, lineIndex) => (
              <Fragment key={`paragraph-${index}-line-${lineIndex}`}>
                {line}
                {lineIndex < lines.length - 1 ? <br /> : null}
              </Fragment>
            ))}
          </p>
        );
      })}
    </article>
  );
}

function BlogOverlay({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8">
      <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto bg-white p-8 shadow-[0_30px_80px_rgba(0,0,0,0.45)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 text-sm font-semibold uppercase tracking-[0.3em] text-[#6f684f] hover:text-[#1c170a]"
        >
          Close
        </button>
        <div className="space-y-6">
          <div className="text-[12px] font-semibold uppercase tracking-[0.35em] text-[#b4975a]">
            {formatDate(post.date)}
          </div>
          <h2 className="text-[32px] font-semibold text-[#1c170a]">{post.title}</h2>
          <div className="relative h-64 w-full overflow-hidden border border-[#ede4d1]">
            <Image
              src={post.image || FALLBACK_IMAGE}
              alt={post.title}
              fill
              sizes="(min-width: 1024px) 700px, 100vw"
              className="object-cover"
            />
          </div>
          {renderContent(post.content)}
        </div>
      </div>
    </div>,
    document.body
  );
}

function BlogList({ posts }: BlogListProps) {
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const activePost = useMemo(() => posts.find((post) => post.id === activePostId) ?? null, [posts, activePostId]);

  return (
    <>
      <div className="space-y-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="flex flex-col gap-6 border border-[#ede4d1] bg-white px-8 py-8 shadow-[0_12px_35px_rgba(0,0,0,0.1)] sm:flex-row sm:items-center"
          >
            <div className="relative h-48 w-full overflow-hidden border border-[#e5dbca] sm:h-40 sm:w-64">
              <Image
                src={post.image || FALLBACK_IMAGE}
                alt={post.title}
                fill
                sizes="(min-width: 1024px) 256px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex w-full flex-col gap-4 text-left">
              <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#b4975a]">
                {formatDate(post.date)}
              </div>
              <h2 className="text-[24px] font-semibold text-[#1c170a]">{post.title}</h2>
              <p className="text-[14px] leading-[1.8] text-[#5c5541]">{post.description}</p>
              <div className="mt-auto">
                <button
                  type="button"
                  onClick={() => setActivePostId(post.id)}
                  className="inline-flex items-center border border-[#1c170a] px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.35em] text-[#1c170a] transition hover:bg-[#1c170a] hover:text-white"
                >
                  Read Article
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {activePost ? <BlogOverlay post={activePost} onClose={() => setActivePostId(null)} /> : null}
    </>
  );
}

export default BlogList;
