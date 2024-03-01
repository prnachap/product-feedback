import { createTwoFactorToken } from "@/services/twoFactor.service";
import { updateUser } from "@/services/user.service";
import { updateVerificationToken } from "@/services/verification.service";
import crypto from "crypto";
import { ObjectId } from "mongodb";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (
  email: string
): Promise<string | undefined> => {
  const token = uuidv4();
  const expiry = new Date(new Date().getTime() + 1000 * 10 * 60);
  try {
    const verificationTokenDocument = await updateVerificationToken(
      { email },
      { token, expiry },
      { upsert: true, new: true }
    );

    return verificationTokenDocument?.token;
  } catch (error: any) {
    const updatedError = new Error(error?.message);
    updatedError.name = "EmailVerificationTokenError";
    throw updatedError;
  }
};

export const generatePasswordResetToken = async (
  email: string
): Promise<string | null | undefined> => {
  const token = uuidv4();
  const expiry = new Date(new Date().getTime() + 1000 * 10 * 60);
  try {
    const passwordResetDocument = await updateUser(
      { email },
      { passwordResetToken: token, passwordResetTokenExpires: expiry },
      { new: true }
    );
    return passwordResetDocument?.passwordResetToken;
  } catch (error) {
    throw new Error("Error generating token");
  }
};

export const generateTwoFactorToken = async (
  email: string,
  userId: ObjectId
): Promise<string> => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expiry = new Date(new Date().getTime() + 1000 * 10 * 60);
  try {
    const twoFactorDocument = await createTwoFactorToken({
      email,
      token,
      expires: expiry,
      userId: userId,
    });

    await updateUser(
      { email },
      { twoFactor: twoFactorDocument?.id },
      { new: true }
    );
    return twoFactorDocument?.token;
  } catch (error: any) {
    const updatedError = new Error(error?.message);
    updatedError.name = "TwoFactorTokenError";
    throw updatedError;
  }
};
