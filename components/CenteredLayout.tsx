type Props = {
  children?: React.ReactNode;
};

const CenteredLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center h-full">
      {children}
    </div>
  );
};

export default CenteredLayout;
