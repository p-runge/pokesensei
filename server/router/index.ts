import * as trpc from "@trpc/server";
import { z } from "zod";
import {
  getNameOfPokemonByImage,
  getTypeOfPokemon,
  QuestionWithAnswers,
} from "@/server/utils/question";
import { QuestionType } from "@/components/Question";

export const appRouter = trpc
  .router()

  .query("get-question-by-type", {
    input: z.object({
      type: z.nativeEnum(QuestionType),
    }),
    resolve({ input: { type } }): Promise<QuestionWithAnswers> {
      switch (type) {
        case QuestionType.TYPE_OF_POKEMON:
          return getTypeOfPokemon();
        case QuestionType.NAME_OF_POKEMON_BY_IMAGE:
          return getNameOfPokemonByImage();

        default:
          throw new Error(`Invalid question type requested: ${type}`);
      }
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
