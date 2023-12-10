"use client";

import { useLocale, useTranslations } from "next-intl";
import EvaluatedQuestion from "./_components/evaluated-question";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Link from "~/components/link";
import { api } from "~/trpc/react";
import { type LanguageIso } from "~/server/utils/api";
import { useParams } from "next/navigation";
import Loader from "~/components/loader";
import Navbar from "~/components/navbar";

export default function Evaluate() {
  const t = useTranslations();
  const locale = useLocale();
  const { id } = useParams<{ id: string }>();

  const { data: quiz, status } = api.quiz.evaluate.useQuery({
    language: locale as LanguageIso,
    id,
  });

  if (status === "loading") {
    return (
      <div className="flex grow items-center justify-center">
        <Loader />
      </div>
    );
  } else if (status === "error") {
    return (
      <div className="flex grow items-center justify-center">
        <p className="text-2xl">{t("error_no_data")}</p>
      </div>
    );
  }

  const { questions } = quiz;

  const correctQuestionsAmount = questions.filter((question) =>
    question.answers.find((answer) => answer.isChosen && answer.isCorrect),
  ).length;

  return (
    <>
      <div className="flex flex-col text-center">
        {/* initial stats view */}
        <div className="-my-4 flex h-screen justify-center">
          <div className="relative flex flex-col justify-center gap-6 self-center">
            <p className="text-4xl font-bold">
              {t("quiz_evaluation_absolute", {
                correct: correctQuestionsAmount,
                max: questions.length,
              })}
            </p>
            <p className="text-4xl font-bold">
              {t("quiz_evaluation_percentage", {
                percentage: Math.round(
                  (100 / questions.length || 1) * correctQuestionsAmount,
                ),
              })}
            </p>
            {/* scroll down icon */}
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute -bottom-20 left-1/2 -ml-4 animate-bounce text-xl"
            />
          </div>
        </div>
        <div className="pb-6" />
        <div className="flex flex-col gap-12">
          {questions.map((evaluatedQuestion, i) => (
            <div className="flex flex-col gap-2" key={evaluatedQuestion.id}>
              <p>{t("evaluation_question_title", { id: i + 1 })}</p>
              <EvaluatedQuestion question={evaluatedQuestion} />
            </div>
          ))}
        </div>
        <div className="pb-12" />
        <div className="flex items-center justify-center gap-4">
          <Link href="/setup">{t("quiz_change_setup_button")}</Link>
          <Link href="/play" variant="primary">
            {t("quiz_replay_button")}
          </Link>
        </div>
      </div>
      <Navbar />
    </>
  );
}
