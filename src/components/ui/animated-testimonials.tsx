"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";

import { useEffect, useMemo, useState } from "react";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};
export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const update = () => {
      setShouldAnimate(!(reduceMotionQuery.matches || mobileQuery.matches));
    };

    update();
    reduceMotionQuery.addEventListener("change", update);
    mobileQuery.addEventListener("change", update);

    return () => {
      reduceMotionQuery.removeEventListener("change", update);
      mobileQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!autoplay) {
      return;
    }

    if (!shouldAnimate || testimonials.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length, shouldAnimate]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  const activeQuoteWords = useMemo(() => {
    if (!shouldAnimate) {
      return [testimonials[active]?.quote ?? ""];
    }

    return testimonials[active]?.quote.split(" ") ?? [];
  }, [active, testimonials, shouldAnimate]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 font-sans antialiased md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="relative h-72 w-full rounded-3xl bg-neutral-800/30 p-4 shadow-lg shadow-black/20 backdrop-blur">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: shouldAnimate ? 0.9 : 1,
                    z: shouldAnimate ? -100 : 0,
                    rotate: shouldAnimate ? randomRotateY() : 0,
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : shouldAnimate ? 0.7 : 0,
                    scale: isActive(index) ? 1 : shouldAnimate ? 0.95 : 1,
                    z: shouldAnimate ? (isActive(index) ? 0 : -100) : 0,
                    rotate: shouldAnimate ? (isActive(index) ? 0 : randomRotateY()) : 0,
                    zIndex: isActive(index)
                      ? 40
                      : shouldAnimate
                      ? testimonials.length + 2 - index
                      : 0,
                    y: shouldAnimate && isActive(index) ? [0, -60, 0] : 0,
                  }}
                  exit={{
                    opacity: shouldAnimate ? 0 : 1,
                    scale: shouldAnimate ? 0.9 : 1,
                    z: shouldAnimate ? 100 : 0,
                    rotate: shouldAnimate ? randomRotateY() : 0,
                  }}
                  transition={{
                    duration: shouldAnimate ? 0.45 : 0.2,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full rounded-2xl object-cover object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-8 rounded-3xl bg-neutral-900/30 p-6 shadow-inner shadow-black/20 backdrop-blur">
          <motion.div
            key={active}
            initial={{
              y: shouldAnimate ? 20 : 0,
              opacity: shouldAnimate ? 0 : 1,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: shouldAnimate ? -20 : 0,
              opacity: shouldAnimate ? 0 : 1,
            }}
            transition={{
              duration: shouldAnimate ? 0.25 : 0.18,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-black dark:text-white">
              {testimonials[active].name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {testimonials[active].designation}
            </p>
            <motion.p className="mt-6 text-base leading-relaxed text-gray-500 dark:text-neutral-300 md:text-lg">
              {shouldAnimate
                ? activeQuoteWords.map((word, index) => (
                    <motion.span
                      key={`${word}-${index}`}
                      initial={{
                        filter: "blur(10px)",
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.18,
                        ease: "easeOut",
                        delay: 0.015 * index,
                      }}
                      className="inline-block"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))
                : testimonials[active].quote}
            </motion.p>
          </motion.div>
          <div className="flex flex-wrap gap-3 pt-6 md:pt-0">
            <button
              onClick={handlePrev}
              disabled={testimonials.length <= 1}
              className="group/button flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-neutral-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
              <IconArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover/button:rotate-12" />
            </button>
            <button
              onClick={handleNext}
              disabled={testimonials.length <= 1}
              className="group/button flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-neutral-700 transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
              <IconArrowRight className="h-5 w-5 transition-transform duration-300 group-hover/button:-rotate-12" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
