"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/upload", label: "Upload" },
  { href: "/summary", label: "Summary" },
  { href: "/planner", label: "Planner" },
  // { href: "/profile", label: "Profile" },
];

const navProfile = [
  { href: "/profile", label: "Profile" },
  { href: "/uploaded-materials", label: "Uploaded Materials" },
  { href: "/existing-plans", label: "Exiting Plans" },
  { href: "/completed-plans", label: "Completed Plans" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <main>
      {/* top nav */}
      <nav className="hidden fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-[#FFFFFF] rounded-full shadow-lg md:flex justify-between px-5 items-center h-16 w-9/12  border border-gray-200">
        <section>
          <div>
            <Link href={"/"}>
            <Image src={"/logo.png"} height={150} width={150} alt="logo"/>
            </Link>
          </div>
        </section>

        <section>
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
        </section>

        <section>
          <div className=" flex items-center gap-3">
            <Button
              className="bg-[#4F46E5] text-[#fff] shadow-lg h-10 w-[100px] font-bold cursor-pointer rounded-full"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>

            {/* this is for the user avatar section */}

            <DropdownMenu>
              <DropdownMenuTrigger className=" border-none outline-none cursor-pointer">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" bg-[#4F46E5] text-white w-[170px] space-y-1">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {navProfile.map((nav, i) => (
                  <DropdownMenuItem
                    key={i}
                    className={`hover:bg-white hover:text-black hover:font-bold cursor-pointer ${
                      pathname === nav.href && "bg-white text-black font-bold"
                    }`}
                    onClick={() => router.push(`${nav.href}`)}
                  >
                    {nav.label}
                  </DropdownMenuItem>
                ))}

                {/* this is the logout button */}

                <DropdownMenuItem className="bg-white text-black font-bold cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </section>
      </nav>
    </main>
  );
};
