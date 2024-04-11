import { cache } from "react";
import NextAuth from "next-auth";

import { authConfig } from "./config";
import { createAuthWithDecryptedUser } from "./utils";

export type { Session } from "next-auth";

const {
  handlers: { GET, POST },
  auth: defaultAuth,
  signIn,
  signOut,
} = NextAuth(authConfig);

/**
 * This is the main way to get session data for your RSCs.
 * This will de-duplicate all calls to next-auth's default `auth()` function and only call it once per request
 */
const decryptedAuth = cache(createAuthWithDecryptedUser(defaultAuth));

export { GET, POST, decryptedAuth as auth, signIn, signOut };
