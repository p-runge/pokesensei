import FullLayout from "@/components/FullLayout";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Quiz from "@/components/Quiz";
import Loader from "@/components/Loader";
import { useContext, useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UserContext from "@/context/user";

const Play: NextPage = () => {
  const [data, updateData] = useState(undefined);

  const { locale } = useContext(UserContext);

  trpc.useQuery(
    [
      "get-quiz",
      {
        lang: locale,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
