import { ERROR_MESSAGES } from "@/constants/errorMessages";
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
    formError: "Confirmation email sent",
  };
};

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
    formError: null,
    isTwoFactorEnabled: true,
  };
};

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
      formError: ERROR_MESSAGES.INVALID_TOKEN,
    };
  }
  if (existingToken.email !== user.email) {
    return {
      errors: null,
      status: "error",
      isTwoFactorEnabled: true,
      formError: ERROR_MESSAGES.INVALID_TOKEN,
    };
  }
  if (existingToken.expires < new Date()) {
    return {
      errors: null,
      status: "error",
      isTwoFactorEnabled: true,
      formError: ERROR_MESSAGES.TOKEN_EXPIRED,
    };
  }
  await deleteTwoFactorToken({ token: existingToken.token });
};
