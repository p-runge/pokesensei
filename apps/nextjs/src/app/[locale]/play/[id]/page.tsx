import IntlProvider from "~/components/intl-provider";
import MainLayout from "~/components/main-layout";
import { api } from "~/trpc/server";
import Quiz from "./_components/quiz";

export default async function Page({
  params,
}: {
  params: { locale: string; id: string };
}) {
  const { locale, id } = params;
  const quiz = await api.quiz.getById({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    language: locale as any,
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
