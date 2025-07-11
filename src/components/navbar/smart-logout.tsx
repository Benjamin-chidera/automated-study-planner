"use client";
import React from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { logout } from "@/app/actions/auth";
import { signOut } from "next-auth/react";

const SmartLogout = () => {
  // const { status } = useSession();
  // console.log(status);

  const handleSignout = async () => {
    // e.preventDefault();
    try {
      // Run both signouts (can run in parallel)
      await Promise.all([
        signOut({ redirect: false }), // prevent automatic redirect
        logout(),
      ]);
      // Redirect manually after both finish
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      {" "}
      <form action={handleSignout}>
        <button className="w-full">
          <DropdownMenuItem className="bg-white text-black font-bold cursor-pointer">
            Logout
          </DropdownMenuItem>
        </button>
      </form>
    </div>
  );
};

export default SmartLogout;
