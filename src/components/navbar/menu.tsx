"use client";

import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Menu = ({
  nav,
  key,
}: {
  nav: {
    href: string;
    label: string;
  };
  key: number;
}) => {
  const pathname = usePathname();

  return (
    <div>
      {" "}
      <Link href={nav.href} key={key} passHref>
        <DropdownMenuItem
          className={`cursor-pointer hover:bg-white hover:text-black hover:font-bold ${
            pathname === nav.href && "bg-white text-black font-bold"
          }`}
          asChild
        >
          <span>{nav.label}</span>
        </DropdownMenuItem>
      </Link>
    </div>
  );
};
