import FullLayout from "@/components/FullLayout";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Skeleton from "@/components/Skeleton";

export enum QuestionType {
  TYPE_OF_POKEMON = "TYPE_OF_POKEMON",
}

const Quiz: NextPage = () => {
  const { t } = useTranslation("common");

  const [{ data, isLoading }] = useState(
    trpc.useQuery([
      "get-question-by-type",
      {
        type: QuestionType.TYPE_OF_POKEMON,
      },
    ])
  );

  return (
    <FullLayout>
      {!data ? (
        <div>Loading...</div>
      ) : (
        // wrapper
        <div className="flex flex-col w-[1200px] m-auto max-w-full">
          {/* question */}
          <div className="p-4 w-full bg-gray-700 rounded-lg">
            <Skeleton isLoading={isLoading} width="w-6/12">
              <span>{t(data.question.string, data.question.params)}</span>
            </Skeleton>
          </div>

          {/* answers */}
          <div className="grid grid-cols-2 mt-4 gap-4">
            {data.answers.map((answer) => (
              <button
                key={answer}
                type="button"
                className="p-4 w-full bg-primary rounded-lg"
              >
                <Skeleton isLoading={isLoading} width="w-6/12">
                  <span>{answer}</span>
                </Skeleton>
              </button>
            ))}
          </div>
        </div>
      )}
    </FullLayout>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getStaticProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}

export default Quiz;
