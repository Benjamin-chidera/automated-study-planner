// src/app/actions/profile.ts
"use server";

import { DeleteState, FormStates } from "@/types/rules";
import { User } from "@/models/user";
import { connectDB } from "@/lib/connect";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import { Planner } from "@/models/planner";
import { Upload } from "@/models/upload";
import sendEmail from "@/utils/sendEmail";

interface userProps {
  fullname?: string | undefined;
  email?: string | undefined;
  password?: string;
  imageUrl?: string | undefined;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function editProfile(
  prevState: FormStates | undefined,
  formData: FormData
): Promise<FormStates> {
  try {
    const fullname = formData.get("fullname")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const oldPassword = formData.get("oldPassword")?.toString();
    const newPassword = formData.get("newPassword")?.toString();
    const image = formData.get("image");
    const userId = formData.get("userId")?.toString();

    if (!userId) return { message: "Missing user ID" };

    await connectDB();

    const user = await User.findById(userId);
    if (!user) {
      return {
        errors: { user: "User not found" },
        message: "Update failed",
      };
    }

    // Handle image upload
    let imageUrl = "";
    if (image instanceof File && image.size > 0) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadRes = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "Automated_study_planner" },
            (err, result) => {
              if (err) return reject(err);
              resolve(result);
            }
          )
          .end(buffer);
      });

      imageUrl = (uploadRes as { secure_url: string }).secure_url;
    }

    const updateFields: userProps = {
      ...(fullname && { fullname }),
      ...(email && { email }),
      ...(imageUrl && { imageUrl }),
    };

    // If new password is provided, validate and hash it
    if (newPassword) {
      const isMatch = await bcrypt.compare(oldPassword || "", user.password);
      if (!isMatch) {
        return {
          errors: { oldPassword: "Incorrect current password" },
          message: "Password update failed",
        };
      }

      updateFields.password = await bcrypt.hash(newPassword, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    console.log(updatedUser);

    return {
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.error("Edit profile error:", error);
    return {
      message: "An error occurred while updating the profile",
    };
  }
}

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

    // Send an email to the user confirming their account deletion
    await sendEmail({
      to: user.email,
      subject: "You've deleted your account",
      template: "genericEmail.hbs",
      context: {
        subject: "You've deleted your account!",
        header: `Hey, ${user.fullname}!`,
        body: "We're sorry to see you go. We hope you come back soon.",
        ctaText: "Join us again",
        ctaLink: "https://automated-study-planner.vercel.app/register",
        logoUrl:
          "https://res.cloudinary.com/dwsc0velt/image/upload/v1750494594/Automated_study_planner/StudyMate_u8jve9.png", // Replace with your logo URL
        // fullname: user.fullname,
        date: new Date().getFullYear(), // Replace with current year
      },
    });

    // redirect("/login");
    return {
      message: "Success",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to delete upload",
      errors: { userId: "An error occurred while deleting" },
    };
  }
};
