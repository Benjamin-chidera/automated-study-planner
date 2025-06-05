"use server";

import { connectDB } from "@/lib/connect";
import { LoginSchema, RegistrationsSchema } from "@/lib/rules";
import { createSession, deleteSession } from "@/lib/session";
import { User } from "@/models/user";
import { FormState } from "@/types/rules";

import bcrypt from "bcrypt";
import { redirect } from "next/navigation";

export const register = async (state: FormState, formData: FormData) => {
  try {
    const validatedFields = RegistrationsSchema.safeParse({
      fullname: formData.get("fullname"),
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        email: formData.get("email"),
      };
    }

    const { fullname, email, password } = validatedFields.data;
    // connect to database
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

    // create a session for the user
    // console.log(savedUser._id.toString());

    // user is authenticated, create a session for them
    await createSession(savedUser._id.toString(), savedUser.fullname);
  } catch (error) {
    console.error(error);
    return { errors: { general: ["Something went wrong. Please try again."] } };
  }
  return redirect("/upload");
};

export const login = async (state: FormState, formData: FormData) => {
  try {
    const validatedFields = LoginSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        email: formData.get("email"),
      };
    }

    const { email, password } = validatedFields.data;

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
        password,
      };
    }

    // user is authenticated, create a session for them
    await createSession(user._id.toString(), user.fullname);
  } catch (error) {
    console.error(error);
    return { errors: { general: ["Something went wrong. Please try again."] } };
  }
  return redirect("/upload");
};

// logout
export async function logout() {
  await deleteSession();
  return redirect("/login");
}
