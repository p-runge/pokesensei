/* eslint-disable import/prefer-default-export */
import getUserLocale from "get-user-locale";

export enum Locales {
  en = "en",
  de = "de",
}

export const LOCALE =
  Object.values(Locales).find((l) => l === getUserLocale().substring(0, 2)) ||
  Locales.en;
