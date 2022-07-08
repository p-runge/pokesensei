import FullLayout from "@/components/FullLayout";

interface Credit {
  component: string;
  source: string;
  url: string;
}

export default () => {
  const credits: Credit[] = [
    {
      component: "Logos",
      source: "Font Meme",
      url: "https://fontmeme.com/",
    },
  ];

  return (
    <FullLayout>
      <h2 className="text-6xl mb-6">Credits</h2>
      <p className="mb-3">Special thanks to the following sources:</p>
      <div className="flex flex-col">
        {credits.map(({ component, source, url }) => (
          <p key={`credit-${source}-${component}`}>
            {component}
            {": "}
            <a target="_blank" href={url} rel="noreferrer">
              {source}
            </a>
          </p>
        ))}
      </div>
    </FullLayout>
  );
};
