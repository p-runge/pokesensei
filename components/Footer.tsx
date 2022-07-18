import Link from "next/link";
import { Fragment } from "react";

const Footer: React.FC<{
  navItems: { label: string; route: string }[];
}> = ({ navItems }) => {
  return (
    <footer className="fixed bottom-0 h-footer w-full">
      <div className="flex justify-end items-center w-full h-full">
        {navItems.map(({ label, route }, id) => (
          <Fragment key={route}>
            {id !== 0 && <hr />}
            <Link href={route} passHref>
              <a className="text-white px-4 py-0">{label}</a>
            </Link>
          </Fragment>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
