// components/navbar/NavLink.tsx
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinkProps = {
  href: string;
  label: string | React.ReactNode;
};

export const NavLink = ({ href, label }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`w-[60px] md:w-[110px] flex flex-col items-center justify-center text-sm font-bold rounded-full h-10 md:px-4 transition-colors duration-200 ${
        isActive
          ? "bg-[#4F46E5] text-white shadow-lg"
          : "text-black hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  );
};
