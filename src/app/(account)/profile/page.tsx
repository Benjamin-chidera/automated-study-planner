"use server";

import React from "react";
import Profile from "./profile";
import { UploadHistory } from "@/components/profile/upload-history";
import DeleteProfile from "./delete-profile";
import { getAuthUser } from "@/lib/getUser";
import Availability from "./availability";
import { getProfile } from "@/app/actions/profile";

const ProfilePage = async () => {
  const user = await getAuthUser();
  const userProfile = await getProfile(user?.userId || "");

  console.log(userProfile);

  return (
    <main>
      <Profile user={user} userProfile={userProfile} />

      <UploadHistory />

      <Availability />

      <DeleteProfile />
    </main>
  );
};

export default ProfilePage;
