import type { AppProps } from "next/app";
import Head from "next/head";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const theme = createTheme({});

const App = ({ Component, pageProps }: AppProps) => {
  const title = "PokéSensei";
  const metaDescription = "Improve your Pokémon knowledge";

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="icon" href="/favicon.ico" />
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

export default App;
