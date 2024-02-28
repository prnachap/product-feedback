import mongoose, { Document, model, models } from "mongoose";

export interface IUser {
  name: string;
  username?: string;
  email: string;
  password?: string;
  emailVerified?: boolean;
  image?: string;
  userRole: "user" | "admin";
  posts?: string[];
  accounts?: string[];
  passwordResetToken: string | null;
  passwordResetTokenExpires: Date | null;
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
    userRole: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    passwordResetToken: {
      type: String,
      required: true,
      default: null,
    },
    passwordResetTokenExpires: {
      type: Date,
      required: true,
      default: null,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
    accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
  },
  { timestamps: true }
);

const UserModel =
  models?.User<IUserModel> || model<IUserModel>("User", UserSchema);
export default UserModel;
