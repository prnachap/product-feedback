import { APP_ROUTES, BASE_URL } from "@/constants";
import { Resend } from "resend";
import {
  getPasswordResetMail,
  getTwoFactorEmail,
  getVerficationEmail,
} from "./emailTemplate";
const resend = new Resend(process.env.ARESEND_API_KEY);

/**
 * Sends a verification email to the specified email address.
 * @param name - The name of the recipient.
 * @param email - The email address of the recipient.
 * @param token - The verification token.
 * @throws {"EmailVerificationSendError"} If there is an error sending the verification email.
 */
export const sendVerificationEmail = async (
  name: string,
  email: string,
  token: string
): Promise<void> => {
  const confirmLink = `${BASE_URL}${APP_ROUTES.NEW_VERIFICATION}?token=${token}`;
  try {
    await resend.emails.send({
      to: email,
      from: "onboarding@resend.dev",
      subject: "Verify your email",
      html: getVerficationEmail({ name, verificationURL: confirmLink }),
    });
  } catch (error: any) {
    const updatedError = new Error(error?.message);
    updatedError.name = "EmailVerificationSendError";
    throw updatedError;
  }
};

/**
 * Sends a password reset token to the specified email address.
 * @param name - The name of the user.
 * @param email - The email address to send the password reset token to.
 * @param token - The password reset token.
 * @throws {"ResetPasswordTokenError"} If there is an error sending the password reset token.
 */
export const sendPasswordResetToken = async (
  name: string,
  email: string,
  token: string
): Promise<void> => {
  const resetLink = `${BASE_URL}${APP_ROUTES.NEW_PASSWORD}?token=${token}`;
  try {
    await resend.emails.send({
      to: email,
      from: "onboarding@resend.dev",
      subject: "Password Reset Link",
      html: getPasswordResetMail({ name, resetLink }),
    });
  } catch (error: any) {
    const updatedError = new Error(error?.message);
    updatedError.name = "ResetPasswordTokenError";
    throw updatedError;
  }
};

/**
 * Sends a two-factor authentication token to a specified email address.
 *
 * @param name - The name of the recipient.
 * @param email - The email address of the recipient.
 * @param token - The two-factor authentication token.
 * @throws "TwoFactorTokenError" if there is an error sending the token.
 */
export const sendTwoFactorToken = async (
  name: string,
  email: string,
  token: string
): Promise<void> => {
  try {
    await resend.emails.send({
      to: email,
      from: "onboarding@resend.dev",
      subject: "Two Factor Authentication Code",
      html: getTwoFactorEmail({ name, twoFactorCode: token }),
    });
  } catch (error: any) {
    const updatedError = new Error(error?.message);
    updatedError.name = "TwoFactorTokenError";
    throw updatedError;
  }
};
