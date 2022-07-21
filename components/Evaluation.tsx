import { useTranslation } from "next-i18next";
import Link from "next/link";
import React from "react";
import EvaluatedQuestion, { EvaluatedQuestionData } from "./EvaluatedQuestion";

const Evaluation: React.FC<{
  data: EvaluatedQuestionData[];
}> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full">
      <p>
        {t("quiz_evaluation_absolute", {
          correct: data.filter((item) =>
            item.correctAnswers.includes(item.givenAnswer)
          ).length,
          max: data.length,
        })}
      </p>
      <p>
        {t("quiz_evaluation_percentage", {
          percentage: Math.round(
            (100 / data.length) *
              data.filter((item) =>
                item.correctAnswers.includes(item.givenAnswer)
              ).length
          ),
        })}
      </p>

      <div className="pb-6" />

      {data.map((evaluatedQuestion, i) => (
        <React.Fragment key={`evaluation-question-${i}`}>
          <p>{t("evaluation_question_title", { id: i + 1 })}</p>
          <div className="pb-2" />
          <EvaluatedQuestion data={evaluatedQuestion} />
        </React.Fragment>
      ))}

      <div className="pb-6" />

      <div className="-m-2">
        <Link href="/setup" passHref>
          <a className="btn-primary m-2">{t("quiz_change_setup_button")}</a>
        </Link>

        {/* simply hardrefresh here to load /play freshly with previous setup query */}
        <a href={window.location.href} className="btn-primary m-2">
          {t("quiz_replay_button")}
        </a>
      </div>
    </div>
  );
};

export default Evaluation;
