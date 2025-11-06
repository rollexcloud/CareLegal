"use client";

import { useEffect, useState } from "react";

function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 320);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-5 z-40 inline-flex items-center gap-2 border border-[#e5c777] bg-[#0a0a0d] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#e5c777] shadow-[0_18px_45px_rgba(0,0,0,0.35)] transition hover:bg-[#c7a24a] hover:text-[#1c170a] sm:right-8"
      aria-label="Back to top"
    >
      ↑ Back To Top
    </button>
  );
}

export default BackToTopButton;
