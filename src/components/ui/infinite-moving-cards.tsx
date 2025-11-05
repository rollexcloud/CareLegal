"use client";

import { cn } from "@/utils/cn";
import React, { useEffect, useMemo, useState } from "react";

type CardItem = {
  quote: string;
  name: string;
  title: string;
  _loopKey?: string;
};

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: CardItem[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setShouldAnimate(!reduceMotionQuery.matches);
    };

    update();
    reduceMotionQuery.addEventListener("change", update);

    return () => {
      reduceMotionQuery.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!shouldAnimate || !containerRef.current) {
      return;
    }

    const animationDuration =
      speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
    containerRef.current.style.setProperty(
      "--animation-duration",
      animationDuration
    );
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse"
    );
  }, [direction, speed, shouldAnimate]);

  const renderedItems = useMemo(() => {
    if (!shouldAnimate) {
      return items;
    }

    return items.flatMap((item, index) => [
      { ...item, _loopKey: `a-${index}` },
      { ...item, _loopKey: `b-${index}` },
    ]);
  }, [items, shouldAnimate]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl",
        shouldAnimate
          ? "overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]"
          : "overflow-x-auto",
        className
      )}
    >
      <ul
        className={cn(
          "flex min-w-full gap-4 py-4",
          shouldAnimate
            ? cn(
                "w-max flex-nowrap animate-scroll",
                pauseOnHover && "hover:[animation-play-state:paused]"
              )
            : "snap-x snap-mandatory"
        )}
      >
        {renderedItems.map((item, idx) => (
          <li
            className={cn(
              "relative w-[280px] max-w-full flex-shrink-0 rounded-2xl border border-b-0 border-slate-700 px-6 py-5 text-left",
              !shouldAnimate && "snap-center"
            )}
            style={{
              background:
                "linear-gradient(180deg, var(--slate-800), var(--slate-900))",
            }}
            key={item._loopKey ?? `${item.name}-${idx}`}
          >
            <blockquote>
              <div
                aria-hidden="true"
                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
              ></div>
              <span className=" relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center">
                <span className="flex flex-col gap-1">
                  <span className=" text-sm leading-[1.6] text-gray-400 font-normal">
                    {item.name}
                  </span>
                  <span className=" text-sm leading-[1.6] text-gray-400 font-normal">
                    {item.title}
                  </span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
