import Credentials from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import { LoginFormSchema } from "@/lib/schema";
import UserModel from "@/models/user.model";
import { initializeDB } from "@/lib/initializeDB";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        await initializeDB();
        const validateFields = LoginFormSchema.safeParse(credentials);
        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = await UserModel.findOne({ email });
          if (!user || !user.password) return null;

          const isValid = await bcrypt.compare(password, user.password);
          if (isValid) return user;
          return null;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
