import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "@/server/router";

// eslint-disable-next-line import/prefer-default-export
export const trpc = createReactQueryHooks<AppRouter>();
