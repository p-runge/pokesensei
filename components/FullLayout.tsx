import Footer from "./Footer";
import Navbar from "./Navbar";

const FullLayout: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <Navbar />

      {/* fixed navbar + footer spacer */}
      <div className="min-h-full pt-header pb-footer">
        <main className="h-full max-w-[1200px] m-auto text-center p-6">
          {children}
        </main>
      </div>

      <Footer navItems={[{ label: "Credits", route: "/credits" }]} />
    </>
  );
};

export default FullLayout;
