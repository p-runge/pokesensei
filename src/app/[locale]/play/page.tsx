import { api } from "~/trpc/server";
import Quiz from "./_components/quiz";
import IntlProvider from "~/components/intl-provider";
import { useLocale } from "next-intl";
import type { LanguageIso } from "~/server/utils/api";

export default async function Page() {
  const locale = useLocale();

  const questions = await api.quiz.create.query({
    questions: 5,
    language: locale as LanguageIso,
  });

  return (
    <IntlProvider>
      <Quiz questions={questions} />
    </IntlProvider>
  );
}
