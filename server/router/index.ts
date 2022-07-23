import * as trpc from "@trpc/server";
import { z } from "zod";
import { getRandomElement } from "../utils/random";
import {
  QuestionWithAnswers,
  QuestionType,
  getQuestionByType,
} from "../utils/question";
import { solveQuestionByType } from "../utils/evaluate";

export const appRouter = trpc
  .router()

  .query("get-questions", {
    input: z.object({
      lang: z.string(),
      amount: z.number().min(1).max(10),
      filters: z
        .object({
          // TODO: add multiple filters here later on
          questionTypes: z.array(z.nativeEnum(QuestionType)).optional(),
        })
        .default({}),
    }),
    resolve({
      input: {
        amount,
        lang,
        filters: { questionTypes },
      },
    }) {
      const pAll: Promise<QuestionWithAnswers>[] = [];
      for (let i = 0; i < amount; i++) {
        // TODO: consider filters
        const questionType = getRandomElement(
          questionTypes || Object.values(QuestionType)
        );
        const p = getQuestionByType(questionType, lang);
        pAll.push(p);
      }

      return Promise.all(pAll);
    },
  })

  .mutation("answer-question", {
    input: z.object({
      type: z.nativeEnum(QuestionType),
      params: z.any(),
    }),
    resolve({ input: { type, params } }): Promise<string[]> {
      return solveQuestionByType(type, params);
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
