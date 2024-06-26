import { getRequestConfig } from "next-intl/server";

import deMessages from "../messages/de.json";
import enMessages from "../messages/en.json";

export const LOCALES = ["en", "de"] as const;
export type Locale = (typeof LOCALES)[number];

const messages = {
  en: enMessages,
  de: deMessages,
} as const satisfies Record<Locale, Record<string, string>>;

export default getRequestConfig(({ locale }) => ({
  messages: messages[locale as Locale],
}));
