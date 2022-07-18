import FullLayout from "@/components/FullLayout";
import { generateQuiz } from "@/utils/trpc";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Question from "@/components/Question";
import objectHash from "object-hash";

const Quiz: NextPage = () => {
  const { data } = generateQuiz(3);

  return (
    <FullLayout>
      {data &&
        data.map((questionData) => (
          <Question
            key={`question-${objectHash(questionData)}`}
            data={questionData}
          />
        ))}
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
