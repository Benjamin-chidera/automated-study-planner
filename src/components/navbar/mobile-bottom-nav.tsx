import React from "react";
import { getAuthUser } from "@/lib/getUser";
import { CircleUser, Home, Info, UploadCloud } from "lucide-react";
import { NavLink } from "./nav";

export const MobileBottomNav = async () => {
  const user = await getAuthUser();

  return (
    <main
      className="md:hidden fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 
    backdrop-blur-md bg-white/30 border border-white/20 shadow-lg 
    rounded-xl px-5 h-16 w-full  flex items-center justify-between"
    >
      <ul className="flex justify-between items-center w-full gap-3">
        <li>
          <NavLink href="/" label={<Home />} />
        </li>
        <li>
          <NavLink href="/about" label={<Info />} />
        </li>
        {user && (
          <li>
            <NavLink href="/upload" label={<UploadCloud />} />
          </li>
        )}
        <li>
          <NavLink href="/contact" label={<CircleUser />} />
        </li>
      </ul>
    </main>
  );
};
