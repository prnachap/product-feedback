"use server";

import { ERROR_MESSAGES } from "@/constants/errorMessages";
import CommentModel, { ICommentModel } from "@/models/comment.model";
import FeedbackModel, { IFeedbackModel } from "@/models/feedback.model";
import UserModel, { IUserModel } from "@/models/user.model";
import { gte, isEmpty, isEqual } from "lodash";
import { revalidatePath } from "next/cache";
import { FeedbackType } from "../..";
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

    const user = await UserModel.findOne<IUserModel>({
      _id: "624271eda7e9284035913aa6",
    });

    if (isEmpty(feedback)) {
      throw new Error(`${feedbackId} not found`);
    }

    if (isEmpty(user)) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const comment = await CommentModel.create({
      content: comments,
      user: user.id,
    });
    feedback.comments.unshift(comment.id);
    await feedback.save();
    revalidatePath(`/feedback/${feedbackId}`);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: ERROR_MESSAGES.ADD_COMMENTS_ERROR };
  }
}

export const postRepliesToComment = async ({
  feedbackId,
  commentId,
  content,
}: {
  feedbackId: string;
  commentId: string;
  content: string;
}) => {
  try {
    const feedback = await FeedbackModel.findById<FeedbackType>(
      { _id: feedbackId },
      { lean: false }
    );
    const user = await UserModel.findOne<IUserModel>({
      _id: "624271eda7e9284035913aa6",
    });

    const comment = await CommentModel.findById<ICommentModel>({
      _id: commentId,
    });

    if (isEmpty(feedback)) {
      throw new Error(ERROR_MESSAGES.FEEDBACK_NOT_FOUND);
    }
    if (isEmpty(user)) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }
    if (isEmpty(comment)) {
      throw new Error(ERROR_MESSAGES.COMMENT_NOT_FOUND);
    }

    const reply = await CommentModel.create({ content, user: user.id });
    comment.comments.unshift(reply._id);
    await comment.save();
    revalidatePath(`/feedback/${feedbackId}`);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: ERROR_MESSAGES.POST_REPLY_ERROR };
  }
};

export const addLikes = async (feedbackId: string) => {
  try {
    const feedback = await FeedbackModel.findOne<IFeedbackModel>({
      _id: feedbackId,
    }).select("upvotes");
    const user = await UserModel.findOne<IUserModel>({
      _id: "624271eda7e9284035913aa6",
    });

    if (!feedback) {
      throw new Error(ERROR_MESSAGES.FEEDBACK_NOT_FOUND);
    }

    if (!user) {
      throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const userIndex = feedback?.upvotes.findIndex((user) => {
      return isEqual(user.toString(), "624271eda7e9284035913aa6");
    });

    if (gte(userIndex, 0)) {
      feedback.upvotes.splice(userIndex, 1);
    } else {
      feedback.upvotes.push(user.id);
    }

    await feedback.save();
    revalidatePath(`/feedback/${feedbackId}`);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: ERROR_MESSAGES.ADD_UPVOTES_ERROR };
  }
};
