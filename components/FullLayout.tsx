import Footer from "./Footer";
import Navbar from "./Navbar";

interface Props {
  children?: React.ReactNode;
}

const FullLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar
        navItems={[
          {
            label: "Quiz",
            route: "/quiz",
          },
        ]}
      />

      {/* fixed navbar + footer spacer */}
      <div className="min-h-full pt-header pb-footer">
        <main className="h-full text-center p-6">{children}</main>
      </div>

      <Footer navItems={[{ label: "Credits", route: "/credits" }]} />
    </>
  );
};

export default FullLayout;
