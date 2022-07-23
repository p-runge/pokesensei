import CenteredLayout from "@/components/CenteredLayout";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Quiz from "@/components/Quiz";
import Loader from "@/components/Loader";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Locale } from "@/utils/i18n";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import qs from "query-string";
import { QuestionWithAnswers } from "@/server/utils/question";
import Evaluation from "@/components/Evaluation";
import FullLayout from "@/components/FullLayout";
import { EvaluatedQuestionData } from "@/components/EvaluatedQuestion";
import Headline from "@/components/Headline";
import { QuizFilter } from "./setup";

const Play: NextPage = () => {
  const { t } = useTranslation();

  const [data, updateData] = useState(
    undefined as QuestionWithAnswers[] | undefined
  );
  const [evaluatedData, updateEvaluatedData] = useState(
    undefined as EvaluatedQuestionData[] | undefined
  );
  const [isFinished, updateIsFinished] = useState(false);

  const { locale, asPath } = useRouter();
  const rawFilters = qs.parse(asPath.split("?")[1], {
    arrayFormat: "index",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }) as any;
  // raw filter interpretes every primitive datatype as string, so parsing is necessary
  const filters: QuizFilter = {
    ...rawFilters,
    generations: rawFilters.generations?.map((g: string) => parseInt(g)),
  };

  trpc.useQuery(
    [
      "get-questions",
      {
        lang: locale || Locale.en,
        amount: 5,
        filters,
      },
    ],
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onSuccess: updateData,
    }
  );

  const onFinishQuiz = (evaluatedQuestions: EvaluatedQuestionData[]) => {
    updateEvaluatedData(evaluatedQuestions);
    updateIsFinished(true);
  };

  return !isFinished ? (
    <CenteredLayout>
      <div className="w-full max-w-full">
        <Loader isLoading={!data}>
          {data && <Quiz data={data} onFinish={onFinishQuiz} />}
        </Loader>
      </div>
      <Link href="/" passHref>
        <a className="fixed bottom-0 text-error opacity-25 hover:opacity-100">
          {t("page_play_cancel")}
        </a>
      </Link>
    </CenteredLayout>
  ) : (
    <FullLayout>
      <Headline>{t("page_play_evaluation_title")}</Headline>
      <Loader isLoading={!evaluatedData}>
        {evaluatedData && <Evaluation data={evaluatedData} />}
        {/* TODO: improve layout heights to prevent this ugly hack */}
        <div className="pb-footer text-transparent">.</div>
      </Loader>
    </FullLayout>
  );
};

export default Play;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
