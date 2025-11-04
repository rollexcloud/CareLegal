'use client';

import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";
import Link from "next/link";
import Ourteam from "./Ourteam";
// ...existing code...

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
  return (
    <div
    className={cn("fixed top-10 inset-x-1 max-w-3xl mx-auto z-40", className)}
    >
        <Menu setActive={setActive}>
            {/* Flex wrapper adds spacing between items; adjust gap-6 as needed */}
            <div className="flex items-center gap-9">
                <Link href={"/"}>
                <MenuItem setActive={setActive} active={active} item="Home">
                </MenuItem>
                </Link>

                <Link href={"/our-team"}>
                <MenuItem setActive={setActive} active={active} item="Our Team" />
                </Link>


                <Link href={"/notedjudgement"}>
                <MenuItem setActive={setActive} active={active} item="Noted Judgement">
                </MenuItem>
                </Link>

                <Link href="/newsreport">
                <MenuItem setActive={setActive} active={active} item="News Report" />
                </Link>

                
                <Link href={"/contact"}>
                <MenuItem setActive={setActive} active={active} item="Contact Us">
                </MenuItem>
                </Link>
            </div>
        </Menu>
    </div>
  )
}

export default Navbar
