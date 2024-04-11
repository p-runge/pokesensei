import type { NextAuthResult, Session } from "next-auth";
import CryptoJS from "crypto-js";

import { env } from "../env";

export function encrypt(text: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return CryptoJS.AES.encrypt(text, env.CRYPTO_SECRET).toString();
}

export function decrypt(cipherText: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const bytes = CryptoJS.AES.decrypt(cipherText, env.CRYPTO_SECRET);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  return bytes.toString(CryptoJS.enc.Utf8);
}

export function createAuthWithDecryptedUser(
  defaultAuth: NextAuthResult["auth"],
) {
  return async () => {
    const session = await defaultAuth();

    return (
      session && {
        ...session,
        user: {
          ...session.user,
          name: session.user.name && decrypt(session.user.name),
          email: session.user.email && decrypt(session.user.email),
          image: session.user.image && decrypt(session.user.image),
        } satisfies Record<
          // check if all user properties are defined
          keyof Session["user"],
          Session["user"][keyof Session["user"]]
        >,
      }
    );
  };
}
