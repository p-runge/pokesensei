import { getTranslations } from "next-intl/server";
import { type QuestionType } from "@prisma/client";
import Navbar from "~/components/navbar";
import Setup from "./_components/setup";

export interface QuizFilter {
  questionTypes: QuestionType[];
  generations: number[];
}

export default async function Page() {
  const t = await getTranslations();

  return (
    <>
      <div className="text-center">
        <div className="h-header" />
        <h2 className="mb-6 text-6xl">{t("page_setup_title")}</h2>
        <p className="text-xl">{t("page_setup_instruction")}</p>
        <Setup />
      </div>
      <Navbar />
    </>
  );
}
