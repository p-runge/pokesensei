import { Button, Container, Typography, Box } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  const title = "PokéSensei";
  const copy =
    "Here you can test your Pokémon knowledge and see if you're a true Pokémon master!";

  return (
    <Container
      component="main"
      style={{ height: "100vh", textAlign: "center" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Typography variant="h1" style={{ fontSize: "1rem" }}>
          <Image
            src="/logo.png"
            width={476}
            height={128}
            alt={`${title}_logo`}
            priority
          />
        </Typography>
        <Typography paragraph>{copy}</Typography>
        <Button variant="contained" size="large">
          Start
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
