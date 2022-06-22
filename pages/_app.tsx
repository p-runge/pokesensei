import "@/styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "@/server/router";

const App = ({ Component, pageProps }: AppProps) => {
  const title = "PokéSensei";
  const metaDescription = "Improve your Pokémon knowledge";

  return (
    <ThemeProvider theme={theme}>
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
      <CssBaseline />

      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default withTRPC<AppRouter>({
  config() {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : "http://localhost:3000/api/trpc";

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
})(App);
