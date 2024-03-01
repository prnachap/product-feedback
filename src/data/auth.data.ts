import { MESSAGES } from "@/constants/messages";
import { IUserModel } from "@/models/user.model";
import {
  deleteTwoFactorToken,
  findTwoFactorToken,
} from "@/services/twoFactor.service";
import { sendTwoFactorToken, sendVerificationEmail } from "@/utils/mail";
import {
  generateTwoFactorToken,
  generateVerificationToken,
} from "@/utils/verificationToken";
import { LoginFormState } from "../../global";
import { createUser, findUser } from "@/services/user.service";
import { isEmpty } from "lodash";
import bcrypt from "bcryptjs";

/**
 * Sends an email verification to the specified user.
 * @param {Object} options - The options for sending the email verification.
 * @param {IUserModel} options.user - The user to send the email verification to.
 * @returns {Promise<LoginFormState>} A promise that resolves to the login form state.
 */
export const sendEmailVerification = async ({
  user,
}: {
  user: IUserModel;
}): Promise<LoginFormState> => {
  const token = await generateVerificationToken(user.email);
  await sendVerificationEmail(user.name, user.email, token as string);
  return {
    errors: null,
    status: "success",
    formMessage: "Confirmation email sent",
  };
};

/**
 * Sends a two-factor authentication email to the user.
 * @param {Object} params - The parameters for sending the email.
 * @param {IUserModel} params.user - The user object containing the email and ID.
 * @returns {Promise<LoginFormState>} - A promise that resolves to the login form state.
 */
export const sendTwoFactorEmail = async ({
  user,
}: {
  user: IUserModel;
}): Promise<LoginFormState> => {
  const token: string = await generateTwoFactorToken(user.email, user._id);
  await sendTwoFactorToken(user.name, user.email, token);
  return {
    errors: null,
    status: "success",
    formMessage: null,
    isTwoFactorEnabled: true,
  };
};

/**
 * Verifies a two-factor authentication token for a user.
 * @param user - The user model.
 * @param code - The two-factor authentication token.
 * @returns A promise that resolves to a LoginFormState object or void.
 */
export const verifyTwoFactorToken = async ({
  user,
  code,
}: {
  user: IUserModel;
  code: string;
}): Promise<LoginFormState | void> => {
  const existingToken = await findTwoFactorToken({ token: code });
  if (!existingToken) {
    return {
      errors: null,
      status: "error",
      isTwoFactorEnabled: true,
      formMessage: MESSAGES.INVALID_TOKEN,
    };
  }
  if (existingToken.email !== user.email) {
    return {
      errors: null,
      status: "error",
      isTwoFactorEnabled: true,
      formMessage: MESSAGES.INVALID_TOKEN,
    };
  }
  if (existingToken.expires < new Date()) {
    return {
      errors: null,
      status: "error",
      isTwoFactorEnabled: true,
      formMessage: MESSAGES.TOKEN_EXPIRED,
    };
  }
  await deleteTwoFactorToken({ token: existingToken.token });
};

/**
 * Registers a new user with the provided email, name, and password.
 *
 * @param {Object} params - The registration parameters.
 * @param {string} params.email - The email of the user.
 * @param {string} params.name - The name of the user.
 * @param {string} params.password - The password of the user.
 * @returns {Promise<Object>} - A promise that resolves to an object with the registration status and form message.
 */
export const userRegistration = async ({
  email,
  name,
  password,
}: {
  email: string;
  name: string;
  password: string;
}) => {
  const existingUser = await findUser({ email });
  if (!isEmpty(existingUser)) {
    return {
      errors: null,
      status: "error" as const,
      formMessage: MESSAGES.USER_EXISTS,
    };
  }
  const user = await createUser({ name, email, password });
  const hash = await bcrypt.hash(password, 10);
  user.password = hash;
  await user.save();
  const token = await generateVerificationToken(user.email);
  await sendVerificationEmail(user.name, user.email, token ?? "");
  return {
    errors: null,
    status: "success" as const,
    formMessage: MESSAGES.CONFIRMATION_EMAIL_SENT,
  };
};
