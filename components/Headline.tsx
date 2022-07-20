const Headline: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <h2 className="text-6xl mb-6">{children}</h2>;
};

export default Headline;
