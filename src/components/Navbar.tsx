'use client';

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { Menu, MenuItem } from "./ui/navbar-menu";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/our-team", label: "Our Team" },
  { href: "/blog", label: "News" },
  { href: "/contact", label: "Contact Us" },
];

type NavbarProps = {
  className?: string;
};

function Navbar({ className }: NavbarProps) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-3 z-40 flex justify-center px-3 transition-all duration-300 sm:top-4 sm:px-6 lg:top-6 lg:px-8",
        className
      )}
    >
      <div className="w-full max-w-6xl">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/45 px-4 py-2.5 shadow-lg shadow-black/20 backdrop-blur-md sm:px-5 sm:py-3 md:justify-center">
          <Link href="/" className="sr-only">
            Home
          </Link>

          <nav className="hidden gap-8 md:flex">
            <Menu setActive={setActive}>
              <div className="flex items-center gap-8">
                {NAV_LINKS.map(({ href, label }) => (
                  <Link key={label} href={href}>
                    <MenuItem setActive={setActive} active={active} item={label} />
                  </Link>
                ))}
              </div>
            </Menu>
          </nav>

          <nav className="flex w-full justify-center md:hidden">
            <ul className="flex w-full items-center justify-between gap-2 text-sm font-medium text-neutral-100">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="rounded-full px-3 py-2 transition hover:bg-white/10"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
