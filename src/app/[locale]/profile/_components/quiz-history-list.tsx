import {
  faClockRotateLeft,
  faComment,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { type inferRouterOutputs } from "@trpc/server";
import { useFormatter, useTranslations } from "next-intl";
import Link from "~/components/link";
import { type AppRouter } from "~/server/api/root";
import { cn } from "~/server/utils/cn";
import { api } from "~/trpc/server";

export default async function QuizHistoryList() {
  const quizzes = await api.user.getQuizzes.query();

  return <Content quizzes={quizzes} />;
}

function Content({
  quizzes,
}: {
  quizzes: inferRouterOutputs<AppRouter>["user"]["getQuizzes"];
}) {
  const t = useTranslations();

  return (
    <div className="flex flex-col items-center justify-center pt-4">
      <div className="relative mx-auto flex w-full flex-col items-center rounded-xl border-[1px] border-gray-200 bg-white bg-clip-border p-4 shadow-md shadow-[#F3F3F3] dark:border-gray-500 dark:bg-gray-800 dark:text-white dark:shadow-none">
        <div className="flex w-full items-center justify-between rounded-t-3xl p-3">
          <div className="flex items-center gap-3 text-lg font-bold text-gray-500 dark:text-white">
            <FontAwesomeIcon icon={faClockRotateLeft} className="h-8 w-8" />
            {t("page_profile_section_quiz_history")}
          </div>
        </div>
        <div className="my-4 self-stretch border-b border-gray-500"></div>
        {quizzes.map((quiz) => (
          <QuizItem quiz={quiz} key={quiz.id} />
        ))}
      </div>
    </div>
  );
}

function QuizItem({
  quiz,
}: {
  quiz: inferRouterOutputs<AppRouter>["user"]["getQuizzes"][number];
}) {
  const { dateTime } = useFormatter();

  const questionsAnswered = quiz.questions.filter((question) =>
    question.answers.some((answer) => answer.isChosen),
  ).length;

  return (
    <Link
      href={`/play/${quiz.id}/evaluate`}
      variant="blank"
      className="flex h-full w-full cursor-pointer items-start justify-between rounded-md bg-white px-3 py-[20px] shadow-white transition-all duration-100 dark:bg-gray-800 dark:hover:bg-gray-500 dark:hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center">
          <FontAwesomeIcon icon={faQuestion} className="h-10 w-10" />
        </div>
        <div className="flex flex-col">
          <h5 className="font-bold text-gray-500 dark:text-white">
            {dateTime(quiz.createdAt, {
              timeStyle: "short",
            })}
          </h5>
          <p className="mt-1 text-sm font-normal text-gray-600">
            {dateTime(quiz.createdAt, {
              dateStyle: "medium",
            })}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-gray-400">
        <span
          className={cn(
            "font-bold",
            questionsAnswered === quiz.questions.length
              ? "text-green-500 dark:text-green-500"
              : "text-red-500 dark:text-red-500",
          )}
        >{`${questionsAnswered}/${quiz.questions.length}`}</span>
        <FontAwesomeIcon icon={faComment} className="h-5 w-5" />
      </div>
    </Link>
  );
}
