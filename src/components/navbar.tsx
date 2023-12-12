import Image from "next/image";
import { Link } from "~/navigation";
import LocaleSelect from "./locale-select";
import IntlProvider from "./intl-provider";
import LoginButton from "./login-button";
import UserDropdown from "./user-dropdown";
import { getServerAuthSession } from "~/server/auth";

export default async function Navbar() {
  const session = await getServerAuthSession();

  return (
    <nav className="bg-primary-600 fixed left-0 top-0 flex h-header w-full items-center shadow-lg shadow-black/40 dark:bg-gray-700 dark:shadow-none">
      <div className="flex w-full items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Link href="/" className="relative mr-3">
            <Image
              src="/logo-50h.png"
              width={189}
              height={50}
              alt="logo"
              priority
            />
            <div className="absolute -right-3 bottom-0 -rotate-12 rounded-full border-2 border-red-500 bg-gray-200 px-[6px] text-xs text-red-500 dark:bg-gray-800">
              Beta
            </div>
          </Link>
          <LocaleSelect />
        </div>

        <IntlProvider>
          {session ? <UserDropdown /> : <LoginButton />}
        </IntlProvider>
      </div>
    </nav>
  );
}
