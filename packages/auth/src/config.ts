import type {
  DefaultSession,
  NextAuthConfig,
  NextAuthResult,
  Session,
} from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Discord from "next-auth/providers/discord";

import { db } from "@acme/db";

import { decrypt, encrypt } from "./utils";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  adapter: PrismaAdapter(db),
  providers: [Discord],
  callbacks: {
    session: (opts) => {
      if (!("user" in opts)) throw "unreachable with session strategy";

      return {
        ...opts.session,
        user: {
          ...opts.session.user,
          id: opts.user.id,
        },
      };
    },
    signIn({ user }) {
      // Encrypt sensitive user data before saving
      user.email = user.email && encrypt(user.email);
      user.name = user.name && encrypt(user.name);
      user.image = user.image && encrypt(user.image);

      return true;
    },
  },
} satisfies NextAuthConfig;

export function createAuthWithDecryptedUser(
  defaultAuth: NextAuthResult["auth"],
) {
  return async () => {
    const session = await defaultAuth();
    return (
      session && {
        ...session,
        user: {
          id: session?.user?.id,
          // Decrypt sensitive user data
          email: session?.user?.email && decrypt(session.user.email),
          name: session?.user?.name && decrypt(session.user.name),
          image: session?.user?.image && decrypt(session.user.image),
        } satisfies Record<
          // check if all user properties are defined
          keyof Session["user"],
          Session["user"][keyof Session["user"]]
        >,
      }
    );
  };
}
