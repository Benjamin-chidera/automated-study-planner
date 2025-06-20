"use server";

import { connectDB } from "@/lib/connect";
import { getAuthUser } from "@/lib/getUser";
import { deleteSession } from "@/lib/session";
import { Planner } from "@/models/planner";
import { Upload } from "@/models/upload";
import { User } from "@/models/user";
import { DeleteState } from "@/types/rules";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

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

export const deleteUser = async (
  state: DeleteState | null,
  formData: FormData
): Promise<DeleteState | null> => {
  try {
    const userId = formData.get("userId");

    const user = await User.findByIdAndDelete(userId);
    const planner = await Planner.deleteMany({ userId: userId });
    const uploads = await Upload.deleteMany({ userId: userId });

    if (!user || !planner || !uploads) {
      return {
        message: "User not found",
        errors: { userId: "No user found with this ID" },
      };
    }

    await deleteSession(); // ✅ This logs out the user

    redirect("/login");
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to delete upload",
      errors: { userId: "An error occurred while deleting" },
    };
  }
};
