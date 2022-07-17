import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "@/server/router";
import { QuestionType } from "@/components/Question";
import { UseQueryResult } from "react-query";
import { QuestionWithAnswers } from "@/server/utils/question";

// eslint-disable-next-line import/prefer-default-export
export const trpc = createReactQueryHooks<AppRouter>();

export const generateQuestion = (
  type: QuestionType
): UseQueryResult<QuestionWithAnswers> => {
  return trpc.useQuery(
    [
      "get-question-by-type",
      {
        type,
      },
    ],
    {
      refetchInterval: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
};
