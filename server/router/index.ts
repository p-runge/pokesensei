import * as trpc from "@trpc/server";

export const appRouter = trpc.router().query("get-random-question", {
  resolve() {
    return {
      question: `What's the type of Pikachu?`,
      answers: ["Steel", "Fire", "Electric", "Water"],
    };
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;
