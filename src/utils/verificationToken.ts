import { updateVerificationToken } from "@/services/verification.service";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expiry = new Date(new Date().getTime() + 1000 * 10 * 60);
  try {
    const verificationToken = await updateVerificationToken(
      { email },
      { token, expiry },
      { upsert: true, new: true }
    );

    return verificationToken.token;
  } catch (error) {
    throw new Error("Error generating token");
  }
};
