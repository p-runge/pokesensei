import Image from "next/image";
import { Link } from "~/navigation";
import LocaleSelect from "./locale-select";

export default function Navbar() {
  return (
    <nav className="fixed left-0 top-0 flex h-header w-full items-center bg-gray-700 shadow-lg">
      <div className="flex w-full items-center justify-between px-6">
        <Link href="/" className="relative">
          <Image
            src="/logo-50h.png"
            width={189}
            height={50}
            alt="logo"
            priority
          />
          <div className="absolute -right-3 bottom-0 -rotate-12 rounded-full border-2 border-red-500 bg-gray-800 px-2 text-xs text-red-500">
            Beta
          </div>
        </Link>
        <LocaleSelect />
      </div>
    </nav>
  );
}
