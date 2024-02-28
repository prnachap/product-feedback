"use server";

import {
  LoginFormSchema,
  RegisterFormSchema,
  ResetFormSchema,
  ResetPasswordSchema,
} from "@/schema/auth.schema";
import { createUser, findUser, updateUser } from "@/services/user.service";
import { deleteToken, findToken } from "@/services/verification.service";
import { sendPasswordResetToken, sendVerificationEmail } from "@/utils/mail";
import {
  generatePasswordResetToken,
  generateVerificationToken,
} from "@/utils/verificationToken";
import bcrypt from "bcryptjs";
import { isEmpty, isEqual } from "lodash";
import { AuthError } from "next-auth";
import { z } from "zod";
import { signIn, signOut } from "../../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../../route";

type Fields = z.infer<typeof LoginFormSchema>;
type ResetFields = z.infer<typeof ResetFormSchema>;
type ResetPasswordFields = z.infer<typeof ResetPasswordSchema>;
type FormState<T extends Record<string, any>> = {
  errors: Partial<Record<keyof T, string[]>> | null;
  status: "error" | "success" | null;
  formError: string | null;
};
type LoginFormState = FormState<Fields>;
type RegisterFormFields = z.infer<typeof RegisterFormSchema>;
type RegisterFormState = FormState<RegisterFormFields>;
type ResetFormState = FormState<ResetFields>;
type ResetPasswordFormState = FormState<ResetPasswordFields>;

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
  const validatedFields = LoginFormSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      status: "error",
      formError: null,
    };
  }
  const { email, password } = validatedFields.data;
  try {
    const existingUser = await findUser({ email });
    if (!existingUser || !existingUser.email || !existingUser.password) {
      return {
        errors: null,
        status: "error",
        formError: "Invalid Credentials",
      };
    }

    if (!existingUser.emailVerified) {
      const token = await generateVerificationToken(existingUser.email);
      await sendVerificationEmail(existingUser.email, token);
      return {
        errors: null,
        status: "success",
        formError: "Confirmation email sent",
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
      formError: null,
    };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            errors: null,
            status: "error",
            formError: "Invalid Credentials",
          };
        default:
          return {
            errors: null,
            status: "error",
            formError: "Something went wrong. Please try again.",
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
  const validatedFields = RegisterFormSchema.safeParse({
    ...Object.fromEntries(formData.entries()),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      status: "error",
      formError: null,
    };
  }
  const { name, email, password, username } = validatedFields.data;
  try {
    const existingUser = await findUser({ email });
    if (!isEmpty(existingUser)) {
      return {
        errors: null,
        status: "error",
        formError: "User Already Exists",
      };
    }
    const user = await createUser({ name, username, email, password });
    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    await user.save();
    const token = await generateVerificationToken(user.email);
    await sendVerificationEmail(user.email, token);
    return {
      errors: null,
      status: "success",
      formError: "Confirmation email sent",
    };
  } catch (error) {
    return {
      errors: null,
      status: "error",
      formError: "Something went wrong. Please try again.",
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
      return { success: false, message: "Invalid token" };
    }
    if (!isEqual(existingToken?.token, token)) {
      return { success: false, message: "Invalid token" };
    }
    if (new Date(existingToken?.expiry) < new Date()) {
      return {
        success: false,
        message: "Token has expired. Please request a new one",
      };
    }
    if (!existingUser) {
      return { success: false, message: "Invalid email" };
    }
    await updateUser(
      { email: existingUser.email },
      { emailVerified: new Date(), email: existingToken.email },
      { upsert: true }
    );
    await deleteToken({ token: existingToken.token });
    return { success: true, message: "email verified" };
  } catch (error) {
    return {
      success: false,
      message: "Something went wrong. Please try again",
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
      formError: null,
    };
  }
  const { email } = validatedFields.data;
  try {
    const existingUser = await findUser({ email });
    if (!existingUser || !existingUser.email) {
      return {
        errors: null,
        status: "error",
        formError: "Invalid Email",
      };
    }
    const token = await generatePasswordResetToken(existingUser.email);
    await sendPasswordResetToken(existingUser.email, token);
    return {
      errors: null,
      status: "success",
      formError: "Password reset email sent",
    };
  } catch (error) {
    return {
      errors: null,
      status: "error",
      formError: "Something went wrong. Please try again.",
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
      formError: null,
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
        formError: "Invalid Token",
      };
    }

    if (!isEqual(existingUser?.passwordResetToken, token)) {
      return {
        errors: null,
        status: "error",
        formError: "Invalid Token",
      };
    }

    if (new Date(existingUser.passwordResetTokenExpires) < new Date()) {
      return {
        errors: null,
        status: "error",
        formError: "Token has expired. Please request a new one",
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
      formError: "Password Reset Successful. Please login",
    };
  } catch (error) {
    return {
      errors: null,
      status: "error",
      formError: "Something went wrong. Please try again.",
    };
  }
};
