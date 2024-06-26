import "../globals.css";

import { Inter } from "next/font/google";
import { redirect } from "next/navigation";

import { auth } from "@acme/auth";

import type { Locale } from "~/i18n";
import { DecryptedSessionProvider } from "~/components/decrypted-session-provider";
import ThemeProvider from "~/components/theme-provider";
import { LOCALES } from "~/i18n";
import { TRPCReactProvider } from "~/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "PokéSensei",
  description: "Improve your Pokémon knowledge",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  if (!LOCALES.includes(locale)) {
    redirect("/");
  }

  const session = await auth();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`bg-gray-100 font-sans text-gray-800 dark:bg-gray-800 dark:text-white ${inter.variable} transition-colors`}
      >
        <DecryptedSessionProvider session={session}>
          <TRPCReactProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </TRPCReactProvider>
        </DecryptedSessionProvider>
      </body>
    </html>
  );
}
