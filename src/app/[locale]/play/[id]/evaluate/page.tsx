"use client";

import { useLocale, useTranslations } from "next-intl";
import EvaluatedQuestion from "./_components/evaluated-question";
import React from "react";
import Link from "~/components/link";
import { api } from "~/trpc/react";
import { type LanguageIso } from "~/server/utils/api";
import { useParams } from "next/navigation";

export default function Evaluate() {
  const t = useTranslations();
  const locale = useLocale();
  const { id } = useParams<{ id: string }>();

  const { data: quiz } = api.quiz.evaluate.useQuery({
    language: locale as LanguageIso,
    id,
  });

  if (!quiz) {
    return null;
  }

  const { questions } = quiz;

  return (
    <div className="w-full">
      <p>
        {t("quiz_evaluation_absolute", {
          // TODO: calculate based no correct answers
          correct: 1,
          max: questions.length,
        })}
      </p>
      <p>
        {t("quiz_evaluation_percentage", {
          percentage: Math.round(
            (100 / questions.length || 1) *
              // questions.filter((item) =>
              //   item.correctAnswers.includes(item.givenAnswer),
              // ).length,
              questions.length || 1,
          ),
        })}
      </p>

      <div className="pb-6" />

      {questions.map((evaluatedQuestion, i) => (
        <React.Fragment key={`evaluation-question-${evaluatedQuestion.id}`}>
          <p>{t("evaluation_question_title", { id: i + 1 })}</p>
          <div className="pb-2" />
          <EvaluatedQuestion question={evaluatedQuestion} />
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
