"use client";

import { useEffect, useState } from "react";
import qs from "query-string";
import { useTranslations } from "next-intl";
import { QuestionType } from "@prisma/client";
import { POKEMON_BY_GEN } from "~/server/utils/pokemon";
import Link from "~/components/link";
import Select from "./_components/select";

export interface QuizFilter {
  questionTypes: QuestionType[];
  generations: number[];
}

export default function Setup() {
  const t = useTranslations();

  const [questionTypes, changeQuestionTypes] = useState([] as QuestionType[]);
  const [generations, changeGenerations] = useState([] as number[]);

  const [quizFilters, changeQuizFilters] = useState({
    questionTypes,
    generations,
  } as QuizFilter);

  useEffect(() => {
    changeQuizFilters({
      questionTypes,
      generations,
    });
  }, [changeQuizFilters, questionTypes, generations]);

  const startHref = qs.stringifyUrl({
    url: "/play",
    query: {
      ...quizFilters,
    },
  });

  return (
    <div className="text-center">
      <h2 className="mb-6 text-6xl">{t("page_setup_title")}</h2>
      <p>{t("page_setup_instruction")}</p>
      <Select
        title={t("page_setup_select_title_question_type")}
        hasAllOption
        multi
        defaultValues={questionTypes}
        options={Object.values(QuestionType).map((questionType) => ({
          value: questionType,
          label: t(`question_type_${questionType.toLowerCase()}`),
        }))}
        onSelect={(values) => changeQuestionTypes(values as QuestionType[])}
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
          changeGenerations(values.map((value) => parseInt(value)))
        }
      />
      <div className="pb-12" />
      <Link href={startHref} variant="primary">
        {t("page_setup_start_button")}
      </Link>
    </div>
  );
}
