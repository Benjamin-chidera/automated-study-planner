"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

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
  const router = useRouter()

  return (
    <main>
      {/* Bottom nav */}
      <nav className="hidden fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-[#FFFFFF] rounded-full shadow-lg md:flex justify-between px-5 items-center h-16 w-9/12  border border-gray-200">
        <div>
          <Link href={"/"}>Logo</Link>
        </div>
        <div className="md:flex justify-around items-center gap-3">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center text-sm font-bold rounded-full h-10 px-4 w-[110px] transition-colors duration-200 ${
                pathname === item.href
                  ? "bg-[#4F46E5] text-[#fff] shadow-lg"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div>
          <Button className="bg-[#4F46E5] text-[#fff] shadow-lg h-10 w-[100px] font-bold cursor-pointer rounded-full" onClick={() => router.push("/login")}>
            Login
          </Button>
        </div>
      </nav>
    </main>
  );
};
