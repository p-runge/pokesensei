import { getTranslations } from "next-intl/server";
import { type QuestionType } from "@prisma/client";
import Setup from "./_components/setup";
import MainLayout from "~/components/main-layout";

export interface QuizFilter {
  questionTypes: QuestionType[];
  generations: number[];
}

export default async function Page() {
  const t = await getTranslations();

  return (
    <MainLayout>
      <div className="flex flex-col">
        <h2 className="mb-6 text-center text-6xl">{t("page_setup_title")}</h2>
        <p className="text-center text-xl">{t("page_setup_instruction")}</p>
        <Setup />
      </div>
    </MainLayout>
  );
}
