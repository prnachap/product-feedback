import clientPromise from "@/lib/mongodb";
import UserModel, { IUserModel } from "@/models/user.model";
import { getUserById } from "@/services";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";

export type ExtendedUser = DefaultSession["user"] & {
  role: IUserModel["userRole"];
};
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user, account }) {
      await UserModel.findOneAndUpdate(
        { email: user.email },
        { emailVerified: new Date() }
      );
    },
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && session?.user) {
        session.user.id = token.sub;
      }
      if (token?.role && session?.user) {
        session.user.role = token.role as IUserModel["userRole"];
      }
      return session;
    },
    async jwt({ token }) {
      if (!token?.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser?.userRole ?? "user";
      return token;
    },
  },
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  ...authConfig,
});
