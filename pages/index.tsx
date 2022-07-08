import CenteredLayout from "@/components/CenteredLayout";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

const Home: NextPage = () => {
  const title = "PokéSensei";
  const copy =
    "Here you can test your Pokémon knowledge and see if you're a true Pokémon master!";

  return (
    <CenteredLayout>
      <h1>
        <Image
          src="/logo-150h.png"
          width={594}
          height={150}
          alt={`${title}`}
          priority
        />
      </h1>
      <p className="mt-3">{copy}</p>
      <Link href="/quiz">
        <button
          type="button"
          className="bg-primary text-white font-bold text-2xl py-2 px-4 rounded mt-6"
        >
          Start
        </button>
      </Link>
    </CenteredLayout>
  );
};

export default Home;
