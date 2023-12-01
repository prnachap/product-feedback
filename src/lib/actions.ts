"use server";

import CommentModel from "@/models/comment.model";
import FeedbackModel, { IFeedbackModel } from "@/models/feedback.model";
import { isEmpty } from "lodash";
import { revalidatePath } from "next/cache";
import { initializeDB } from "./initializeDB";

export async function addComments({
  comments,
  feedbackId,
}: {
  comments: string;
  feedbackId: string;
}) {
  try {
    await initializeDB();
    const feedback = await FeedbackModel.findOne<IFeedbackModel>({
      _id: feedbackId,
    });

    if (isEmpty(feedback)) {
      throw new Error(`${feedbackId} not found`);
    }
    const comment = await CommentModel.create({
      content: comments,
      user: "624271eda7e9284035913aa6",
    });
    feedback.comments.unshift(comment.id);
    await feedback.save();
    revalidatePath(`/feedback/${feedbackId}`);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: "Failed to add comment, Try again" };
  }
}
