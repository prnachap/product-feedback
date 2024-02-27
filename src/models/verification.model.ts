import { Schema, model, models } from "mongoose";

export interface IVerification {
  email: string;
  token: string;
  expiry: Date;
}

export interface IVerificationModel extends Document, IVerification {
  createdAt: Date;
  updatedAt: Date;
}

const VerificationSchema = new Schema<IVerificationModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const VerificationModel =
  models?.Verification<IVerificationModel> ||
  model<IVerificationModel>("Verification", VerificationSchema);

export default VerificationModel;
