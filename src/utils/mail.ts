import { APP_ROUTES, BASE_URL } from "@/constants";
import { Resend } from "resend";
import {
  getPasswordResetMail,
  getTwoFactorEmail,
  getVerficationEmail,
} from "./emailTemplate";
const resend = new Resend(process.env.ARESEND_API_KEY);

export const sendVerificationEmail = async (
  name: string,
  email: string,
  token: string
) => {
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
    updatedError.name = "EmailVerificationTokenError";
    throw updatedError;
  }
};

export const sendPasswordResetToken = async (
  name: string,
  email: string,
  token: string
) => {
  const resetLink = `${BASE_URL}${APP_ROUTES.NEW_PASSWORD}?token=${token}`;
  try {
    await resend.emails.send({
      to: email,
      from: "onboarding@resend.dev",
      subject: "Password Reset Link",
      html: getPasswordResetMail({ name, resetLink }),
    });
  } catch (error) {
    throw new Error("failed to send password reset email");
  }
};

export const sendTwoFactorToken = async (
  name: string,
  email: string,
  token: string
) => {
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
