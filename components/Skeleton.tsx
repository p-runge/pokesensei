const Skeleton: React.FC<{
  isLoading: boolean;
  children: React.ReactNode;
  width?: string;
  height?: string;
}> = ({ isLoading, children, width, height }) => {
  return isLoading ? (
    <span
      className={`block m-auto h-4${width ? ` ${width}` : ""}${
        height ? ` ${height}` : ""
      } rounded-lg bg-slate-300 animate-pulse`}
    />
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  );
};

export default Skeleton;
