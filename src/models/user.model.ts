import mongoose, { Document, model, models } from "mongoose";
import { IFeedbackModel } from "./feedback.model";

export interface IUser {
  name: string;
  username: string;
  email: string;
  password?: string;
  emailVerified?: boolean;
  image?: string;
  posts: IFeedbackModel["_id"][];
  accounts?: string[];
}

export interface IUserModel extends Document, IUser {
  createdAt: Date;
  updatedAt: Date;
}
const UserSchema = new mongoose.Schema<IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    emailVerified: {
      type: Date || Boolean,
    },
    image: {
      type: String,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
  },
  { timestamps: true }
);

const UserModel =
  models?.User<IUserModel> || model<IUserModel>("User", UserSchema);
export default UserModel;
