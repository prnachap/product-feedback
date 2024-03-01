import { ObjectId } from "mongodb";
import { Document, Schema, model, models } from "mongoose";

export interface ITwoFactorConfirmation {
  email: string;
  token: string;
  expires: Date;
  userId: ObjectId;
}

export interface ITwoFactorConfirmationModel
  extends Document,
    ITwoFactorConfirmation {
  createdAt: Date;
  updatedAt: Date;
}

const TwoFactorConfirmationSchema = new Schema<ITwoFactorConfirmationModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
      type: String,
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const TwoFactorConfirmationModel =
  models?.TwoFactorConfirmation<ITwoFactorConfirmationModel> ||
  model<ITwoFactorConfirmationModel>(
    "TwoFactorConfirmation",
    TwoFactorConfirmationSchema
  );

export default TwoFactorConfirmationModel;
