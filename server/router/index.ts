import * as trpc from "@trpc/server";
import { z } from "zod";
import { PokemonClient } from "pokenode-ts";

const api = new PokemonClient();

export const appRouter = trpc
  .router()

  .query("get-pokemon-by-id", {
    input: z.object({
      id: z.number(),
    }),
    resolve({ input: { id } }) {
      return api.getPokemonById(id);
    },
  })

  .query("get-pokemon-type-by-id", {
    input: z.object({
      id: z.number(),
    }),
    resolve({ input: { id } }) {
      return api.getTypeById(id);
    },
  })

  .query("get-pokemon-types-by-ids", {
    input: z.object({
      ids: z.array(z.number()),
    }),
    resolve({ input: { ids } }) {
      return Promise.all(ids.map((id) => api.getTypeById(id)));
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
