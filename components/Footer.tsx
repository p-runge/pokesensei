import Link from "next/link";
import { Fragment } from "react";

interface Props {
  navItems: { label: string; route: string }[];
}

const Footer: React.FC<Props> = ({ navItems }) => {
  return (
    <footer className="fixed bottom-0 h-footer w-full">
      <div className="flex justify-end items-center w-full h-full">
        {navItems.map(({ label, route }, id) => (
          <Fragment key={route}>
            {id !== 0 && <hr />}
            <Link href={route}>
              <span
                style={{
                  padding: "0 1rem",
                  cursor: "pointer",
                }}
              >
                {label}
              </span>
            </Link>
          </Fragment>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
