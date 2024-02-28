import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { mongooseConnect } from "@/lib/mongoose";
import { LoginFormSchema } from "@/schema/auth.schema";
import { findUser } from "@/services/user.service";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import github from "next-auth/providers/github";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        await mongooseConnect();
        const validateFields = LoginFormSchema.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = (await findUser({ email })) as any;
          if (!user || !user?.password) return null;
          const isValid = await bcrypt.compare(password, user?.password);
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
