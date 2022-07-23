import FullLayout from "@/components/FullLayout";
import Headline from "@/components/Headline";
import { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Select from "@/components/Select";
import { QuestionType } from "@/server/utils/question";
import Link from "next/link";
import { useEffect, useState } from "react";
import qs from "query-string";
import { POKEMON_BY_GEN } from "@/server/utils/random";

export interface QuizFilter {
  questionTypes: QuestionType[];
  generations: number[];
}

const Setup: NextPage = () => {
  const { t } = useTranslation();

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

  return (
    <FullLayout>
      <Headline>{t("page_setup_title")}</Headline>
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
      <Link
        href={{
          pathname: "/play",
          query: qs.stringify(quizFilters || {}, {
            arrayFormat: "index",
          }),
        }}
        passHref
      >
        <a className="btn-primary text-2xl">{t("page_setup_start_button")}</a>
      </Link>
    </FullLayout>
  );
};

export default Setup;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
