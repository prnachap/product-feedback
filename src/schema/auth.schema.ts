import { z } from "zod";

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

export const ResetFormSchema = z.object({
  email: z.string({ required_error: "email is required" }).email(),
});

export const ResetPasswordSchema = z.object({
  password: z
    .string({ required_error: "Minimum 6 characters required" })
    .min(8),
});
