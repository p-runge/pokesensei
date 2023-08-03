import Image from "next/future/image";
import Link from "next/link";
import LocaleSelect from "./LocaleSelect";

const Navbar = () => {
  const title = "PokéSensei";

  return (
    <nav className="fixed w-full flex items-center h-header bg-gray-700 shadow-lg">
      <div className="flex justify-between items-center w-full px-6">
        <Link href="/">
          <a className="relative">
            <Image
              src="/logo-50h.png"
              width={189}
              height={50}
              alt={`${title}_logo`}
              priority
            />
            <div className="absolute bottom-0 right-0 -rotate-12 text-sm px-2 border-2 rounded-full border-red-500 text-red-500 bg-gray-800">
              Beta
            </div>
          </a>
        </Link>
        <LocaleSelect />
      </div>
    </nav>
  );
};

export default Navbar;
