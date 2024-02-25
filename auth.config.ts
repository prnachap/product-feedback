import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { initializeDB } from "@/lib/initializeDB";
import { LoginFormSchema } from "@/lib/schema";
import UserModel from "@/models/user.model";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        await initializeDB();
        const validateFields = LoginFormSchema.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = await UserModel.findOne({ email }, { password: 0 });
          if (!user || !user.password) return null;

          const isValid = await bcrypt.compare(password, user.password);
          if (isValid) return user;
          return null;
        }
        return null;
      },
    }),
    github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
