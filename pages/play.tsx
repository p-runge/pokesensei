import FullLayout from "@/components/FullLayout";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Quiz from "@/components/Quiz";
import Loader from "@/components/Loader";
import { useState } from "react";

const Play: NextPage = () => {
  const [data, updateData] = useState(undefined);

  trpc.useQuery(
    [
      "get-quiz",
      {
        amount: 5,
      },
    ],
    {
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      onSuccess: updateData,
    }
  );

  return (
    <FullLayout>
      <h2 className="text-6xl mb-6">Play</h2>
      <Loader isLoading={!data}>{data && <Quiz data={data} />}</Loader>
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
