const CenteredLayout: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center text-center h-full p-4">
      {children}
    </div>
  );
};

export default CenteredLayout;
