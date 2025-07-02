/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { connectDB } from "@/lib/connect";
import { LoginSchema, RegistrationsSchema } from "@/lib/rules";
import { createSession, deleteSession } from "@/lib/session";
import { User } from "@/models/user";
import type { LoginErrors, RegisterErrors } from "@/types/register";
import type { FormState } from "@/types/rules";
import sendEmail from "@/utils/sendEmail";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

// Environment variable validation
const validateEmailConfig = () => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn(
      "Email environment variables not set. Email functionality will be disabled."
    );
    return false;
  }
  return true;
};

// Helper function for logging errors
const logError = (context: string, error: any) => {
  console.error(`[${context}] Error:`, {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
  });
};

export const register = async (
  state: FormState,
  formData: FormData
): Promise<{ errors?: RegisterErrors; email?: string }> => {
  try {
    const fullname = formData.get("fullname")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    const validatedFields = RegistrationsSchema.safeParse({
      fullname,
      email,
      password,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        email,
      };
    }

    await connectDB();

    // check if email already exists
    const user = await User.findOne({ email });

    if (user) {
      return {
        errors: { email: ["Email already exists"] },
        email,
      };
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // user is authenticated, create a session for them
    await createSession(
      savedUser._id.toString(),
      savedUser.fullname,
      savedUser.email,
      savedUser.image
    );

    // Send welcome email (non-blocking)
    if (validateEmailConfig()) {
      sendEmail({
        to: email,
        subject: "Welcome to Automated Study Planner!",
        template: "welcomeEmail",
        context: {
          subject: "Welcome to Automated Study Planner!",
          header: `Welcome, ${fullname}!`,
          body: "Thank you for joining Automated Study Planner! We're excited to have you on board. Get started by uploading your study materials.",
          ctaText: "Get Started",
          ctaLink: "https://automated-study-planner.vercel.app/upload",
          logoUrl:
            "https://res.cloudinary.com/dwsc0velt/image/upload/v1750507488/Automated_study_planner/StudyMate-Photoroom_hyhgtl.png",
          fullname,
          date: new Date().getFullYear(),
        },
      }).catch((error) => {
        logError("Welcome Email", error);
        // Don't throw error, just log it
      });
    }
  } catch (error) {
    logError("Registration", error);
    return { errors: { general: ["Something went wrong. Please try again."] } };
  }

  // Move redirect outside of try-catch
  redirect("/upload");
};

export const login = async (
  state: FormState,
  formData: FormData
): Promise<{ errors?: LoginErrors; email?: string }> => {
  try {
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    const validatedFields = LoginSchema.safeParse({
      email,
      password,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        email,
      };
    }

    // connect to database
    await connectDB();

    // check if email exists
    const user = await User.findOne({ email });

    if (!user) {
      return {
        errors: { email: ["Email does not exist"] },
        email,
      };
    }

    // check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return {
        errors: { password: ["Password is incorrect"] },
        email,
      };
    }

    // user is authenticated, create a session for them
    await createSession(
      user._id.toString(),
      user.fullname,
      user.email,
      user.image
    );
  } catch (error) {
    logError("Login", error);
    return { errors: { general: ["Something went wrong. Please try again."] } };
  }

  // Move redirect outside of try-catch
  redirect("/upload");
};

// logout
export async function logout() {
  try {
    await deleteSession();
  } catch (error) {
    logError("Logout", error);
  }
  redirect("/login");
}
