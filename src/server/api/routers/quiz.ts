import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { GENERATIONS } from "pokenode-ts";
import { QuestionType } from "@prisma/client";
import { getRandomElement } from "~/server/utils/random";
import { getQuestionByType } from "~/server/utils/question";
import { LANGUAGES_ISO } from "~/server/utils/api";
import { withDefaultedProps } from "~/server/utils/zod";
import { db } from "~/server/db";
import { type QuestionParams, solveQuestion } from "~/server/utils/evaluate";

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
        const questions = await Promise.all(
          // for whatever amount of times...
          [...Array<void>(amount)].map(async () => {
            // ...get a random question type...
            const questionType: QuestionType = getRandomElement<QuestionType>(
              questionTypes,
            ) as QuestionType;
            // ...generate a question of that type by requesting data from PokeAPI...
            const question = await getQuestionByType(
              questionType,
              language,
              filters,
            );

            // ...save it to the database...
            const savedQuestion = await db.question.create({
              data: question.question,
            });

            // ...and return the question with the saved ID
            return {
              ...savedQuestion,
              ...question.question,
              answers: question.answers,
            };
          }),
        );

        return questions;
      },
    ),

  answerQuestion: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        answer: z.string(),
      }),
    )
    .mutation(async ({ input: { id, answer } }) => {
      const question = await db.question.findUniqueOrThrow({
        where: { id },
      });

      const correctAnswers = await solveQuestion(
        question.type,
        question.params as QuestionParams<typeof question.type>,
      );

      const isCorrect = correctAnswers.includes(answer);

      await db.answer.create({
        data: {
          label: answer,
          isCorrect,
          questionId: id,
        },
      });

      return isCorrect;
    }),
});

export default quizRouter;
