import { Resend } from "resend";
const resend = new Resend(process.env.ARESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  try {
    await resend.emails.send({
      to: email,
      from: "onboarding@resend.dev",
      subject: "Verify your email",
      text: `Click the link to verify your email: ${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`,
      html: `<a href="${confirmLink}">Click to verify your email</a>`,
    });
  } catch (error) {
    throw new Error("failed to send verification email");
  }
};

export const sendPasswordResetToken = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-password?token=${token}`;
  try {
    await resend.emails.send({
      to: email,
      from: "onboarding@resend.dev",
      subject: "Password Reset Link",
      html: `<a href="${confirmLink}">Click to Reset Password</a>`,
    });
  } catch (error) {
    throw new Error("failed to send password reset email");
  }
};
