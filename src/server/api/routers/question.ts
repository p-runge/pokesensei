import { z } from "zod";
import { db } from "~/server/db";
import { type QuestionParams, solveQuestion } from "~/server/utils/evaluate";
import { createTRPCRouter, publicProcedure } from "../trpc";

const quizRouter = createTRPCRouter({
  answer: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
        value: z.string(),
      }),
    )
    .mutation(async ({ input: { id, value } }) => {
      const question = await db.question.findUniqueOrThrow({
        where: { id },
        include: {
          answers: true,
        },
      });

      const correctAnswers = await solveQuestion(
        question.type,
        question.params as QuestionParams<typeof question.type>,
      );

      await Promise.all(
        question.answers.map(async (answer) => {
          const isCorrect = correctAnswers.includes(answer.value);

          await db.answer.update({
            where: {
              id: answer.id,
            },
            data: {
              isChosen: answer.value === value,
              isCorrect,
            },
          });
        }),
      );
    }),
});

export default quizRouter;
