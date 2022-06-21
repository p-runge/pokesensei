import CenteredLayout from "@/components/CenteredLayout";
import { Button, Typography } from "@mui/material";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  const title = "PokéSensei";
  const copy =
    "Here you can test your Pokémon knowledge and see if you're a true Pokémon master!";

  return (
    <CenteredLayout style={{ textAlign: "left" }}>
      <Typography variant="h1" style={{ fontSize: "1rem" }}>
        <Image
          src="/logo-150h.png"
          width={594}
          height={150}
          alt={`${title}`}
          priority
        />
      </Typography>
      <Typography paragraph>{copy}</Typography>
      <Link href="/quiz">
        <Button variant="contained" size="large">
          Start
        </Button>
      </Link>
    </CenteredLayout>
  );
};

export default Home;
