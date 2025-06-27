"use server";

import { connectDB } from "@/lib/connect";
import { getAuthUser } from "@/lib/getUser";
import { Planner } from "@/models/planner";
import { Upload } from "@/models/upload";
import { User } from "@/models/user";
import { DeleteState } from "@/types/rules";
import sendEmail from "@/utils/sendEmail";
import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

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
    await Planner.findOneAndDelete({ uploadId: uploadId });

    if (!upload) {
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

export const completePlanner = async (
  state: DeleteState | null,
  formData: FormData
) => {
  try {
    const plannerId = formData.get("plannerId");

    if (!plannerId || typeof plannerId !== "string") {
      return {
        message: "Invalid upload ID",
        errors: { plannerId: "planner ID is required" },
      };
    }

    console.log("plannerId", plannerId);

    await connectDB();
    const planner = await Planner.findById(plannerId).populate("userId");
    const findUser = planner?.userId;

    const user = await User.findById(findUser?._id.toString());

    // console.log(planner);

    if (!planner) return null;

    planner.status = "completed";
    planner.isCompleted = true;
    await planner.save();

    // send an email

    sendEmail({
      to: user.email,
      subject: "Planner Completed",
      template: "genericEmail",
      context: {
        subject: "Planner Completed",
        header: `Congratulations, ${user.fullname}!`,
        body: `Your study planner for ${planner?.fileName} has been successfully completed. We hope you enjoyed your study session.`,
        ctaText: "View Planner",
        ctaLink: `https://automated-study-planner.vercel.app/planner?uploadId=${planner.uploadId}`,
        logoUrl:
          "https://res.cloudinary.com/dwsc0velt/image/upload/v1750507488/Automated_study_planner/StudyMate-Photoroom_hyhgtl.png",
        fullname: user.fullname,
        date: new Date().getFullYear(),
      },
    }).catch((error) => {
      console.log("Planner Completed Email", error);
      // Don't throw error, just log it
    });

    return { message: "Planner completed successfully" };
    // redirect("/completed-planner")
  } catch (error) {
    console.log(error);
    return {
      message: "Failed to complete planner",
      errors: { uploadId: "An error occurred while completing planner" },
    };
  }
  // redirect("/completed-plans")
};


export const getUserPlanner = async () => {
  const user = await getAuthUser();

  try {
    await connectDB();
    const uploads = await Planner.find({ userId: user?.userId }).sort({
      createdAt: -1,
    });
    return uploads; // console.log(uploads);
  } catch (error) {
    console.log(error);
  }
};