import IntlProvider from "~/components/intl-provider";
import { api } from "~/trpc/server";
import { type LanguageIso } from "~/server/utils/api";
import Quiz from "./_components/quiz";
import MainLayout from "~/components/main-layout";

export default async function Page({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const { locale, id } = params;
  const quiz = await api.quiz.getById.query({
    language: locale as LanguageIso,
    id,
  });

  return (
    <MainLayout center fullScreen>
      <div className="flex w-full flex-col">
        <IntlProvider>
          <Quiz quiz={quiz} />
        </IntlProvider>
      </div>
    </MainLayout>
  );
}
