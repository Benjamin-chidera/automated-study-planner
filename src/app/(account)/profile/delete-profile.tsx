import { ProfileDeleted } from "@/components/profile/delete/profile-deleted";
import { getAuthUser } from "@/lib/getUser";
import React from "react";

const DeleteProfile = async () => {
  const user = await getAuthUser();

  return (
    <main className=" mt-20">
      <h1 className="text-xl font-bold">Danger Zone</h1>

      <ProfileDeleted user={user} />
    </main>
  );
};

export default DeleteProfile;
 