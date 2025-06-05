"use server";

import { getAuthUser } from "@/lib/getUser";
import { Upload } from "@/models/upload";

export const getMyUploadedStudyMaterials = async () => {
  const user = await getAuthUser();

  try {
    const uploads = await Upload.find({ userId: user?.userId });
    return uploads; // console.log(uploads);
  } catch (error) {
    console.log(error);
  }
};

export const getMaterialDetail = async (id: string) => {
  try {
    const upload = await Upload.findById(id);
    return upload; // console.log(upload);
  } catch (error) {
    console.log(error);
  }
};
