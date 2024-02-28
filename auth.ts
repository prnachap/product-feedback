import clientPromise from "@/lib/mongodb";
import { IUserModel } from "@/models/user.model";
import { findUser, updateUser } from "@/services/user.service";
import { Adapter } from "@auth/core/adapters";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { AUTH_ROUTES } from "@/constants";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: AUTH_ROUTES.LOGIN,
    signOut: AUTH_ROUTES.LOGOUT,
    error: AUTH_ROUTES.AUTH_ERROR,
  },

  events: {
    async linkAccount({ user, account }) {
      await updateUser({ email: user.email }, { emailVerified: new Date() });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      const existingUser = await findUser({ email: user.email });
      if (!existingUser?.emailVerified) return false;
      return true;
    },

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
      const existingUser = await findUser({ _id: token.sub });
      if (!existingUser) return token;
      token.role = existingUser?.userRole ?? "user";
      return token;
    },
  },
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "product-feedback",
  }) as Adapter,
  session: { strategy: "jwt" },
  ...authConfig,
});
