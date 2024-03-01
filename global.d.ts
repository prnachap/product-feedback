import { IUser, IUserModel } from "@/models/user.model";
import {
  LoginFormSchema,
  RegisterFormSchema,
  ResetFormSchema,
  ResetPasswordSchema,
} from "@/schema/auth.schema";
import { DefaultSession } from "next-auth";
import { z } from "zod";

export type ExtendedUser = DefaultSession["user"] & {
  role: IUserModel["userRole"];
};
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
  interface User extends DefaultSession["user"], IUser {
    id: string;
  }
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | null;
}

declare namespace NodeJS {
  interface ProcessEnv {
    ENV: "development" | "production";
    AUTH_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GITHUB_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    ARESEND_API_KEY: string;
  }
}

type LoginFields = z.infer<typeof LoginFormSchema>;
type ResetFields = z.infer<typeof ResetFormSchema>;
type ResetPasswordFields = z.infer<typeof ResetPasswordSchema>;
type FormState<T extends Record<string, any>> = {
  errors: Partial<Record<keyof T, string[]>> | null;
  status: "error" | "success" | null;
  formError: string | null;
  isTwoFactorEnabled?: boolean;
};
type LoginFormState = FormState<LoginFields>;
type RegisterFormFields = z.infer<typeof RegisterFormSchema>;
type RegisterFormState = FormState<RegisterFormFields>;
type ResetFormState = FormState<ResetFields>;
type ResetPasswordFormState = FormState<ResetPasswordFields>;
