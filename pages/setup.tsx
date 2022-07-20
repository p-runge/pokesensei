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

export interface QuizFilter {
  questionTypes: QuestionType[];
}

const Setup: NextPage = () => {
  const { t } = useTranslation();

  const [questionTypes, changeQuestionTypes] = useState([] as QuestionType[]);

  const [setupData, changeQuizFilter] = useState({
    questionTypes,
  } as QuizFilter);

  useEffect(() => {
    changeQuizFilter({
      questionTypes,
    });
  }, [changeQuizFilter, questionTypes]);

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
        onSelect={(value) => changeQuestionTypes(value as QuestionType[])}
      />
      <div className="pb-12" />
      <Link
        href={{
          pathname: "/play",
          query: qs.stringify(setupData || {}, {
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
