'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/blog", label: "Articles" },
  { href: "/#attorneys", label: "Attorneys" },
  { href: "/#contact", label: "Contact" },
];

type NavbarProps = {
  className?: string;
};

function Navbar({ className }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isMenuOpen]);

  return (
    <header className={cn("w-full bg-white shadow-sm", className)}>
      <div className="flex items-center justify-center px-4 py-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-[1140px]">
          <div
            className={cn(
              "relative flex items-center justify-between rounded-full border border-white/60 bg-white/90 px-5 py-4 backdrop-blur md:px-8"
            )}
          >
          <Link
            href="/"
            className="text-[13px] font-semibold uppercase tracking-[0.4em] text-primary"
          >
            Care Legal
          </Link>

          <nav className="hidden items-center gap-8 text-[13px] font-semibold uppercase tracking-[0.3em] text-foreground md:flex">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="transition hover:text-primary"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            {/* <Link
              href="tel:1234567890"
              className="text-[11px] font-semibold uppercase tracking-[0.35em] text-muted-foreground"
            >
              123 456 7890
            </Link> */}
            <Link
              href="/contact"
              className="rounded-full bg-primary px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white transition hover:bg-primary/90"
            >
              Free Evaluation
            </Link>
          </div>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            className="flex items-center justify-center rounded-full border border-primary/30 p-2 text-primary transition hover:bg-primary/10 md:hidden"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="relative inline-block h-4 w-4">
              <span className="absolute h-0.5 w-4 origin-center rounded bg-primary transition-transform duration-200"
                style={{ transform: isMenuOpen ? "translateY(0) rotate(45deg)" : "translateY(-6px) rotate(0deg)" }}
              />
              <span className="absolute h-0.5 w-4 origin-center rounded bg-primary transition-opacity duration-200"
                style={{ opacity: isMenuOpen ? 0 : 1 }}
              />
              <span className="absolute h-0.5 w-4 origin-center rounded bg-primary transition-transform duration-200"
                style={{ transform: isMenuOpen ? "translateY(0) rotate(-45deg)" : "translateY(6px) rotate(0deg)" }}
              />
            </span>
          </button>
        </div>

        {isMenuOpen ? (
          <div className="mt-3 rounded-3xl border border-border bg-white px-6 py-6 shadow-lg md:hidden">
            <nav className="flex flex-col gap-4 text-[13px] font-semibold uppercase tracking-[0.3em] text-foreground">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="rounded-full px-3 py-2 transition hover:bg-secondary hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-3 text-[11px] font-semibold uppercase tracking-[0.35em] text-muted-foreground">
              <a href="tel:1234567890" className="text-primary">
                123 456 7890
              </a>
              <Link
                href="/contact"
                className="rounded-full bg-primary px-4 py-2 text-center text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Free Evaluation
              </Link>
            </div>
          </div>
        ) : null}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
