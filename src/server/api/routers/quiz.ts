import { z } from "zod";
import { GENERATIONS } from "pokenode-ts";
import { QuestionType } from "@prisma/client";
import { getRandomElement } from "~/server/utils/random";
import {
  type QuestionWithAnswers,
  getQuestionByType,
} from "~/server/utils/question";
import { LANGUAGES_ISO, pokeApi } from "~/server/utils/api";
import { withDefaultedProps } from "~/server/utils/zod";
import { db } from "~/server/db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { type QuestionParams } from "~/server/utils/evaluate";
import { getLocalizedName } from "~/server/utils/common";

const quizRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        language: z.nativeEnum(LANGUAGES_ISO),
        questions: z.number().min(1),
        filters: withDefaultedProps(
          z.object({
            questionTypes: z
              .array(z.nativeEnum(QuestionType))
              .transform((value) =>
                value.length > 0 ? value : Object.values(QuestionType),
              )
              .default(Object.values(QuestionType)),
            generations: z
              .array(z.number().min(1).max(Object.values(GENERATIONS).length))
              .transform((value) =>
                value.length > 0 ? value : Object.values(GENERATIONS),
              )
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
              create: questions.map((question) => ({
                ...question.question,
                answers: {
                  create: question.answers.map((answer) => ({
                    value: answer.value,
                  })),
                },
              })),
            },
          },
          include: {
            questions: true,
          },
        });

        return quiz.id;
      },
    ),

  getById: publicProcedure
    .input(
      z.object({
        language: z.nativeEnum(LANGUAGES_ISO),
        id: z.string().uuid(),
      }),
    )
    .query(async ({ input: { language, id } }) => {
      const quiz = await db.quiz.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          questions: {
            include: {
              answers: {
                orderBy: {
                  id: "asc",
                },
              },
            },
          },
        },
      });

      const answers: Record<
        // question id
        string,
        Record<
          // answer value
          string,
          // answer label
          string
        >
      > = {};

      // fetch localized answers from PokeAPI
      await Promise.all(
        quiz.questions.map(async (question) => {
          const type = question.type as QuestionType;
          answers[question.id] = {};

          // each question type has a different resource in their answer and needs a different request
          if (type === QuestionType.NAME_OF_POKEMON_BY_IMAGE) {
            await Promise.all(
              question.answers.map(async (answer) => {
                const { names, name } = await pokeApi.getPokemonSpeciesByName(
                  answer.value,
                );
                answers[question.id]![answer.value] = getLocalizedName(
                  {
                    names,
                    name,
                  },
                  language,
                );
              }),
            );
          } else if (type === QuestionType.NATURE_BY_STATS) {
            await Promise.all(
              question.answers.map(async (answer) => {
                const { names, name } = await pokeApi.getNatureByName(
                  answer.value,
                );
                answers[question.id]![answer.value] = getLocalizedName(
                  {
                    names,
                    name,
                  },
                  language,
                );
              }),
            );
          } else if (type === QuestionType.TYPE_OF_POKEMON) {
            await Promise.all(
              question.answers.map(async (answer) => {
                const { names, name } = await pokeApi.getTypeByName(
                  answer.value,
                );
                answers[question.id]![answer.value] = getLocalizedName(
                  {
                    names,
                    name,
                  },
                  language,
                );
              }),
            );
          }
        }),
      );

      // return the quiz with the localized answers and discriminated Json objects
      return {
        ...quiz,
        questions: [
          ...quiz.questions.map((question) => {
            const type = question.type as QuestionType;
            const label =
              question.label as QuestionWithAnswers["question"]["label"];
            const params = question.params as QuestionParams<typeof type>;

            const answersToQuestion = answers[question.id]!;

            return {
              ...question,
              label,
              params,
              answers: Object.entries(answersToQuestion).map(
                ([value, label]) => ({
                  value,
                  label,
                }),
              ),
              // TODO: remove this after resolving discriminated types correctly
            } as { id: string } & QuestionWithAnswers["question"] & {
                answers: QuestionWithAnswers["answers"];
              };
          }),
        ],
      };
    }),

  evaluate: publicProcedure
    .input(
      z.object({
        language: z.nativeEnum(LANGUAGES_ISO),
        id: z.string().uuid(),
      }),
    )
    .query(async ({ input: { language, id } }) => {
      const quiz = await db.quiz.findUniqueOrThrow({
        where: {
          id,
        },
        include: {
          questions: {
            include: {
              answers: {
                orderBy: {
                  id: "asc",
                },
              },
            },
          },
        },
      });

      // check if all questions have been answered
      if (
        quiz.questions.some(
          (question) => !question.answers.some((answer) => answer.isChosen),
        )
      ) {
        throw new Error("Quiz is not completed");
      }

      const answers: Record<
        // question id
        string,
        Record<
          // answer value
          string,
          // answer label
          string
        >
      > = {};

      // fetch localized answers from PokeAPI
      await Promise.all(
        quiz.questions.map(async (question) => {
          const type = question.type as QuestionType;
          answers[question.id] = {};

          // each question type has a different resource in their answer and needs a different request
          if (type === QuestionType.NAME_OF_POKEMON_BY_IMAGE) {
            await Promise.all(
              question.answers.map(async (answer) => {
                const { names, name } = await pokeApi.getPokemonSpeciesByName(
                  answer.value,
                );
                answers[question.id]![answer.value] = getLocalizedName(
                  {
                    names,
                    name,
                  },
                  language,
                );
              }),
            );
          } else if (type === QuestionType.NATURE_BY_STATS) {
            await Promise.all(
              question.answers.map(async (answer) => {
                const { names, name } = await pokeApi.getNatureByName(
                  answer.value,
                );
                answers[question.id]![answer.value] = getLocalizedName(
                  {
                    names,
                    name,
                  },
                  language,
                );
              }),
            );
          } else if (type === QuestionType.TYPE_OF_POKEMON) {
            await Promise.all(
              question.answers.map(async (answer) => {
                const { names, name } = await pokeApi.getTypeByName(
                  answer.value,
                );
                answers[question.id]![answer.value] = getLocalizedName(
                  {
                    names,
                    name,
                  },
                  language,
                );
              }),
            );
          }
        }),
      );

      // return the quiz with the localized answers and discriminated Json objects
      return {
        ...quiz,
        questions: quiz.questions.map((question) => {
          const type = question.type as QuestionType;
          const label =
            question.label as QuestionWithAnswers["question"]["label"];
          const params = question.params as QuestionParams<typeof type>;

          const answersToQuestion = answers[question.id]!;

          return {
            ...question,
            type,
            label,
            params,
            answers: Object.entries(answersToQuestion).map(
              ([value, label]) => ({
                value,
                label,
                isChosen: question.answers.find(
                  (answer) => answer.value === value,
                )!.isChosen,
                isCorrect: question.answers.find(
                  (answer) => answer.value === value,
                )!.isCorrect,
              }),
            ),
          } as { id: string } & QuestionWithAnswers["question"] & {
              answers: (QuestionWithAnswers["answers"][number] & {
                isChosen: boolean;
                isCorrect: boolean;
              })[];
            };
        }),
      };
    }),
});

export default quizRouter;
