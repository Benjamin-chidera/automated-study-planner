import React from "react";
import Upload from "./uploads";
import { getAuthUser } from "@/lib/getUser";

const Uploads = async () => {
  const user = await getAuthUser();

  return (
    <div>
      <Upload user={user?.userId} />
    </div>
  );
};

export default Uploads;
