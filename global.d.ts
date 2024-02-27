import { IUser, IUserModel } from "@/models/user.model";
import { DefaultSession } from "next-auth";

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
