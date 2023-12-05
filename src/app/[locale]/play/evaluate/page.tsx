import { useTranslations } from "next-intl";
import EvaluatedQuestion, {
  type EvaluatedQuestionData,
} from "./_components/evaluated-question";
import React from "react";
import Link from "~/components/link";

export default function Evaluate() {
  const t = useTranslations();

  // TODO: fetch data from api
  const data = [] as any[];

  return (
    <div className="w-full">
      <p>
        {t("quiz_evaluation_absolute", {
          // TODO: calculate based no correct answers
          correct: true,
          max: data.length,
        })}
      </p>
      <p>
        {t("quiz_evaluation_percentage", {
          percentage: Math.round(
            (100 / data.length || 1) *
              // data.filter((item) =>
              //   item.correctAnswers.includes(item.givenAnswer),
              // ).length,
              data.length || 1,
          ),
        })}
      </p>

      <div className="pb-6" />

      {data.map((evaluatedQuestion, i) => (
        <React.Fragment key={`evaluation-question-${i}`}>
          <p>{t("evaluation_question_title", { id: i + 1 })}</p>
          <div className="pb-2" />
          <EvaluatedQuestion
            // TODO: remove cast
            data={evaluatedQuestion as EvaluatedQuestionData}
          />
        </React.Fragment>
      ))}

      <div className="pb-6" />

      <div className="flex gap-2">
        <Link href="/setup" variant="primary">
          {t("quiz_change_setup_button")}
        </Link>

        <Link href="/play" variant="primary">
          {t("quiz_replay_button")}
        </Link>
      </div>
    </div>
  );
}
