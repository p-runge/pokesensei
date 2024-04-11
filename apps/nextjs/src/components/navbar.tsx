import Image from "next/image";

import { auth } from "@acme/auth";

import { Link } from "~/navigation";
import DarkModeToggle from "./dark-mode-toggle";
import IntlProvider from "./intl-provider";
import LocaleSelect from "./locale-select";
import LoginButton from "./login-button";
import UserDropdown from "./user-dropdown";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="fixed left-0 top-0 flex h-header w-full items-center bg-primary-600 shadow-lg shadow-black/40 dark:bg-gray-700 dark:shadow-none">
      <div className="flex w-full items-center justify-between gap-3 px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="relative mr-3">
            <Image
              src="/logo-50h.png"
              width={189}
              height={50}
              alt="logo"
              priority
              className="hidden sm:inline-block"
            />
            <Image
              src="/favicon.ico"
              width={50}
              height={50}
              alt="logo"
              priority
              className="sm:hidden"
            />
            <div className="absolute -right-3 bottom-0 -rotate-12 rounded-full border-2 border-red-500 bg-gray-100 px-[6px] text-[8px] text-red-500 dark:bg-gray-700 sm:text-xs">
              Beta
            </div>
          </Link>
          <LocaleSelect />
        </div>

        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <IntlProvider>
            {session ? <UserDropdown /> : <LoginButton />}
          </IntlProvider>
        </div>
      </div>
    </nav>
  );
}
