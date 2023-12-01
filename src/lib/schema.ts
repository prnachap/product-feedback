import { z } from "zod";

export const CommentFormSchema = z.object({
  comment: z
    .string()
    .min(1, "Can't be empty")
    .max(225, "max characters exceeded"),
});
