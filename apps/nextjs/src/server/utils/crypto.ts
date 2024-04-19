import "server-only";

import CryptoJS from "crypto-js";

import { env } from "~/env";

export function encrypt(text: string) {
  return CryptoJS.AES.encrypt(text, env.CRYPTO_SECRET).toString();
}

export function decrypt(cipherText: string) {
  return CryptoJS.AES.decrypt(cipherText, env.CRYPTO_SECRET).toString(
    CryptoJS.enc.Utf8,
  );
}
