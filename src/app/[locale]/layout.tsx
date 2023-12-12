import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { TRPCReactProvider } from "~/trpc/react";
import { LOCALES, type Locale } from "~/i18n";
import { getServerAuthSession } from "~/server/auth";
import { DecryptedSessionProvider } from "~/components/decrypted-session-provider";

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
  if (!LOCALES.includes(locale)) notFound();

  const session = await getServerAuthSession();

  return (
    <html lang={locale}>
      <body
        className={`bg-gray-200 font-sans text-gray-800 dark:bg-gray-800 dark:text-white ${inter.variable}`}
      >
        <DecryptedSessionProvider session={session}>
          <TRPCReactProvider cookies={cookies().toString()}>
            {children}
          </TRPCReactProvider>
        </DecryptedSessionProvider>
      </body>
    </html>
  );
}
