import FullLayout from "@/components/FullLayout";
import Headline from "@/components/Headline";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Credit {
  component: string;
  source: string;
  url: string;
}
const credits: Credit[] = [
  {
    component: "Logos",
    source: "Font Meme",
    url: "https://fontmeme.com/",
  },
];

export default () => {
  const { t } = useTranslation();

  return (
    <FullLayout>
      <Headline>Credits</Headline>
      <p className="mb-3">{t("page_credits_copy")}:</p>
      <div className="flex flex-col">
        {credits.map(({ component, source, url }) => (
          <p key={`credit-${source}-${component}`}>
            {component}
            {": "}
            <a target="_blank" href={url} rel="noreferrer">
              {source}
            </a>
          </p>
        ))}
      </div>
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
