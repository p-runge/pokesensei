import CenteredLayout from "./CenteredLayout";
import Footer from "./Footer";
import Navbar from "./Navbar";

const FullLayout: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <Navbar />

      {/* fixed navbar + footer spacer */}
      <div className="h-full pt-header pb-footer">
        <CenteredLayout noVerticalCenter>{children}</CenteredLayout>
      </div>

      <Footer navItems={[{ label: "Credits", route: "/credits" }]} />
    </>
  );
};

export default FullLayout;
