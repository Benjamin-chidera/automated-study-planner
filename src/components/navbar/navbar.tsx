import React from "react";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
import { NavLink } from "./nav";
import { Menu } from "./menu";
import { getAuthUser } from "@/lib/getUser";
import { logout } from "@/app/actions/auth";

const navProfile = [
  { href: "/profile", label: "Profile" },
  { href: "/uploaded-materials", label: "Uploaded Materials" },
  { href: "/existing-plans", label: "Exiting Plans" },
  { href: "/completed-plans", label: "Completed Plans" },
];

// interface User {
//   userName: string;
// }

export const Navbar = async () => {
  const user = await getAuthUser();

  let initials = "";
  if (user && typeof user?.userName === "string") {
    initials = user?.userName
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((word: string) => word[0]?.toUpperCase() || "")
      .join("");
  }

  // console.log(initials);

  return (
    <main>
      {/* top nav */}
      <nav className="hidden fixed top-5 left-1/2 transform -translate-x-1/2 z-50 bg-[#FFFFFF] rounded-full shadow-lg md:flex justify-between px-5 items-center h-16 w-9/12  border border-gray-200">
        <section>
          <div>
            <Link href={"/"}>
              <Image src={"/logo.jpeg"} height={150} width={150} alt="logo" />
            </Link>
          </div>
        </section>

        <section>
          <ul className="md:flex justify-around items-center gap-3">
            <li>
              <NavLink href="/" label="Home" />
            </li>
            <li>
              <NavLink href="/about" label="About" />
            </li>
            {user && (
              <li>
                <NavLink href="/upload" label="Upload" />
              </li>
            )}

            {user && (
              <li>
                <NavLink href="/summary" label="Summary" />
              </li>
            )}

            {user && (
              <li>
                <NavLink href="/planner" label="Planner" />
              </li>
            )}
          </ul>
        </section>

        <section>
          <div className=" flex items-center gap-3">
            {!user && <NavLink href="/login" label="Login" />}

            {/* this is for the user avatar section */}

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger className=" border-none outline-none cursor-pointer">
                  <Avatar>
                    {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                    <AvatarFallback className=" text-white bg-[#4F46E5] font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className=" bg-[#4F46E5] text-white w-[170px] space-y-1">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />

                  {navProfile.map((nav, i) => (
                    <Menu nav={nav} key={i} />
                  ))}

                  {/* this is the logout button */}

                  <form action={logout}>
                    <button className="w-full">
                      <DropdownMenuItem className="bg-white text-black font-bold cursor-pointer">
                        Logout
                      </DropdownMenuItem>
                    </button>
                  </form>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </section>
      </nav>
    </main>
  );
};
