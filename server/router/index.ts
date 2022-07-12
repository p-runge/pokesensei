import * as trpc from "@trpc/server";
import { z } from "zod";
import { QuestionType } from "@/pages/quiz";
import { getTypeOfPokemon } from "@/server/utils/question";

export const appRouter = trpc
  .router()

  .query("get-question-by-type", {
    input: z.object({
      type: z.nativeEnum(QuestionType),
    }),
    resolve({ input: { type } }) {
      switch (type) {
        case QuestionType.TYPE_OF_POKEMON:
          return getTypeOfPokemon();

        default:
          throw new Error(`Invalid question type requested: ${type}`);
      }
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
