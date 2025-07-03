"use client";

import React, { useActionState, useEffect } from "react";
import { Button } from "../ui/button";
import { deleteUploadedMaterial } from "@/app/actions/study-materials";
import { toast } from "sonner";

export const DeleteHistory = ({ uploadId }: { uploadId: string }) => {
  const [state, action, isPending] = useActionState(
    deleteUploadedMaterial,
    null // initial state is `null`
  );

  //   console.log(state);

  useEffect(() => {
    if (state?.message) {
      if (state.errors) {
        toast.error(state.message);
      } else {
        toast.success(state.message);
      }
    }
  }, [state]);

  return (
    <div>
      {" "}
      <form action={action}>
        <input type="hidden" name="uploadId" value={uploadId} />
        {/* <input type="hidden" name="uploadId" defaultValue={uploadId.uploadId} /> */}
        <Button
          className="text-red-500 font-bold shadow-none cursor-pointer"
          disabled={isPending}
        >
          Delete
        </Button>
      </form>
    </div>
  );
};
