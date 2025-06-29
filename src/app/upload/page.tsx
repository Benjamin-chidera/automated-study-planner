import React from "react";
import Upload from "./uploads";
import { getAuthUser } from "@/lib/getUser";
import { getProfile } from "../actions/profile";

const Uploads = async () => {
  const user = await getAuthUser();
  const userUploadCount = await getProfile(user?.userId || "");

  return (
    <div>
      <Upload user={user?.userId} count={userUploadCount?.uploadCount ?? 0} />
    </div>
  );
};

export default Uploads;
