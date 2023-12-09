import IntlProvider from "~/components/intl-provider";
import { api } from "~/trpc/server";
import Quiz from "./_components/quiz";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const quiz = await api.quiz.getById.query({ id });
  console.log({ quiz });

  return (
    <div className="flex grow flex-col justify-center">
      <IntlProvider>
        <Quiz quiz={quiz} />
      </IntlProvider>
    </div>
  );
}
