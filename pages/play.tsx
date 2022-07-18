import FullLayout from "@/components/FullLayout";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Quiz from "@/components/Quiz";
import Loader from "@/components/Loader";
import { useState } from "react";
import { LOCALE } from "@/utils/i18n";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Play: NextPage = () => {
  const [data, updateData] = useState(undefined);

  trpc.useQuery(
    [
      "get-quiz",
      {
        lang: LOCALE,
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

export default Play;

export const getServerSideProps = async () => {
  return {
    props: {
      ...(await serverSideTranslations(LOCALE, ["common"])),
    },
  };
};
