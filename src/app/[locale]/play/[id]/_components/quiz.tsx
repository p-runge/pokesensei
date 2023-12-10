"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { type Prisma } from "@prisma/client";
import { usePathname, useRouter } from "~/navigation";
import { cn } from "~/server/utils/cn";
import type { api } from "~/trpc/server";
import Question from "./question";

export default function Quiz({
  quiz,
}: {
  quiz: Prisma.PromiseReturnType<typeof api.quiz.getById.query>;
}) {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();

  const [activeQuestionId, updateActiveQuestionId] = useState(0);

  const { questions } = quiz;

  useEffect(() => {
    if (activeQuestionId >= questions.length) {
      router.push(`${pathname}/evaluate`);
    }
  }, [activeQuestionId, questions.length]);

  const activeQuestion = questions[activeQuestionId];
  if (!activeQuestion) {
    return null;
  }

  return (
    <>
      {/* progress bar */}
      <p className="mb-2 text-center text-xl">
        {t("quiz_question_counter", {
          current: activeQuestionId + 1,
          max: questions.length,
        })}
      </p>
      <div className="flex h-4 rounded-lg">
        {/* segment */}
        {[...Array<void>(questions.length)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex-grow border-r-2 border-gray-800 first:rounded-l-lg last:rounded-r-lg last:border-r-0",
              i === activeQuestionId
                ? "bg-secondary"
                : i < activeQuestionId
                  ? "bg-primary"
                  : "bg-gray-400",
            )}
          />
        ))}
      </div>

      <div className="pb-6" />

      <Question
        key={activeQuestionId}
        question={activeQuestion}
        onAnswer={() => {
          updateActiveQuestionId(activeQuestionId + 1);
        }}
      />
    </>
  );
}
