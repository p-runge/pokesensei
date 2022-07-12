import Image from "next/image";
import Link from "next/link";

interface Props {
  navItems: { label: string; route: string }[];
}

const Navbar: React.FC<Props> = ({ navItems }) => {
  const title = "PokéSensei";

  return (
    <nav className="fixed w-full flex items-center h-header bg-gray-700 shadow-lg">
      <div className="flex justify-between items-center w-full px-6">
        <Link href="/">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
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
        <div className="none sm:block">
          {/* <div sx={{ display: { xs: "none", sm: "block" } }}> */}
          {navItems.map(({ label, route }) => (
            <Link key={route} href={route}>
              <button
                type="button"
                className="text-white hover:bg-gray-600 rounded px-6 py-3"
              >
                {label}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;