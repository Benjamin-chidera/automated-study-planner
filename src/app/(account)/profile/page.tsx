// "use server";

import React from "react";
import Profile from "./profile";
import { UploadHistory } from "@/components/profile/upload-history";
import DeleteProfile from "./delete-profile";
import { getAuthUser } from "@/lib/getUser";
import Availability from "./availability";
import { getProfile } from "@/app/actions/profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile - StudyM8",
  description:
    "Manage your StudyM8 account settings, preferences, and availability.",
  keywords: [
    "StudyM8 profile",
    "study planner profile settings",
    "update availability",
    "study preferences",
  ],
  openGraph: {
    title: "Your Profile - StudyM8",
    description:
      "Customize your StudyM8 profile and set your study availability.",
    url: "https://studym8.vercel.app/profile",
    siteName: "StudyM8",
    images: [
      {
        url: "https://studym8.vercel.app/profile-og.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manage Your StudyM8 Profile",
    description:
      "Control your personal study settings and availability on your StudyM8 profile.",
    images: ["https://studym8.vercel.app/profile-og.png"],
  },
};

const ProfilePage = async () => {
  const user = await getAuthUser();
  const userProfile = await getProfile(user?.userId || "");

  // console.log(userProfile);

  return (
    <main>
      <Profile user={user} userProfile={userProfile} />

      <UploadHistory />

      <Availability user={user} userProfile={userProfile} />

      <DeleteProfile />
    </main>
  );
};

export default ProfilePage;
