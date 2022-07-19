import { Locale } from "@/utils/i18n";
import React from "react";

export interface UserState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const UserContext = React.createContext(undefined as unknown as UserState);

export default UserContext;
