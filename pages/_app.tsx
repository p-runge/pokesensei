import "@/styles/global.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

      <Navbar
        navItems={[
          {
            label: "Quiz",
            route: "/quiz",
          },
        ]}
      />

      {/* fixed navbar + footer spacer */}
      <Box
        style={{
          padding: "64px 0",
        }}
      >
        <Component {...pageProps} />
      </Box>

      <Footer navItems={[{ label: "Credits", route: "/credits" }]} />
    </ThemeProvider>
  );
};

export default App;
