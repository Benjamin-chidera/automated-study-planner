"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/upload", label: "Upload" },
  { href: "/summary", label: "Summary" },
  { href: "/planner", label: "Planner" },
  // { href: "/profile", label: "Profile" },
];

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <main>
      {/* Bottom nav */}
      <nav className="hidden fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-[#FFFFFF] rounded-full shadow-lg md:flex justify-around items-center h-16 w-9/12   border border-gray-200">
        <div>
          <Link href={"/"}>Logo</Link>
        </div>
        <div className="md:flex justify-around items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center text-sm font-bold rounded-full h-10 px-4 w-[110px] transition-colors duration-200 ${
                pathname === item.href
                  ? "bg-[#4F46E5] text-[#fff] shadow-lg"
                  : "text-black"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <Link href={"/"}>Logo</Link>
        </div>
      </nav>
    </main>
  );
};
