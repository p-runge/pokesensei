import { z } from "zod";
import { db } from "~/server/db";
import { type QuestionParams, solveQuestion } from "~/server/utils/evaluate";
import { createTRPCRouter, publicProcedure } from "../trpc";

const quizRouter = createTRPCRouter({
  answer: publicProcedure
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
