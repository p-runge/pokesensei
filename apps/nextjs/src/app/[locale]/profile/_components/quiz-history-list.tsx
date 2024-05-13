import {
  faClockRotateLeft,
  faComment,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getFormatter, getTranslations } from "next-intl/server";

import type { QueryReturnType } from "@acme/api";

import Link from "~/components/link";
import { cn } from "~/server/utils/cn";
import { api } from "~/trpc/server";

export default async function QuizHistoryList() {
  const quizzes = await api.user.getQuizzes();

  return <Content quizzes={quizzes} />;
}

async function Content({
  quizzes,
}: {
  quizzes: QueryReturnType["user"]["getQuizzes"];
}) {
  const t = await getTranslations();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative mx-auto flex w-full flex-col items-center rounded-xl border-[1px] border-gray-200 bg-white bg-clip-border p-4 shadow-md shadow-[#F3F3F3] dark:border-gray-500 dark:bg-gray-800 dark:text-white dark:shadow-none">
        <div className="flex w-full items-center justify-between rounded-t-3xl p-3">
          <div className="flex items-center gap-3 text-lg font-bold text-gray-500 dark:text-white">
            <FontAwesomeIcon icon={faClockRotateLeft} className="h-8 w-8" />
            {t("page_profile_section_quiz_history")}
          </div>
        </div>
        <div className="my-4 self-stretch border-b border-gray-500"></div>
        {quizzes.length === 0 ? (
          <span className="italic">{t("error_no_quiz_history")}</span>
        ) : (
          quizzes.map((quiz) => <QuizItem quiz={quiz} key={quiz.id} />)
        )}
      </div>
    </div>
  );
}

async function QuizItem({
  quiz,
}: {
  quiz: QueryReturnType["user"]["getQuizzes"][number];
}) {
  const { dateTime, number } = await getFormatter();

  const questionsAnswered = quiz.questions.filter((question) =>
    question.answers.find((answer) => answer.isChosen && answer.isCorrect),
  ).length;

  return (
    <Link
      href={`/play/${quiz.id}/evaluate`}
      variant="blank"
      className="flex h-full w-full cursor-pointer items-start justify-between rounded-md bg-white px-3 py-[20px] shadow-white transition-all duration-100 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-500"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center">
          <FontAwesomeIcon
            icon={faQuestion}
            className="h-10 w-10 text-gray-500 dark:text-white"
          />
        </div>
        <div className="flex flex-col">
          <h5 className="font-bold text-gray-500 dark:text-white">
            {dateTime(quiz.createdAt, {
              timeStyle: "short",
            })}
          </h5>
          <p className="mt-1 text-sm font-light text-gray-400 dark:text-gray-600">
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
        >{`${number(questionsAnswered)}/${number(quiz.questions.length)}`}</span>
        <FontAwesomeIcon icon={faComment} className="h-5 w-5" />
      </div>
    </Link>
  );
}
