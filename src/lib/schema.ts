import { z } from "zod";

export const CommentFormSchema = z.object({
  comment: z
    .string()
    .min(1, "Can't be empty")
    .max(225, "max characters exceeded"),
});

export const CreateFeedbackSchema = z.object({
  title: z.string().min(3).max(100),
  category: z.string().min(1),
  status: z.string(),
  description: z.string().min(3).max(1000),
});
export const LoginFormSchema = z.object({
  email: z.string({ required_error: "email is required" }).email(),
  password: z
    .string({ required_error: "password is required" })
    .min(1, "password is required"),
});

export const RegisterFormSchema = z.object({
  name: z.string({ required_error: "Name is required" }).min(3).max(100),
  username: z
    .string({ required_error: "Username is required" })
    .min(3)
    .max(100),
  email: z.string({ required_error: "Email is required" }).email(),
  password: z
    .string({ required_error: "Minimum 6 characters required" })
    .min(8),
});
