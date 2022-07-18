import * as trpc from "@trpc/server";
import { z } from "zod";
import { getRandomElement } from "../utils/random";
import {
  getNameOfPokemonByImage,
  getTypeOfPokemon,
  QuestionWithAnswers,
  QuestionType,
  questionTypeToDataMap,
} from "../utils/question";
import {
  validateNameOfPokemon,
  validateTypeOfPokemon,
} from "../utils/validate";

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
  })

  .mutation("answer-question", {
    input: z.object({
      type: z.nativeEnum(QuestionType),
      additionalData: z.object({
        id: z.number(),
      }),
      answer: z.string(),
    }),
    resolve({ input: { type, additionalData, answer } }): Promise<boolean> {
      switch (type) {
        case QuestionType.TYPE_OF_POKEMON: {
          return validateTypeOfPokemon(additionalData.id, answer);
        }
        case QuestionType.NAME_OF_POKEMON_BY_IMAGE:
          return validateNameOfPokemon(additionalData.id, answer);

        default:
          throw new Error(`Invalid question type requested: ${type}`);
      }
    },
  })

  .query("get-quiz", {
    input: z.object({
      amount: z.number().min(1).max(10),
      filters: z
        .object({
          // TODO: add multiple filters here later on
          type: z.nativeEnum(QuestionType).optional(),
        })
        .default({}),
    }),
    resolve({ input: { amount } }) {
      const pAll: Promise<QuestionWithAnswers>[] = [];
      for (let i = 0; i < amount; i++) {
        // TODO: consider filters
        const questionType = getRandomElement(Object.values(QuestionType));
        const p = questionTypeToDataMap[questionType]();
        pAll.push(p);
      }

      return Promise.all(pAll);
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
