"use client";

import { deleteUser } from "@/app/actions/profile";
import { SessionPayload } from "@/types/session";
import React, { useActionState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";

interface ProfileProps {
  user: SessionPayload | undefined;
}

export const ProfileDeleted = ({ user }: ProfileProps) => {
  const [state, action, isPending] = useActionState(deleteUser, null);

  useEffect(() => {
    if (state?.message === "Success") {
      fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logout`, { method: "POST" }).then(() => {
        window.location.href = "/login";
      });
    }
  }, [state]);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-red-200 hover:bg-red-700 text-red-700 hover:text-white font-bold py-2 px-4 rounded mt-5 duration-500">
            Delete Account
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white p-5 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          {/* Only wrap the form around the action buttons */}
          <form action={action}>
            <input type="hidden" name="userId" value={user?.userId} />
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="mr-2 cursor-pointer border-red-700 hover:border-red-500"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-red-200 hover:bg-red-700 text-red-700 hover:text-white font-bold py-2 px-4 rounded duration-500"
              >
                {isPending ? "Deleting..." : "Delete Account"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
