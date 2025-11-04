"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { BlogPost } from "@/types/blog";

type BlogListProps = {
  posts: BlogPost[];
};

function formatDate(date: string) {
  try {
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date));
  } catch (error) {
    return date;
  }
}

function renderContent(content: string) {
  return content
    .split(/\n\s*\n/)
    .filter(Boolean)
    .map((paragraph, index) => (
      <p key={index} className="mb-4 last:mb-0">
        {paragraph}
      </p>
    ));
}

function BlogList({ posts }: BlogListProps) {
  const [active, setActive] = useState<BlogPost | boolean | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(false);
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* Background overlay when expanded */}
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm h-full w-full z-10 "
          />
        )}
      </AnimatePresence>

      {/* Expanded news card */}
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.div
              layoutId={`card-${active.id}-${id}`}
              ref={ref}
              className="w-full max-w-[700px] bg-white dark:bg-neutral-900 rounded-3xl shadow-xl overflow-hidden"
            >
              <div className="relative">
                <motion.img
                  layoutId={`image-${active.id}-${id}`}
                  src={active.image}
                  alt={active.title}
                  className="w-full h-60 object-cover"
                />
                <motion.button
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white text-black rounded-full h-8 w-8 flex items-center justify-center"
                >
                  ✕
                </motion.button>
              </div>

              <div className="p-6 space-y-4">
                <motion.h2
                  layoutId={`title-${active.id}-${id}`}
                  className="text-2xl font-bold text-neutral-800 dark:text-neutral-100"
                >
                  {active.title}
                </motion.h2>
                <motion.p
                  layoutId={`description-${active.id}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  {formatDate(active.date)}
                </motion.p>

                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-700 dark:text-neutral-300 text-base leading-relaxed overflow-auto max-h-[60vh] [scrollbar-width:none]"
                >
                  {renderContent(active.content)}
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* News list view */}
      <ul className="max-w-3xl mx-auto w-full flex flex-col gap-4 mt-40">
        {posts.map((post) => (
          <motion.div
            layoutId={`card-${post.id}-${id}`}
            key={post.id}
            onClick={() => setActive(post)}
            className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl cursor-pointer bg-white dark:bg-neutral-900 hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div className="flex items-center gap-4">
              <motion.img
                layoutId={`image-${post.id}-${id}`}
                src={post.image}
                alt={post.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <motion.h3
                  layoutId={`title-${post.id}-${id}`}
                  className="text-lg font-semibold text-neutral-900 dark:text-neutral-100"
                >
                  {post.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${post.id}-${id}`}
                  className="text-sm text-neutral-600 dark:text-neutral-400"
                >
                  {formatDate(post.date)}
                </motion.p>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400 max-w-xl">
                  {post.description}
                </p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${post.id}-${id}`}
              className="mt-4 sm:mt-0 px-4 py-2 text-sm rounded-full bg-gray-100 hover:bg-green-500 hover:text-white dark:bg-neutral-800 dark:text-neutral-200"
            >
              Read More
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export default BlogList;
