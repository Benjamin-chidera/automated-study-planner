"use client";

import { deleteUser } from "@/app/actions/study-materials";
import { SessionPayload } from "@/types/session";
import React, { useActionState } from "react";

interface ProfileProps {
  user: SessionPayload | undefined;
}

export const ProfileDeleted = ({ user }: ProfileProps) => {
  const [state, action, isPending] = useActionState(deleteUser, null);
  console.log(state);

  return (
    <div>
      <form action={action}>
        <input type="hidden" name="userId" value={user?.userId} />
        <button className="bg-red-200 hover:bg-red-700 text-red-700 hover:text-white hover:border-red-700 font-bold py-2 px-4 rounded mt-5 duration-500 cursor-pointer">
          {isPending ? "Deleting Account..." : " Delete Account"}
        </button>
      </form>
    </div>
  );
};
