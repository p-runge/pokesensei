import FullLayout from "@/components/FullLayout";
import { generateQuestion } from "@/utils/trpc";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Question, { QuestionType } from "@/components/Question";

const Quiz: NextPage = () => {
  const { data } = generateQuestion(QuestionType.NAME_OF_POKEMON_BY_IMAGE);

  return (
    <FullLayout>
      <Question data={data} />
    </FullLayout>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

export default Quiz;
