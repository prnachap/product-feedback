"use server";

import { ERROR_MESSAGES } from "@/constants/errorMessages";
import CommentModel, { ICommentModel } from "@/models/comment.model";
import FeedbackModel, { IFeedbackModel } from "@/models/feedback.model";
import UserModel, { IUserModel } from "@/models/user.model";
import { findUser, updateUser } from "@/services/user.service";
import { deleteToken, findToken } from "@/services/verification.service";
import { sendVerificationEmail } from "@/utils/mail";
import { generateVerificationToken } from "@/utils/verificationToken";
import bcrypt from "bcryptjs";
import { gte, isEmpty, isEqual } from "lodash";
import { ObjectId } from "mongodb";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { FeedbackType } from "../..";
import { signIn, signOut } from "../../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../../route";
import initializeDB from "./initializeDB";
import clientPromise from "./mongodb";
import {
  CreateFeedbackSchema,
  LoginFormSchema,
  RegisterFormSchema,
} from "./schema";

type Fields = z.infer<typeof LoginFormSchema>;
type FormState<T extends Record<string, any>> = {
  errors: Partial<Record<keyof T, string[]>> | null;
  status: "error" | "success" | null;
  formError: string | null;
};
type LoginFormState = FormState<Fields>;
type RegisterFormFields = z.infer<typeof RegisterFormSchema>;
type RegisterFormState = FormState<RegisterFormFields>;

type CreateFeedbackFormFields = z.infer<typeof CreateFeedbackSchema>;
type CreateFeedbackFormState = FormState<CreateFeedbackFormFields>;

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

export const createFeedback = async (
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
    const user = await UserModel.findOne<IUserModel>({
      _id: "624271eda7e9284035913aa6",
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
    const user = await UserModel.findOne<IUserModel>({
      _id: "624271eda7e9284035913aa6",
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

export const loginAction = async (
  prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> => {
  const validatedFields = LoginFormSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      status: "error",
      formError: null,
    };
  }
  const { email, password } = validatedFields.data;
  const existingUser = await findUser({ email });
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      errors: null,
      status: "error",
      formError: "Invalid Credentials",
    };
  }

  if (!existingUser.emailVerified) {
    await generateVerificationToken(existingUser.email);
    const token = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(existingUser.email, token);
    return {
      errors: null,
      status: "success",
      formError: "Confirmation email sent",
    };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return {
      errors: null,
      status: "success",
      formError: null,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errors: null,
            status: "error",
            formError: "Invalid Credentials",
          };
        default:
          return {
            errors: null,
            status: "error",
            formError: "Something went wrong. Please try again.",
          };
      }
    }
    throw error;
  }
};

export const registerAction = async (
  prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> => {
  const validatedFields = RegisterFormSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      status: "error",
      formError: null,
    };
  }
  const { name, email, password, username } = validatedFields.data;
  try {
    await initializeDB();
    const existingUser = await UserModel.findOne({ email });
    if (!isEmpty(existingUser)) {
      return {
        errors: null,
        status: "error",
        formError: "User Already Exists",
      };
    }
    const user = await UserModel.create({ name, username, email, password });
    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    await user.save();
    const token = await generateVerificationToken(user.email);
    await sendVerificationEmail(user.email, token);
    return {
      errors: null,
      status: "success",
      formError: "Confirmation email sent",
    };
  } catch (error) {
    return {
      errors: null,
      status: "error",
      formError: "Something went wrong. Please try again.",
    };
  }
};

export const logoutAction = async () => {
  await signOut();
};

export const verifyEmailAction = async (
  token: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const existingToken = await findToken({ token });
    const existingUser = await findUser({ email: existingToken?.email });

    if (!existingToken?.token) {
      console.log("existingTokenwitjinss", existingToken);
      return { success: false, message: "Invalid token" };
    }
    if (!isEqual(existingToken?.token, token)) {
      return { success: false, message: "Invalid token" };
    }
    if (new Date(existingToken?.expiry) < new Date()) {
      return {
        success: false,
        message: "Token has expired. Please request a new one",
      };
    }
    if (!existingUser) {
      return { success: false, message: "Invalid email" };
    }
    await updateUser(
      { email: existingUser.email },
      { emailVerified: new Date(), email: existingToken.email },
      { upsert: true }
    );
    await deleteToken({ token: existingToken.token });
    return { success: true, message: "email verified" };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong. Please try again",
    };
  }
};
