import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { GENERATIONS } from "pokenode-ts";
import { QuestionType } from "@prisma/client";
import { getRandomElement } from "~/server/utils/random";
import { getQuestionByType } from "~/server/utils/question";
import { LANGUAGES_ISO } from "~/server/utils/api";
import { withDefaultedProps } from "~/server/utils/zod";

const quizRouter = createTRPCRouter({
  getQuestions: publicProcedure
    .input(
      z.object({
        language: z.nativeEnum(LANGUAGES_ISO).default(LANGUAGES_ISO.en),
        amount: z.number().min(1),
        test: withDefaultedProps(
          z.object({
            foo: z.string().default("bar"),
          }),
        ),
        filters: withDefaultedProps(
          z.object({
            questionTypes: z
              .array(z.nativeEnum(QuestionType))
              .default(Object.values(QuestionType)),
            generations: z
              .array(z.number().min(1).max(Object.values(GENERATIONS).length))
              .default(
                [...Array<void>(Object.values(GENERATIONS).length)].map(
                  (_, i) => i + 1,
                ),
              ),
          }),
        ),
      }),
    )
    .query(
      async ({
        input: {
          amount,
          language,
          filters: { questionTypes, ...filters },
        },
      }) => {
        return await Promise.all(
          [...Array<void>(amount)].map(() => {
            const questionType: QuestionType = getRandomElement<QuestionType>(
              questionTypes,
            ) as QuestionType;
            return getQuestionByType(questionType, language, filters);
          }),
        );
      },
    ),
});

export default quizRouter;
