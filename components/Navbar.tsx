import Image from "next/future/image";
import Link from "next/link";
import LocaleSelect from "./LocaleSelect";

const Navbar = () => {
  const title = "PokéSensei";

  return (
    <nav className="fixed w-full flex items-center h-header bg-gray-700 shadow-lg">
      <div className="flex justify-between items-center w-full px-6">
        <Link href="/">
          <a>
            <Image
              src="/logo-50h.png"
              width={189}
              height={50}
              alt={`${title}_logo`}
              priority
            />
          </a>
        </Link>
        <LocaleSelect />
      </div>
    </nav>
  );
};

export default Navbar;
