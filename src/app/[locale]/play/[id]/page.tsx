import IntlProvider from "~/components/intl-provider";
import { api } from "~/trpc/server";
import { type LanguageIso } from "~/server/utils/api";
import Quiz from "./_components/quiz";

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
  console.log({ quiz });

  return (
    <div className="flex grow flex-col justify-center">
      <IntlProvider>
        <Quiz quiz={quiz} />
      </IntlProvider>
    </div>
  );
}
