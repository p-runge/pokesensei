import CenteredLayout from "@/components/CenteredLayout";
import type { NextPage } from "next";
import Image from "next/future/image";
import Link from "next/link";

const Home: NextPage = () => {
  const title = "PokéSensei";
  const copy =
    "Test your Pokémon knowledge and see if you're a true Pokémon master!";

  return (
    <CenteredLayout>
      <h1 className="relative">
        <Image
          src="/logo-150h.png"
          width={594}
          height={150}
          alt={`${title}`}
          priority
        />
        <div className="absolute bottom-0 right-0 -rotate-12 text-3xl px-2 border-2 rounded-full border-red-500 text-red-500 bg-gray-800">
          Beta
        </div>
      </h1>
      <p className="mt-3">{copy}</p>
      <div className="pb-6" />
      <Link href="/play" passHref>
        <a className="btn-primary text-2xl">Start</a>
      </Link>
    </CenteredLayout>
  );
};

export default Home;
