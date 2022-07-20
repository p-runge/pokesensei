const CenteredLayout: React.FC<{
  children?: React.ReactNode;
  noVerticalCenter?: boolean;
}> = ({ children, noVerticalCenter = false }) => {
  return (
    <main
      className={`h-full w-boxed max-w-full m-auto flex flex-col ${
        noVerticalCenter ? "" : "justify-center"
      } items-center text-center p-4`}
    >
      {children}
    </main>
  );
};

export default CenteredLayout;
