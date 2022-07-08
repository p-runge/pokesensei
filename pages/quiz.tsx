import FullLayout from "@/components/FullLayout";
import { getIdOfNamedRes, shuffle } from "@/utils/common";
import {
  getRandomElement,
  getRandomPokemonId,
  getRandomPokemonTypeIds,
} from "@/utils/random";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import { useMemo, useState } from "react";

const Quiz: NextPage = () => {
  // get random pokemon
  const [pokemonId] = useState(getRandomPokemonId());
  const pokemonQuery = trpc.useQuery(["get-pokemon-by-id", { id: pokemonId }]);

  // setup question
  const question = useMemo(
    () => pokemonQuery.data && `Which is a type of ${pokemonQuery.data.name}?`,
    [pokemonQuery.data]
  );

  // extract type data
  const typeId = useMemo(
    () =>
      pokemonQuery.data &&
      getIdOfNamedRes(getRandomElement(pokemonQuery.data.types).type),
    [pokemonQuery.data]
  ) as number;

  // get random ids
  const typeIdNots = useMemo(
    () =>
      pokemonQuery.data?.types
        .map((t) => getIdOfNamedRes(t.type))
        .filter((t) => t !== typeId) ?? [],
    [pokemonQuery.data, typeId]
  );
  const typeIds = useMemo(
    () => [typeId, ...getRandomPokemonTypeIds(3, [typeId, ...typeIdNots])],
    [typeId, typeIdNots]
  );
  const typesQuery = trpc.useQuery([
    "get-pokemon-types-by-ids",
    { ids: typeIds },
  ]);

  // setup answers
  const answers = useMemo(
    () => typesQuery.data && shuffle(typesQuery.data.map((t) => t.name)),
    [typesQuery.data]
  );

  return (
    <FullLayout>
      {!answers ? (
        <div>Loading...</div>
      ) : (
        // wrapper
        <div className="flex flex-col w-[1200px] m-auto max-w-full">
          {/* question */}
          <div className="p-4 w-full bg-gray-700 rounded-lg">
            <span className="capitalize">{question}</span>
          </div>

          {/* answers */}
          <div className="grid grid-cols-2 mt-4 gap-4">
            {answers.map((answer) => (
              <button
                key={answer}
                type="button"
                className="p-4 w-full bg-primary rounded-lg"
              >
                <span className="capitalize">{answer}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </FullLayout>
  );
};

export default Quiz;
