import * as trpc from "@trpc/server";
import { z } from "zod";
import { Pokemon, PokemonClient } from "pokenode-ts";
import {
  getRandomElement,
  getRandomPokemonId,
  getRandomPokemonTypeIds,
} from "@/server/utils/random";
import { getIdOfNamedRes, shuffle } from "@/server/utils/common";
import { QuestionType } from "@/pages/quiz";

const ONE_DAY = 1000 * 60 * 60 * 24;

const api = new PokemonClient({
  cacheOptions: { maxAge: ONE_DAY, exclude: { query: false } },
});

// export enum QuestionType {
//   TYPE_OF_POKEMON = "TYPE_OF_POKEMON",
// }

export const appRouter = trpc
  .router()

  .query("get-question-by-type", {
    input: z.object({
      type: z.nativeEnum(QuestionType),
    }),
    async resolve({ input: { type } }) {
      let question = "";
      const answers: string[] = [];
      const amountAnswers = 4;
      if (type === QuestionType.TYPE_OF_POKEMON) {
        // question
        const id = getRandomPokemonId();
        const pokemon: Pokemon = await api.getPokemonById(id);
        question = `Select a type of ${pokemon.name}`;

        // answers
        const typeId = getIdOfNamedRes(getRandomElement(pokemon.types).type);
        const typeIdNots =
          pokemon.types
            .map((t) => getIdOfNamedRes(t.type))
            .filter((t) => t !== typeId) ?? [];
        const typeIds = [
          typeId,
          ...getRandomPokemonTypeIds(amountAnswers - 1, [
            typeId,
            ...typeIdNots,
          ]),
        ];
        const types = await Promise.all(
          typeIds.map((tId) => api.getTypeById(tId))
        );
        shuffle(types).forEach((t) => answers.push(t.name));
      }

      return {
        question,
        answers,
      };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
