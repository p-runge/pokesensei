import createMiddleware from "next-intl/middleware";
import { LOCALES } from "./i18n";

export default createMiddleware({
  locales: LOCALES,
  defaultLocale: "en",

  // TODO: somehow crashes the app
  // localePrefix: "as-needed",
});

export const config = {
  // Match only internationalized pathnames
  //! The dynamic approach does not work because the matcher expects a literal
  //! string, but the literal has to be kept in sync with the LOCALES array for
  //! the routing to work properly.
  // matcher: ["/", `/(${LOCALES.join("|")})/:path*`],
  matcher: ["/", "/(de|en)/:path*"],
};
