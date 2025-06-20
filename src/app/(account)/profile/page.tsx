"use server";

import React from "react";
import Profile from "./profile";
import { UploadHistory } from "@/components/profile/upload-history";
import DeleteProfile from "./delete-profile";
import { getAuthUser } from "@/lib/getUser";
import Availability from "./availability";

const ProfilePage = async () => {
  const user = await getAuthUser();

  return (
    <main>
      <Profile user={user} />

      <UploadHistory />

      <Availability />

      <DeleteProfile/>
    </main>
  );
};

export default ProfilePage;
