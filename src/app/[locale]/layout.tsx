import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

import { TRPCReactProvider } from "~/trpc/react";
import { LOCALES, type Locale } from "~/i18n";
import { NextAuthProvider } from "~/components/next-auth-provider";

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

  return (
    <NextAuthProvider>
      <html lang={locale}>
        <body className={`bg-gray-800 font-sans text-white ${inter.variable}`}>
          <TRPCReactProvider cookies={cookies().toString()}>
            <main className="m-auto flex min-h-screen w-boxed max-w-full flex-col p-4 pb-10">
              {children}
            </main>

            <footer className="-mt-6 flex w-full justify-center pb-1 text-sm font-light">
              <a href="https://p6.gg/" target="_blank">
                Made with <span className="text-red-500">❤</span> by{" "}
                <span className="font-bold text-[#F79B3A]">P6</span>
              </a>
            </footer>
          </TRPCReactProvider>
        </body>
      </html>
    </NextAuthProvider>
  );
}
