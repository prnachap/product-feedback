"use server";

import { MESSAGES } from "@/constants/messages";
import { userRegistration } from "@/data/auth.data";
import {
  LoginFormSchema,
  RegisterFormSchema,
  ResetFormSchema,
  ResetPasswordSchema,
} from "@/schema/auth.schema";
import { findUser, updateUser } from "@/services/user.service";
import { deleteToken, findToken } from "@/services/verification.service";
import { sendPasswordResetToken, sendVerificationEmail } from "@/utils/mail";
import { validateSchema } from "@/utils/validateSchema";
import {
  generatePasswordResetToken,
  generateVerificationToken,
} from "@/utils/verificationToken";
import bcrypt from "bcryptjs";
import { isEqual } from "lodash";
import { AuthError } from "next-auth";
import { signIn, signOut } from "../../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../../route";
import {
  LoginFormState,
  RegisterFormState,
  ResetFormState,
  ResetPasswordFormState,
} from "../../global";

/**
 * Performs the login action with the provided form data.
 *
 * @param _prevState - The previous state of the login form.
 * @param formData - The form data containing the email and password.
 * @returns A promise that resolves to the updated state of the login form.
 */
export const loginAction = async (
  _prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> => {
  const validatedFields = validateSchema({
    schema: LoginFormSchema,
    formData,
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      status: "error",
      formMessage: null,
    };
  }
  const { email, password } = validatedFields.data;
  try {
    const existingUser = await findUser({ email });
    if (!existingUser || !existingUser.email || !existingUser.password) {
      return {
        errors: null,
        status: "error",
        formMessage: MESSAGES.INVALID_CREDENTIALS,
      };
    }

    if (!existingUser.emailVerified) {
      const token = await generateVerificationToken(existingUser.email);
      await sendVerificationEmail(
        existingUser.name,
        existingUser.email,
        token ?? ""
      );
      return {
        errors: null,
        status: "success",
        formMessage: MESSAGES.CONFIRMATION_EMAIL_SENT,
      };
    }

    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return {
      errors: null,
      status: "success",
      formMessage: null,
    };
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return {
              errors: null,
              status: "error",
              formMessage: MESSAGES.INVALID_CREDENTIALS,
            };
          default:
            return {
              errors: null,
              status: "error",
              formMessage: MESSAGES.SERVER_ERROR,
            };
        }
      }
      switch (error.name) {
        case "EmailVerificationTokenError":
          return {
            errors: null,
            status: "error",
            formMessage: MESSAGES.EMAIL_VERIFICATION_ERROR,
          };
        case "TwoFactorTokenError":
          return {
            errors: null,
            status: "error",
            formMessage: MESSAGES.TWO_FACTOR_ERROR,
          };
      }
    }
    throw error;
  }
};

/**
 * Registers a user with the provided form data.
 *
 * @param _prevState The previous state of the registration form.
 * @param formData The form data containing the user's information.
 * @returns A promise that resolves to the updated state of the registration form.
 */
export const registerAction = async (
  _prevState: RegisterFormState,
  formData: FormData
): Promise<RegisterFormState> => {
  const validatedFields = validateSchema({
    schema: RegisterFormSchema,
    formData,
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      status: "error",
      formMessage: null,
    };
  }
  const { name, email, password } = validatedFields.data;
  try {
    return await userRegistration({ email, name, password });
  } catch (error) {
    if (error instanceof Error) {
      switch (error.name) {
        case "EmailVerificationSendError":
        case "EmailVerificationTokenError":
          return {
            errors: null,
            status: "error",
            formMessage: MESSAGES.REGISTER_VERIFICATION_ERROR,
          };
        default:
          return {
            errors: null,
            status: "error",
            formMessage: MESSAGES.SERVER_ERROR,
          };
      }
    }
    return {
      errors: null,
      status: "error",
      formMessage: MESSAGES.SERVER_ERROR,
    };
  }
};

/**
 * Logs out the user.
 */
export const logoutAction = async (): Promise<void> => {
  await signOut();
};

/**
 * Verifies the email using the provided token.
 * @param token - The token to verify the email.
 * @returns A promise that resolves to an object with the success status and a message.
 */
export const verifyEmailAction = async (
  token: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const existingToken = await findToken({ token });
    const existingUser = await findUser({ email: existingToken?.email });

    if (!existingToken?.token) {
      return { success: false, message: MESSAGES.INVALID_TOKEN };
    }
    if (!isEqual(existingToken?.token, token)) {
      return { success: false, message: MESSAGES.INVALID_TOKEN };
    }
    if (new Date(existingToken?.expiry) < new Date()) {
      return {
        success: false,
        message: MESSAGES.TOKEN_EXPIRED,
      };
    }
    if (!existingUser) {
      return { success: false, message: MESSAGES.INVALID_EMAIL };
    }
    await updateUser(
      { email: existingUser.email },
      { emailVerified: new Date(), email: existingToken.email },
      { upsert: true }
    );
    await deleteToken({ token: existingToken.token });
    return { success: true, message: MESSAGES.EMAIL_VERIFIED };
  } catch (error) {
    return {
      success: false,
      message: MESSAGES.SERVER_ERROR,
    };
  }
};

/**
 * Sends a password reset email.
 *
 * @param _prevState - The previous state of the reset form.
 * @param formData - The form data containing the email.
 * @returns A promise that resolves to the updated state of the reset form.
 */
export const sendPasswordResetEmailAction = async (
  _prevState: ResetFormState,
  formData: FormData
): Promise<ResetFormState> => {
  const validatedFields = ResetFormSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      status: "error",
      formMessage: null,
    };
  }
  const { email } = validatedFields.data;
  try {
    const existingUser = await findUser({ email });
    if (!existingUser || !existingUser.email) {
      return {
        errors: null,
        status: "error",
        formMessage: MESSAGES.INVALID_EMAIL,
      };
    }
    const token = await generatePasswordResetToken(existingUser.email);
    await sendPasswordResetToken(
      existingUser.name,
      existingUser.email,
      token ?? ""
    );
    return {
      errors: null,
      status: "success",
      formMessage: MESSAGES.PASSWORD_RESET_EMAIL_SENT,
    };
  } catch (error: any) {
    if (error?.name === "ResetPasswordTokenError") {
      return {
        errors: null,
        status: "error",
        formMessage: MESSAGES.PASSWORD_RESET_ERROR,
      };
    }
    return {
      errors: null,
      status: "error",
      formMessage: MESSAGES.SERVER_ERROR,
    };
  }
};

/**
 * Resets the password for a user.
 *
 * @param token - The password reset token.
 * @param prevState - The previous state of the reset password form.
 * @param formData - The form data containing the new password.
 * @returns A promise that resolves to the updated state of the reset password form.
 */
export const resetPasswordAction = async (
  token: string | null,
  _prevState: ResetPasswordFormState,
  formData: FormData
): Promise<ResetPasswordFormState> => {
  const validatedFields = ResetPasswordSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      status: "error",
      formMessage: null,
    };
  }
  const { password } = validatedFields.data;

  try {
    const existingUser = await findUser({ passwordResetToken: token });

    if (
      !token ||
      !existingUser ||
      !existingUser.passwordResetToken ||
      !existingUser.passwordResetTokenExpires
    ) {
      return {
        errors: null,
        status: "error",
        formMessage: MESSAGES.INVALID_TOKEN,
      };
    }

    if (!isEqual(existingUser?.passwordResetToken, token)) {
      return {
        errors: null,
        status: "error",
        formMessage: MESSAGES.INVALID_TOKEN,
      };
    }

    if (new Date(existingUser.passwordResetTokenExpires) < new Date()) {
      return {
        errors: null,
        status: "error",
        formMessage: MESSAGES.TOKEN_EXPIRED,
      };
    }

    await updateUser(
      { email: existingUser.email },
      {
        password: await bcrypt.hash(password, 10),
        passwordResetToken: null,
        passwordResetTokenExpires: null,
      },
      { upsert: true }
    );

    return {
      errors: null,
      status: "success",
      formMessage: MESSAGES.PASSWORD_RESET_SUCCESS,
    };
  } catch (error) {
    return {
      errors: null,
      status: "error",
      formMessage: MESSAGES.SERVER_ERROR,
    };
  }
};
