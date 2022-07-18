import { createReactQueryHooks } from "@trpc/react";
import type { AppRouter } from "@/server/router";
import { UseQueryResult } from "react-query";
import { QuestionWithAnswers, QuestionType } from "@/server/utils/question";

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
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
};

export const generateQuiz = (
  amount: number,
  filters?: Record<"type", QuestionType>
) => {
  return trpc.useQuery(
    [
      "get-quiz",
      {
        amount,
        filters,
      },
    ],
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );
};
