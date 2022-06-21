import FullLayout from "@/components/FullLayout";
import { Box, Link, Typography } from "@mui/material";

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
      <Typography variant="h2">Credits</Typography>
      <Typography paragraph>
        Special thanks to the following sources:
      </Typography>
      <Box display="flex" flexDirection="column">
        {credits.map(({ component, source, url }) => (
          <p key={`credit-${source}-${component}`}>
            {component}
            {": "}
            <Link target="_blank" href={url} rel="noreferrer">
              {source}
            </Link>
          </p>
        ))}
      </Box>
    </FullLayout>
  );
};
