import React from "react";
import { NavLink } from "./nav";
import { getAuthUser } from "@/lib/getUser";
import { CircleUser, HouseIcon, InfoIcon, Upload } from "lucide-react";

export const MobileBottomNav = async () => {
  const user = await getAuthUser();

  return (
    <main className="md:hidden fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 bg-[#FFFFFF] rounded shadow-lg flex justify-between px-5 items-center h-16 mx-auto border w-full border-gray-200">
      <ul className="flex justify-between items-center gap-3">
        <li>
          <NavLink href="/" label={<HouseIcon />} />
        </li>
        <li>
          <NavLink href="/about" label={<InfoIcon />} />
        </li>
        {user && (
          <li>
            <NavLink href="/upload" label={<Upload />} />
          </li>
        )}
        <li>
          <NavLink href="/contact" label={<CircleUser />} />
        </li>
      </ul>
    </main>
  );
};
