import type { Session } from "next-auth";
import NextAuth from "next-auth";

import { authConfig } from "./config";
import { decrypt } from "./utils";

export type { Session } from "next-auth";

const {
  handlers: { GET, POST },
  auth: defaultAuth,
  signIn,
  signOut,
} = NextAuth(authConfig);

async function auth() {
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
}

export { GET, POST, defaultAuth as auth, signIn, signOut };
