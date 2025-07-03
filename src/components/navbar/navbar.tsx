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
import { MobileBottomNav } from "./mobile-bottom-nav";

const navProfile = [
  { href: "/profile", label: "Profile" },
  { href: "/uploaded-materials", label: "Uploaded Materials" },
  { href: "/completed-plans", label: "Completed Plans" },
];

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

  return (
    <main>
      {/* top nav for mobile */}
      <nav className="hidden fixed top-5 left-1/2 transform -translate-x-1/2 z-50 backdrop-blur-md bg-white/30 border-white/20 rounded-full shadow-lg md:flex justify-between px-5 items-center h-16 w-11/12 md:w-10/12 lg:w-9/12 mx-auto border">
        <section>
          <div>
            <Link href={"/"}>
              <Image
                src={"/logo.png"}
                height={150}
                width={150}
                alt="logo"
                loading="lazy"
                className=" h-20 w-20"
              />
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
            <li>
              <NavLink href="/contact" label="Contact" />
            </li>
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
                    {typeof user?.userImage === "string" && (
                      <AvatarImage src={user?.userImage} />
                    )}

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

      {/* mobile top nav */}

      <div className="md:hidden fixed top-5 left-0 right-0 mx-auto w-11/12 z-50 flex justify-between items-center h-16">
        <section>
          <div>
            <Link href={"/"}>
              <Image
                src={"/logo.png"}
                height={150}
                width={150}
                alt="logo"
                loading="lazy"
                className=" h-14 w-14 bg-white rounded-full"
              />
            </Link>
          </div>
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
      </div>

      <nav>
        <MobileBottomNav />
      </nav>
    </main>
  );
};
