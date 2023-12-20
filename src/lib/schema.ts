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
