"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

function NewsReport() {
  const [active, setActive] = useState<(typeof newsArticles)[number] | boolean | null>(null);
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
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[700px] bg-white dark:bg-neutral-900 rounded-3xl shadow-xl overflow-hidden"
            >
              <div className="relative">
                <motion.img
                  layoutId={`image-${active.title}-${id}`}
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
                  layoutId={`title-${active.title}-${id}`}
                  className="text-2xl font-bold text-neutral-800 dark:text-neutral-100"
                >
                  {active.title}
                </motion.h2>
                <motion.p
                  layoutId={`description-${active.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400"
                >
                  {active.date}
                </motion.p>

                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-neutral-700 dark:text-neutral-300 text-base leading-relaxed overflow-auto max-h-[60vh] [scrollbar-width:none]"
                >
                  {typeof active.content === "function" ? active.content() : active.content}
                </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* News list view */}
      <ul className="max-w-3xl mx-auto w-full flex flex-col gap-4 mt-40">
        {newsArticles.map((news) => (
          <motion.div
            layoutId={`card-${news.title}-${id}`}
            key={news.title}
            onClick={() => setActive(news)}
            className="p-4 border border-neutral-200 dark:border-neutral-800 rounded-xl cursor-pointer bg-white dark:bg-neutral-900 hover:shadow-md transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div className="flex items-center gap-4">
              <motion.img
                layoutId={`image-${news.title}-${id}`}
                src={news.image}
                alt={news.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <motion.h3
                  layoutId={`title-${news.title}-${id}`}
                  className="text-lg font-semibold text-neutral-900 dark:text-neutral-100"
                >
                  {news.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${news.description}-${id}`}
                  className="text-sm text-neutral-600 dark:text-neutral-400"
                >
                  {news.date}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${news.title}-${id}`}
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

// Dummy news data
const newsArticles = [
  {
    title: "Tech Giant Launches AI-Powered Search Engine",
    description: "AI Innovation",
    date: "October 20, 2025",
    image: "https://www.shutterstock.com/shutterstock/photos/1864432501/display_1500/stock-vector-advocate-symbol-with-text-black-circle-background-justice-lawyer-sign-1864432501.jpg",
    content: () => (
      <p>
        The tech world witnessed a breakthrough as a major company unveiled an
        AI-powered search engine promising to revolutionize information
        discovery. The new engine integrates natural language processing and
        deep learning algorithms to deliver more intuitive and contextual search
        results. Industry experts predict this could reshape how users interact
        with online information.
      </p>
    ),
  },
  {
    title: "SpaceX Announces Civilian Mission to the Moon",
    description: "Space Exploration",
    date: "October 15, 2025",
    image: "https://university.help.edu.my/wp-content/uploads/2023/11/HU-Prog-IT-LAW-UK.jpg",
    content: () => (
      <p>
        SpaceX has officially announced the launch of its first fully civilian
        mission to orbit the moon. The mission aims to test deep space travel
        capabilities and inspire global interest in space exploration. The crew
        will include individuals from diverse backgrounds, highlighting the
        accessibility of future space missions.
      </p>
    ),
  },
  {
    title: "Breakthrough in Renewable Energy Storage",
    description: "Green Tech",
    date: "October 12, 2025",
    image: "https://university.help.edu.my/wp-content/uploads/2023/11/HU-Prog-IT-LAW-UK.jpg",
    content: () => (
      <p>
        Scientists have developed a new energy storage system that could
        drastically reduce reliance on fossil fuels. This innovative battery
        technology uses sustainable materials and boasts an efficiency rate
        significantly higher than current lithium-ion models, marking a
        milestone in renewable energy research.
      </p>
    ),
  },
];

// ✅ Default export
export default NewsReport;
