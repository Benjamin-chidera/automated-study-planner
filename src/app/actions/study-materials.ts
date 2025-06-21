"use server";

import { connectDB } from "@/lib/connect";
import { getAuthUser } from "@/lib/getUser";
import { Planner } from "@/models/planner";
import { Upload } from "@/models/upload";
import { DeleteState } from "@/types/rules";
import { revalidatePath } from "next/cache";

export const getMyUploadedStudyMaterials = async () => {
  const user = await getAuthUser();

  try {
    await connectDB();
    const uploads = await Upload.find({ userId: user?.userId }).sort({
      createdAt: -1,
    });
    return uploads; // console.log(uploads);
  } catch (error) {
    console.log(error);
  }
};

export const getMaterialDetail = async (id: string) => {
  try {
    await connectDB();
    const upload = await Upload.findById(id);

    if (!upload) return null;

    return JSON.parse(JSON.stringify(upload));
  } catch (error) {
    console.log(error);
  }
};

export const deleteUploadedMaterial = async (
  state: DeleteState | null,
  formData: FormData
): Promise<DeleteState | null> => {
  const uploadId = formData.get("uploadId");

  if (!uploadId || typeof uploadId !== "string") {
    return {
      message: "Invalid upload ID",
      errors: { uploadId: "Upload ID is required" },
    };
  }

  try {
    await connectDB();
    const upload = await Upload.findByIdAndDelete(uploadId);
    const planner = await Planner.findOneAndDelete({ uploadId: uploadId });

    if (!upload || !planner) {
      return {
        message: "Upload not found",
        errors: { uploadId: "No upload found with this ID" },
      };
    }

    revalidatePath("/profile");
    return { message: "Material deleted successfully" };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to delete upload",
      errors: { uploadId: "An error occurred while deleting" },
    };
  }
};

