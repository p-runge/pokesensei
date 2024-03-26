import questionRouter from "./router/question";
import quizRouter from "./router/quiz";
import userRouter from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  quiz: quizRouter,
  question: questionRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
