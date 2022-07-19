import { QuestionWithAnswers } from "@/server/utils/question";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useState } from "react";
import Question from "./Question";

const Quiz: React.FC<{ data: QuestionWithAnswers[] }> = ({ data }) => {
  const { t } = useTranslation("common");

  const [activeQuestion, updateActiveQuestion] = useState(0);
  const [history, updateHistory] = useState([] as (boolean | undefined)[]);

  return (
    <div>
      {/* progress bar */}
      <p className="mb-2">
        {(activeQuestion >= data.length && t("quiz_finished")) ||
          t("quiz_question_counter", {
            current: activeQuestion + 1,
            max: data.length,
          })}
      </p>
      <div className="flex h-4 rounded-lg">
        {/* segment */}
        {[...Array(data.length)].map((_, i) => (
          <div
            key={`progress-bar-segment-${i}`}
            className={`flex-grow border-r-2 last:border-r-0 first:rounded-l-lg last:rounded-r-lg border-gray-800 ${
              (history[i] !== undefined &&
                ((history[i] && "bg-success") || "bg-error")) ||
              "bg-gray-400"
            }`}
          />
        ))}
      </div>

      <div className="pb-6" />

      {(data[activeQuestion] && (
        <Question
          data={data[activeQuestion]}
          onAnswer={(_answer, isCorrect) => {
            updateHistory(history.concat(isCorrect));
            updateActiveQuestion(activeQuestion + 1);
          }}
        />
      )) || (
        <>
          <p>
            {t("quiz_evaluation_absolute", {
              correct: history.filter((item) => item).length,
              max: data.length,
            })}
          </p>
          <p>
            {t("quiz_evaluation_percentage", {
              percentage: Math.round(
                (100 / data.length) * history.filter((item) => item).length
              ),
            })}
          </p>

          <div className="pb-6" />

          <Link href="/" passHref>
            <a className="btn-primary">{t("quiz_home_button")}</a>
          </Link>
        </>
      )}
    </div>
  );
};

export default Quiz;
