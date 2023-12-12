import { type inferRouterOutputs } from "@trpc/server";
import { createTRPCRouter } from "~/server/api/trpc";
import quizRouter from "./routers/quiz";
import questionRouter from "./routers/question";
import userRouter from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  quiz: quizRouter,
  question: questionRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export type QueryReturnType = inferRouterOutputs<AppRouter>;
