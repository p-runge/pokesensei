import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { TRPCReactProvider } from "~/trpc/react";
import { LOCALES } from "~/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "PokéSensei",
  description: "Improve your Pokémon knowledge",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: (typeof LOCALES)[number] };
}) {
  if (!LOCALES.includes(locale)) notFound();
  return (
    <html lang={locale}>
      <body className={`bg-gray-800 font-sans text-white ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <main className="m-auto flex min-h-screen w-boxed max-w-full flex-col p-4">
            {children}
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
