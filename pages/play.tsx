import FullLayout from "@/components/FullLayout";
import { generateQuiz } from "@/utils/trpc";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Quiz from "@/components/Quiz";
import Skeleton from "@/components/Skeleton";

const Play: NextPage = () => {
  const { data } = generateQuiz(5);

  return (
    <FullLayout>
      <h2 className="text-6xl mb-6">Play</h2>
      <Skeleton isLoading={!data} width="w-full" height="h-10">
        {data && <Quiz data={data} />}
      </Skeleton>
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

export default Play;
