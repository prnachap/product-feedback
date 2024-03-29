import mongoose, { Document, model, models } from "mongoose";
import { ICommentModel } from "./comment.model";
import { IUserModel } from "./user.model";

export interface IFeedback {
  title: string;
  category: string;
  description: string;
  status: string;
  upvotes: IUserModel["_id"][];
  user: IUserModel["_id"];
  comments: ICommentModel["_id"][];
}

export interface IFeedbackModel extends Document, IFeedback {
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

FeedbackSchema.pre(/^find|save/, function (next) {
  //@ts-ignore
  this.populate([
    { path: "user", select: "username name" },
    { path: "comments", select: "content" },
  ]);
  next();
});

const FeedbackModel =
  models.Feedback<IFeedbackModel> ||
  model<IFeedbackModel>("Feedback", FeedbackSchema);

export default FeedbackModel;
