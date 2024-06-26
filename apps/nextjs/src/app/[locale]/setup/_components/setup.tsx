"use client";

import { useEffect, useState } from "react";
import { QuestionType } from "@prisma/client";
import { useTranslations } from "next-intl";
import qs from "query-string";

import Link from "~/components/link";
import { POKEMON_BY_GEN } from "~/server/utils/pokemon";
import Select from "./select";

export interface QuizFilter {
  questionTypes: QuestionType[];
  generations: number[];
}

export default function Setup() {
  const t = useTranslations();

  const [questionTypes, setQuestionTypes] = useState([] as QuestionType[]);
  const [generations, setGenerations] = useState([] as number[]);

  const [quizFilters, setQuizFilters] = useState({
    questionTypes,
    generations,
  } as QuizFilter);

  useEffect(() => {
    setQuizFilters({
      questionTypes,
      generations,
    });
  }, [setQuizFilters, questionTypes, generations]);

  const startHref = qs.stringifyUrl({
    url: "/play",
    query: {
      ...quizFilters,
    },
  });

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Select
          title={t("page_setup_select_title_question_type")}
          hasAllOption
          multi
          defaultValues={questionTypes}
          options={Object.values(QuestionType).map((questionType) => ({
            value: questionType,
            label: t(`question_type_${questionType.toLowerCase()}`),
          }))}
          onSelect={(values) => setQuestionTypes(values as QuestionType[])}
        />
        <Select
          title={t("page_setup_select_title_generation")}
          hasAllOption
          multi
          defaultValues={questionTypes}
          options={POKEMON_BY_GEN.map((_, i) => ({
            value: `${i + 1}`,
            label: `${i + 1}`,
          }))}
          onSelect={(values) =>
            setGenerations(values.map((value) => parseInt(value)))
          }
        />
      </div>
      <div className="pb-12" />
      <Link href={startHref} variant="primary" className="self-center">
        {t("page_setup_start_button")}
      </Link>
    </>
  );
}
