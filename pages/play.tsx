import FullLayout from "@/components/FullLayout";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Quiz from "@/components/Quiz";
import Loader from "@/components/Loader";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { Locale } from "@/utils/i18n";

const Play: NextPage = () => {
  const [data, updateData] = useState(undefined);

  const { locale } = useRouter();

  trpc.useQuery(
    [
      "get-quiz",
      {
        lang: locale || Locale.en,
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
