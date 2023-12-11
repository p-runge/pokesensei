import { PrismaAdapter } from "@next-auth/prisma-adapter";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  type Session,
} from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "~/env";
import { db } from "~/server/db";
import { decrypt, encrypt } from "~/utils/crypto";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: user.id,
      },
    }),
    signIn({ user }) {
      // Encrypt sensitive user data before saving
      user.email = user.email && encrypt(user.email);
      user.name = user.name && encrypt(user.name);
      user.image = user.image && encrypt(user.image);

      return true;
    },
  },
  adapter: PrismaAdapter(db),
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
  ],
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export async function getServerAuthSession() {
  const session = await getServerSession(authOptions);
  return (session && {
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
  }) as typeof session;
}
