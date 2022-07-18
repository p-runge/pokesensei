const CenteredLayout: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      {children}
    </div>
  );
};

export default CenteredLayout;
