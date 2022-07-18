import React from "react";

const Loader: React.FC<{
  isLoading: boolean;
  children: React.ReactNode;
}> = ({ isLoading, children }) => {
  return isLoading ? (
    <div className="relative inline-flex w-20 h-20">
      <LoaderBase className=" animate-ping" />
      <LoaderBase />
    </div>
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
};

const LoaderBase: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={`inline-block w-10 h-10 rounded-full absolute top-5 left-5 bg-primary ${className}`}
    />
  );
};
LoaderBase.defaultProps = {
  className: "",
};

export default Loader;
