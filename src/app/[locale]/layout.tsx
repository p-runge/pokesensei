import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { unstable_setRequestLocale } from "next-intl/server";

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

  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={`bg-gray-800 font-sans text-white ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <main className="m-auto flex min-h-screen w-boxed max-w-full flex-col p-4 pb-10">
            {children}
          </main>

          <footer className="-mt-6 flex w-full justify-center pb-1 text-sm font-light">
            <a href="https://p6.gg/">
              Made with <span className="text-red-500">❤</span> by{" "}
              <span className="font-bold text-[#F79B3A]">P6</span>
            </a>
          </footer>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({
    slug: locale,
  }));
}

export const dynamic = "force-static";
