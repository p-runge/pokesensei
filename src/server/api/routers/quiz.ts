import { z } from "zod";
import { GENERATIONS } from "pokenode-ts";
import { QuestionType } from "@prisma/client";
import { getRandomElement } from "~/server/utils/random";
import { getQuestionByType } from "~/server/utils/question";
import { LANGUAGES_ISO } from "~/server/utils/api";
import { withDefaultedProps } from "~/server/utils/zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";

const quizRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        language: z.nativeEnum(LANGUAGES_ISO).default(LANGUAGES_ISO.en),
        questions: z.number().min(1),
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
          questions: questionAmount,
          language,
          filters: { questionTypes, ...filters },
        },
      }) => {
        const questions = await Promise.all(
          // for whatever amount of times...
          [...Array<void>(questionAmount)].map(async () => {
            // ...get a random question type...
            const questionType: QuestionType = getRandomElement<QuestionType>(
              questionTypes,
            ) as QuestionType;
            // ...and generate a question of that type by requesting data from PokeAPI
            return getQuestionByType(questionType, language, filters);
          }),
        );

        const quiz = await db.quiz.create({
          data: {
            questions: {
              createMany: {
                data: questions.map((question) => ({
                  ...question.question,
                  answers: question.answers.map((answer) => answer.value),
                })),
              },
            },
          },
          include: {
            questions: true,
          },
        });

        return {
          ...quiz,
          questions: [
            ...quiz.questions.map((question, i) => {
              const q = questions[i]!;

              return {
                ...question,
                ...q.question,
                answers: q.answers,
              };
            }),
          ],
        };
      },
    ),
});

export default quizRouter;
