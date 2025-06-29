/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { connectDB } from "@/lib/connect";
import { ContactFormSchema } from "@/lib/rules";
import { ContactModel } from "@/models/contact";
import { ContactFormState } from "@/types/rules";
import sendEmail from "@/utils/sendEmail";

export const ContactForm = async (
  state: ContactFormState | null,
  formData: FormData
): Promise<ContactFormState | null> => {
  const name = formData.get("name")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const subject = formData.get("subject")?.toString() || "";
  const message = formData.get("message")?.toString() || "";

  const validatedFields = ContactFormSchema.safeParse({
    name,
    email,
    subject,
    message,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      name,
      email,
      subject,
      message,
    };
  }

  await connectDB();

  // Save to DB
  const contact = new ContactModel({
    name,
    email,
    subject,
    message,
  });
  await contact.save();

  // Send confirmation to user
  await sendEmail({
    to: process.env.GMAIL_USER!,
    subject: "We've received your message!",
    template: "contactEmail",
    context: {
      subject: "We've received your message!",
      fullname: name,
      ctaText: "Get Started",
      logoUrl:
        "https://res.cloudinary.com/dwsc0velt/image/upload/v1750507488/Automated_study_planner/StudyMate-Photoroom_hyhgtl.png",
      ctaLink: "https://automated-study-planner.vercel.app",
      date: new Date().getFullYear(),
    },
  });

  return { message: "Thank you for contacting us!" };
};
