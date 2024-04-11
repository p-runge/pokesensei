import { createTRPCRouter, protectedProcedure } from "../trpc";

const userRouter = createTRPCRouter({
  getQuizzes: protectedProcedure.query(({ ctx }) => {
    const userId = ctx.session.user.id;

    return ctx.db.quiz.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });
  }),
});

export default userRouter;
