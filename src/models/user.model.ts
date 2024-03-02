import mongoose, { Document, model, models } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password?: string;
  emailVerified?: Date;
  image?: string;
  userRole: "user" | "admin";
  posts?: mongoose.Types.ObjectId[];
  accounts?: mongoose.Types.ObjectId;
  passwordResetToken?: string | null;
  passwordResetTokenExpires?: Date | null;
  isTwoFactorEnabled?: boolean;
  twoFactorId?: mongoose.Types.ObjectId;
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
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    emailVerified: {
      type: Date,
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
      default: null,
    },
    passwordResetTokenExpires: {
      type: Date,
      default: null,
    },
    isTwoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
    accounts: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
    twoFactorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TwoFactorConfirmation",
    },
  },
  { timestamps: true }
);

const UserModel =
  models?.User<IUserModel> || model<IUserModel>("User", UserSchema);
export default UserModel;
