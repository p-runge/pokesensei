"use client";

import type { QuestionWithAnswers } from "~/server/utils/question";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Question from "./question";
import { useRouter } from "next/navigation";

const Quiz: React.FC<{
  questions: QuestionWithAnswers[];
}> = ({ questions }) => {
  const t = useTranslations();
  const router = useRouter();

  const [activeQuestionId, updateActiveQuestionId] = useState(0);
  const [history, updateHistory] = useState([
    ...Array<void>(questions.length).map(() => false),
  ]);

  useEffect(() => {
    if (activeQuestionId >= questions.length) {
      router.push("/play/evaluate");
    }
  }, [activeQuestionId, questions.length]);

  const activeQuestion = questions[activeQuestionId];
  if (!activeQuestion) {
    return null;
  }

  return (
    <>
      {/* progress bar */}
      <p className="mb-2 text-center">
        {t("quiz_question_counter", {
          current: activeQuestionId + 1,
          max: questions.length,
        })}
      </p>
      <div className="flex h-4 rounded-lg">
        {/* segment */}
        {history.map((item, i) => (
          <div
            key={i}
            className={clsx(
              "flex-grow border-r-2 border-gray-800 first:rounded-l-lg last:rounded-r-lg last:border-r-0",
              item ? "bg-secondary" : "bg-gray-400",
            )}
          />
        ))}
      </div>

      <div className="pb-6" />

      <Question
        question={activeQuestion}
        onAnswer={() => {
          const newHistory = history;
          newHistory[activeQuestionId] = true;
          updateHistory(newHistory);
          updateActiveQuestionId(activeQuestionId + 1);
        }}
      />
    </>
  );
};

export default Quiz;
