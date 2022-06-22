import FullLayout from "@/components/FullLayout";
import { getIdOfNamedRes, shuffle } from "@/utils/common";
import {
  getRandomElement,
  getRandomPokemonId,
  getRandomPokemonTypeIds,
} from "@/utils/random";
import { trpc } from "@/utils/trpc";
import { Box, Button, capitalize, Paper, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useMemo, useState } from "react";

const Quiz: NextPage = () => {
  // get random pokemon
  const [pokemonId] = useState(getRandomPokemonId());
  const pokemonQuery = trpc.useQuery(["get-pokemon-by-id", { id: pokemonId }]);

  // setup question
  const question = useMemo(
    () =>
      pokemonQuery.data &&
      `Which is a type of ${capitalize(pokemonQuery.data.name)}?`,
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
    () =>
      typesQuery.data &&
      shuffle(typesQuery.data.map((t) => capitalize(t.name))),
    [typesQuery.data]
  );

  if (!answers) {
    return <div>Loading...</div>;
  }

  return (
    <FullLayout>
      <Box
        display="flex"
        flexDirection="column"
        style={{
          width: "100%",
          height: "300px",
        }}
      >
        <Paper
          elevation={24}
          style={{ padding: "2rem 1rem", marginBottom: "1rem" }}
        >
          <Typography variant="h5" component="span">
            {question}
          </Typography>
        </Paper>
        <Box
          display="grid"
          gridTemplateColumns="calc(50% - .5rem) auto"
          gridRow="auto"
          style={{
            gridColumnGap: "1rem",
            gridRowGap: "1rem",
            marginBottom: "1rem",
          }}
        >
          {answers.map((answer) => (
            <Button
              key={answer}
              variant="contained"
              style={{ padding: "1rem", textTransform: "initial" }}
            >
              <Typography variant="h5" component="span">
                {answer}
              </Typography>
            </Button>
          ))}
        </Box>
      </Box>
    </FullLayout>
  );
};

export default Quiz;
