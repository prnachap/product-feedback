import { findUser, updateUser } from "@/services/user.service";
import { updateVerificationToken } from "@/services/verification.service";
import { find } from "lodash";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expiry = new Date(new Date().getTime() + 1000 * 10 * 60);
  try {
    const verificationTokenDocument = await updateVerificationToken(
      { email },
      { token, expiry },
      { upsert: true, new: true }
    );

    return verificationTokenDocument.token;
  } catch (error) {
    throw new Error("Error generating token");
  }
};

export const generatePasswordResetToken = async (email: string) => {
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
