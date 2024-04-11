import { cn } from "~/server/utils/cn";
import Navbar from "./navbar";

export default function MainLayout({
  children,
  center = false,
  fullScreen = false,
}: {
  children: React.ReactNode;
  center?: boolean;
  fullScreen?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div
        className={cn(
          "m-auto flex min-h-screen w-boxed max-w-full justify-center px-4",
          fullScreen ? "py-4" : "pb-10 pt-20",
        )}
      >
        <main
          className={cn("w-full", center && "flex items-center justify-center")}
        >
          {children}
        </main>
      </div>

      {!fullScreen && (
        <>
          <Navbar />
          <footer className="-mt-6 flex w-full justify-center pb-1 text-sm font-light">
            {/* eslint-disable-next-line react/jsx-no-target-blank */}
            <a href="https://p6.gg/" target="_blank">
              Made with <span className="text-red-500">❤</span> by{" "}
              <span className="font-bold text-[#F79B3A]">P6</span>
            </a>
          </footer>
        </>
      )}
    </div>
  );
}
