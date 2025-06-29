import { z } from "zod";

export const RegistrationsSchema = z.object({
  fullname: z.string().nonempty({ message: "Fullname is required" }),
  email: z.string().email({ message: "Invalid email format" }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }).trim(),
  password: z.string().min(1, { message: "Password must not be empty" }).trim(),
});

export const ContactFormSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email format" }).trim(),
  subject: z.string().min(1, { message: "Subject must not be empty" }).trim(),
  message: z.string().min(1, { message: "Message must not be empty" }).trim(),
});
