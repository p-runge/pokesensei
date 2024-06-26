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

const auth = createAuthWithDecryptedUser(defaultAuth);

// export { GET, POST, defaultAuth as auth, signIn, signOut };
export { GET, POST, auth, signIn, signOut };
