import React, { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "@/styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { withTRPC } from "@trpc/next";
import { appWithTranslation } from "next-i18next";
import type { AppRouter } from "@/server/router";
import UserContext, { UserState } from "@/context/user";
import { Locale } from "@/utils/i18n";
import getUserLocale from "get-user-locale";
import * as ls from "local-storage";

const App = ({ Component, pageProps }: AppProps) => {
  const title = "PokéSensei";
  const metaDescription = "Improve your Pokémon knowledge";

  const [locale, setLocale] = useState(Locale.en);
  const userState: UserState = { locale, setLocale };

  // initial client server synching of locale
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!ls.get("locale")) {
        ls.set(
          "locale",
          Object.values(Locale).find(
            (l) => l === getUserLocale().substring(0, 2)
          ) || Locale.en
        );
      }
      setLocale(ls.get("locale"));
    }
  }, []);

  // update ls on locale change
  useEffect(() => {
    if (typeof window !== "undefined") {
      ls.set("locale", locale);
    }
  }, [locale]);

  return (
    <UserContext.Provider value={userState}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.png" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="preload"
          as="font"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>

      <Component {...pageProps} />
    </UserContext.Provider>
  );
};

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const apiPath = "/api/trpc";

    if (typeof window !== "undefined") {
      return {
        url: apiPath,
      };
    }

    const url = `${
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000"
    }${apiPath}`;

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
})(appWithTranslation(App));
