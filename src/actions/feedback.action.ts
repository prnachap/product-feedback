"use server";

import { MESSAGES } from "@/constants/messages";
import clientPromise from "@/lib/mongodb";
import { mongooseConnect } from "@/lib/mongoose";
import CommentModel, { ICommentModel } from "@/models/comment.model";
import FeedbackModel, { IFeedbackModel } from "@/models/feedback.model";
import UserModel, { IUserModel } from "@/models/user.model";
import { CreateFeedbackSchema } from "@/schema/feedback.schema";
import { gte, isEmpty, isEqual } from "lodash";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { FeedbackType } from "../..";
import { auth } from "../../auth";

type FormState<T extends Record<string, any>> = {
  errors: Partial<Record<keyof T, string[]>> | null;
  status: "error" | "success" | null;
  formError: string | null;
};

type CreateFeedbackFormFields = z.infer<typeof CreateFeedbackSchema>;
type CreateFeedbackFormState = FormState<CreateFeedbackFormFields>;

/**
 * Adds comments to a feedback.
 *
 * @param {Object} params - The parameters for adding comments.
 * @param {string} params.comments - The comments to be added.
 * @param {string} params.feedbackId - The ID of the feedback to add comments to.
 * @returns {Promise<{ success: boolean, error: string | null }>} - A promise that resolves to an object indicating the success status and any error message.
 */
export async function addComments({
  comments,
  feedbackId,
}: {
  comments: string;
  feedbackId: string;
}): Promise<{ success: boolean; error: string | null }> {
  try {
    await mongooseConnect();
    const session = await auth();
    const userId = session?.user.id;
    const feedback = await FeedbackModel.findOne<IFeedbackModel>({
      _id: feedbackId,
    });

    const user = await UserModel.findOne<IUserModel>({
      _id: userId,
    });

    if (isEmpty(feedback)) {
      throw new Error(`${feedbackId} not found`);
    }

    if (isEmpty(user)) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    const comment = await CommentModel.create({
      content: comments,
      user: user.id,
    });
    feedback.comments.unshift(comment.id);
    await feedback.save();
    revalidatePath(`/feedback/${feedbackId}`);
    return { success: true, error: null };
  } catch (error: unknown) {
    return { success: false, error: MESSAGES.ADD_COMMENTS_ERROR };
  }
}

/**
 * Posts replies to a comment.
 * @param feedbackId - The ID of the feedback.
 * @param commentId - The ID of the comment.
 * @param content - The content of the reply.
 * @returns An object indicating the success status and error message (if any).
 */
export const postRepliesToComment = async ({
  feedbackId,
  commentId,
  content,
}: {
  feedbackId: string;
  commentId: string;
  content: string;
}): Promise<{ success: boolean; error: string | null }> => {
  try {
    await mongooseConnect();
    const session = await auth();
    const userId = session?.user.id;

    const feedback = await FeedbackModel.findById<FeedbackType>(
      { _id: feedbackId },
      { lean: false }
    );
    const user = await UserModel.findOne<IUserModel>({
      _id: userId,
    });

    const comment = await CommentModel.findById<ICommentModel>({
      _id: commentId,
    });

    if (isEmpty(feedback)) {
      throw new Error(MESSAGES.FEEDBACK_NOT_FOUND);
    }
    if (isEmpty(user)) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }
    if (isEmpty(comment)) {
      throw new Error(MESSAGES.COMMENT_NOT_FOUND);
    }

    const reply = await CommentModel.create({ content, user: user.id });
    comment.comments.unshift(reply._id);
    await comment.save();
    revalidatePath(`/feedback/${feedbackId}`);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: MESSAGES.POST_REPLY_ERROR };
  }
};

/**
 * Adds likes to a feedback.
 * @param feedbackId The ID of the feedback to add likes to.
 * @returns An object indicating the success status and any error message.
 */
export const addLikes = async (
  feedbackId: string
): Promise<{ success: boolean; error: string | null }> => {
  try {
    await mongooseConnect();
    const session = await auth();
    const userId = session?.user.id;
    const feedback = await FeedbackModel.findOne<IFeedbackModel>({
      _id: feedbackId,
    }).select("upvotes");
    const user = await UserModel.findOne<IUserModel>({
      _id: userId,
    });

    if (!feedback) {
      throw new Error(MESSAGES.FEEDBACK_NOT_FOUND);
    }

    if (!user) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    const userIndex = feedback?.upvotes.findIndex((user) => {
      return isEqual(user.toString(), userId);
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
    return { success: false, error: MESSAGES.ADD_UPVOTES_ERROR };
  }
};

/**
 * Creates feedback with the provided status, category, form state, and form data.
 *
 * @param status - The status of the feedback.
 * @param category - The category of the feedback.
 * @param _state - The form state for creating feedback.
 * @param formData - The form data containing the feedback details.
 * @returns A promise that resolves to the updated form state after creating the feedback.
 */
export const createFeedback = async (
  status: string,
  category: string,
  _state: CreateFeedbackFormState,
  formData: FormData
): Promise<CreateFeedbackFormState> => {
  const title = formData.get("title");
  const description = formData.get("description");
  const session = await auth();
  const userId = session?.user.id;

  const validatedFields = CreateFeedbackSchema.safeParse({
    title,
    category: category,
    status: status,
    description,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      status: "error",
      formError: null,
    };
  }

  try {
    const user = await UserModel.findOne<IUserModel>({
      _id: userId,
    });
    await FeedbackModel.create<IFeedbackModel>({
      ...validatedFields.data,
      user,
    });
  } catch (error: any) {
    return {
      errors: null,
      formError: "Failed to Create Feedback.",
      status: "error",
    };
  }
  revalidatePath("/feedback");
  redirect("/feedback");
};

/**
 * Edits the feedback with the specified ID.
 *
 * @param feedbackId - The ID of the feedback to edit.
 * @param status - The new status of the feedback.
 * @param category - The new category of the feedback.
 * @param _state - The current state of the feedback form.
 * @param formData - The form data containing the updated feedback details.
 * @returns A promise that resolves to the updated state of the feedback form.
 */
export const editFeedback = async (
  feedbackId: string,
  status: string,
  category: string,
  _state: CreateFeedbackFormState,
  formData: FormData
): Promise<CreateFeedbackFormState> => {
  const title = formData.get("title");
  const description = formData.get("description");

  const validatedFields = CreateFeedbackSchema.safeParse({
    title,
    category: category,
    status: status,
    description,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      status: "error",
      formError: null,
    };
  }

  try {
    await mongooseConnect();
    const session = await auth();
    const userId = session?.user.id;
    const user = await UserModel.findOne<IUserModel>({
      _id: userId,
    });
    await FeedbackModel.updateOne<IFeedbackModel>(
      { _id: feedbackId },
      {
        ...validatedFields.data,
        user,
      }
    );
  } catch (error: any) {
    return {
      errors: null,
      formError: "Failed to Create Feedback.",
      status: "error",
    };
  }
  revalidatePath(`/feedback/${feedbackId}`);
  revalidatePath(`/feedback`);
  redirect(`/feedback/${feedbackId}`);
};

/**
 * Deletes a feedback and its associated comments from the database.
 * @param feedbackId - The ID of the feedback to delete.
 * @throws Error if the deletion fails.
 */
export const deleteFeedback = async (feedbackId: string) => {
  try {
    const client = await clientPromise;
    const collection = client.db("product-feedback").collection("feedbacks");
    const data = await collection
      .aggregate<{ _id: ObjectId; comments: Array<{ _id: ObjectId }> }>([
        { $match: { _id: new ObjectId(feedbackId) } },
        {
          $graphLookup: {
            from: "comments",
            startWith: "$comments",
            connectFromField: "comments",
            connectToField: "_id",
            as: "comments",
          },
        },
        {
          $project: {
            comments: { _id: 1 },
          },
        },
      ])
      .next();

    await collection.deleteOne({ _id: new ObjectId(feedbackId) });

    if (data && data?.comments?.length > 0) {
      const commentIds = data.comments.map((comment) => comment._id);
      await CommentModel.deleteMany({
        _id: {
          $in: commentIds,
        },
      });
      await UserModel.updateMany(
        {},
        {
          $pull: {
            posts: {
              _id: { $in: commentIds },
            },
          },
        }
      );
    }
  } catch (error) {
    throw new Error("failed to delete feedback");
  }

  revalidatePath(`/feedback`);
  redirect(`/feedback`);
};
