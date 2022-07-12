import * as trpc from "@trpc/server";
import { z } from "zod";
import { Pokemon, PokemonClient } from "pokenode-ts";
import {
  getRandomElement,
  getRandomPokemonId,
  getRandomPokemonTypeIds,
} from "@/server/utils/random";
import { capitalize, getIdOfNamedRes, shuffle } from "@/server/utils/common";
import { QuestionType } from "@/pages/quiz";

const ONE_DAY = 1000 * 60 * 60 * 24;

const api = new PokemonClient({
  cacheOptions: { maxAge: ONE_DAY, exclude: { query: false } },
});

// export enum QuestionType {
//   TYPE_OF_POKEMON = "TYPE_OF_POKEMON",
// }

interface I18nString {
  string: string;
  params: Record<string, string | number | boolean>;
}

export const appRouter = trpc
  .router()

  .query("get-question-by-type", {
    input: z.object({
      type: z.nativeEnum(QuestionType),
    }),
    async resolve({ input: { type } }) {
      const question: I18nString = {
        string: "",
        params: {},
      };
      const answers: string[] = [];
      const amountAnswers = 4;
      if (type === QuestionType.TYPE_OF_POKEMON) {
        // question
        const id = getRandomPokemonId();
        const pokemon: Pokemon = await api.getPokemonById(id);
        question.string = "question_type_of_pokemon";
        question.params = {
          name: capitalize(pokemon.name),
        };

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
        shuffle(types).forEach((t) => answers.push(capitalize(t.name)));
      }

      return {
        question,
        answers,
      };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
