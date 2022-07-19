import UserContext from "@/context/user";
import { Locale } from "@/utils/i18n";
import Image from "next/future/image";
import Link from "next/link";
import { useContext } from "react";

const Navbar = () => {
  const title = "PokéSensei";

  const { locale, setLocale } = useContext(UserContext);

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
        <div className="grid grid-rows-1 grid-flow-col gap-2">
          {Object.values(Locale).map((l) => (
            <button
              key={`locale-${l}`}
              type="button"
              className={`border-2 ${
                l === locale ? "border-white" : "border-transparent"
              }`}
              onClick={() => setLocale(l)}
            >
              <Image src={`/flags/${l}.svg`} width={30} height={20} />
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
