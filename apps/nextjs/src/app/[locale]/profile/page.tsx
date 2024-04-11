import { useTranslations } from "next-intl";

import MainLayout from "~/components/main-layout";
import NeedsAuth from "~/components/needs-auth";
import QuizHistoryList from "./_components/quiz-history-list";

export default function ProfilePage() {
  const t = useTranslations();

  return (
    <NeedsAuth>
      <MainLayout>
        <h2 className="mb-6 text-center text-6xl">{t("page_profile_title")}</h2>
        <div className="grid grid-cols-2">
          <QuizHistoryList />
        </div>
      </MainLayout>
    </NeedsAuth>
  );
}
