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
